'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import apartments from '../data/apartments';
import { FaCalendarAlt, FaBed, FaBath, FaUserFriends } from 'react-icons/fa';
import SortDropdown from '../components/sortDropdown';
import { fetchAvailability } from './fetchCalendar';
import CustomDatePicker from '../components/customDatePicker';
import Navbar from '../components/navBar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import BookingFormModal from '../components/bookingForm';

const PopupContainer = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
      );
    }
  }, []); // ✅ runs only on mount

  return <div ref={ref}>{children}</div>;
};

gsap.registerPlugin(ScrollTrigger);

const Map = dynamic(() => import('../components/map'), {
  ssr: false,
  loading: () => <div className="text-white">Loading map...</div>,
});

export default function SearchPage() {
  const [selectedApartment, setSelectedApartment] = useState(apartments[0]);
  const [filteredApartments, setFilteredApartments] = useState(apartments);
  const [sortOption, setSortOption] = useState('Default Order');
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [openPopup, setOpenPopup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedApartmentForInquiry, setSelectedApartmentForInquiry] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // ✅ GSAP initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar
      gsap.from('.navbar-anim', { y: -40, opacity: 0, duration: 1.2, ease: 'power3.out' });

      // Filters
      gsap.from('.filter-box', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Search Button (only animate once if visible)
      const searchBtn = document.querySelector('.search-btn');
      if (searchBtn) {
        gsap.fromTo(
          searchBtn,
          { opacity: 0, scale: 1.1, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
            delay: 0.5,
          }
        );
      }

      // Sort bar + Title
      gsap.from('.sort-bar, .results-heading', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.6,
      });

      // Map
      gsap.from('.map-container', {
        xPercent: 10,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ✅ Animate results whenever filteredApartments updates
  useEffect(() => {
    if (!cardsRef.current || !Array.isArray(cardsRef.current)) return;

    const validCards = cardsRef.current.filter(Boolean);
    if (!validCards.length) return;

    // Kill any old animations to avoid stacking
    gsap.killTweensOf(validCards);

    // Animate the container first (slight fade in)
    gsap.fromTo(
      '.results-heading', // you can also target a wrapping div if you prefer
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Then animate cards together with smoother easing and overlapping stagger
    gsap.fromTo(validCards, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      clearProps: "all" // ✅ removes inline styles after animation
    });

  }, [filteredApartments]);


  const handleSearch = async () => {
    if (!arrivalDate || !departureDate) {
      alert('Please select both arrival and departure dates.');
      return;
    }

    const requestedDates = [];
    let d = new Date(arrivalDate);
    while (d <= departureDate) {
      requestedDates.push(new Date(d).toISOString().split('T')[0]);
      d.setDate(d.getDate() + 1);
    }

    const availabilityChecks = await Promise.all(
      apartments.map(async apt => {
        const unavailable = await fetchAvailability(apt.calendarUrl);
        const isAvailable = requestedDates.every(date => !unavailable?.includes?.(date));
        return isAvailable ? apt : null;
      })
    );

    const availableApartments = availabilityChecks.filter(Boolean);
    let filtered = availableApartments.filter((apt) => apt.maxGuests >= guests);

    switch (sortOption) {
      case 'Price (Low to High)': filtered.sort((a, b) => a.price - b.price); break;
      case 'Price (High to Low)': filtered.sort((a, b) => b.price - a.price); break;
      case 'Rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'Featured First': filtered.sort((a, b) => (b.featured ? -1 : 1)); break;
      case 'Date Old to New': filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); break;
      case 'Date New to Old': filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
      default: break;
    }

    setFilteredApartments(filtered);
  };

  return (
<main
  ref={containerRef}
  className="flex flex-col md:h-screen min-h-screen bg-[#050712] px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 md:pt-10 md:overflow-hidden"
>


  {/* Navbar */}
  <div className="navbar-anim">
    <Navbar variant="solid" />
  </div>

  {/* Layout */}
  <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-6 md:gap-0">
    {/* Left Side (Filters + Results) */}
      {/* Left Side (Filters + Results) */}
    <div className="w-full md:w-1/2 p-2 sm:p-4 md:p-6 text-white flex flex-col h-full min-h-0 relative">
      {/* Filters + Sort + Heading (Sticky) */}
      <div className="sticky top-0 z-50 bg-[#050712] pb-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-wrap sm:flex-row justify-between gap-4 mb-5 w-full relative z-[60]">
          {/* ARRIVAL */}
          <div className="filter-box flex-1 min-w-[150px] sm:min-w-[200px] relative">
            <label className="block text-sm font-medium mb-1 text-[#D0D0D1]">Arrival</label>
            <div
              className="flex items-center border border-[#2F3034] rounded-xl bg-[#050712] pl-4 py-3 h-10 text-white cursor-pointer"
              onClick={() => setOpenPopup(openPopup === 'arrival' ? null : 'arrival')}
            >
              <FaCalendarAlt className="mr-2 text-[18px]" />
              <CustomDatePicker
                selected={arrivalDate}
                onChange={(date) => {
                  setArrivalDate(date);
                  setOpenPopup(null);
                }}
                placeholder="Select date"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isOpen={openPopup === 'arrival'}
                popperClassName="z-[70]"
                portalId="root-datepicker"
              />
            </div>
          </div>

          {/* DEPARTURE */}
          <div className="filter-box flex-1 min-w-[150px] sm:min-w-[200px] relative">
            <label className="block text-sm font-medium mb-1 text-[#D0D0D1]">Departure</label>
            <div
              className="flex items-center border border-[#2F3034] rounded-xl bg-[#050712] pl-4 py-3 h-10 text-white cursor-pointer"
              onClick={() => setOpenPopup(openPopup === 'departure' ? null : 'departure')}
            >
              <FaCalendarAlt className="mr-2 text-[18px]" />
              <CustomDatePicker
                selected={departureDate}
                onChange={(date) => {
                  setDepartureDate(date);
                  setOpenPopup(null);
                }}
                placeholder="Select date"
                dateFormat="dd/MM/yyyy"
                minDate={
                  arrivalDate
                    ? new Date(arrivalDate.getFullYear(), arrivalDate.getMonth(), arrivalDate.getDate() + 1)
                    : new Date()
                }
                isOpen={openPopup === 'departure'}
                popperClassName="z-[70]"
                portalId="root-datepicker"
              />
            </div>
          </div>

          {/* GUESTS */}
          <div className="filter-box flex-1 min-w-[150px] sm:min-w-[200px] relative">
            <label className="block text-sm font-medium mb-1 text-[#D0D0D1]">Guests</label>
            <button
              className="flex items-center border border-[#2F3034] rounded-xl bg-[#050712] text-white text-sm font-medium w-full pl-4 py-3 h-10 text-left"
              onClick={() => setOpenPopup(openPopup === 'guests' ? null : 'guests')}
            >
              <FaUserFriends className="mr-2 text-[18px]" />
              {guests} Guest{guests > 1 ? 's' : ''}
            </button>

            {openPopup === 'guests' && (
              <PopupContainer>
                <div className="absolute z-[70] mt-2 bg-[#050712] border rounded-xl border-[#2F3034] p-4 shadow-lg text-white w-full left-0 origin-top">
                  <div className="flex justify-between items-center mb-4">
                    <span>Guests</span>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="px-2 py-1 border border-[#2F3034] rounded text-center w-8"
                      >
                        -
                      </button>
                      <span className="inline-block w-6 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(guests + 1)}
                        className="px-2 py-1 border border-[#2F3034] rounded text-center w-8"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-[#2F3034] rounded-xl text-white w-full py-2 hover:scale-[1.01] transform transition-transform duration-300"
                    onClick={() => setOpenPopup(null)}
                  >
                    Apply
                  </button>
                </div>
              </PopupContainer>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end mb-5">
          <button
            className={`search-btn rounded-xl px-8 py-2 text-md font-medium transition-all duration-300 
            ${
              arrivalDate && departureDate && guests > 0
                ? 'bg-gradient-to-r from-[#C3A054] via-[#BD9847] to-[#C8AD62] text-white hover:scale-[1.03]'
                : 'bg-[#2F3034] text-[#8C8C8D] opacity-80 cursor-not-allowed'
            }`}
            onClick={() => {
              if (arrivalDate && departureDate && guests > 0) handleSearch();
            }}
            disabled={!arrivalDate || !departureDate || guests <= 0}
          >
            Search
          </button>
        </div>

        <div className="w-full border-b border-[#2F3034] my-5"></div>

        {/* Sort Bar */}
        <div className="sort-bar flex flex-wrap gap-3 items-center justify-between mb-5">
          <h2 className="text-lg font-light text-[#D0D0D1]">{filteredApartments.length} Rentals</h2>
          <SortDropdown selected={sortOption} setSelected={setSortOption} />
        </div>

        <h1 className="results-heading text-2xl font-semibold mb-4">Search Results</h1>
      </div>

      {/* Scrollable Results */}
      <div
        className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scroll h-[calc(100vh-280px)] md:h-[calc(100vh-300px)] lenis-scroll-ignore"
        data-lenis-prevent
      >
        {filteredApartments.map((apt, i) => (
          <div
            key={apt.id}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => {
              setSelectedApartment(apt);
              setSelectedApartmentForInquiry(apt);
              setShowModal(true);
            }}
            className="apt-card cursor-pointer hover:bg-[#2F3034]/40 rounded-2xl flex flex-col sm:flex-row gap-4 p-4 sm:p-5 transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full sm:w-2/5">
              <Image
                src={apt.image}
                alt={apt.title}
                width={600}
                height={400}
                className="w-full h-40 sm:h-full object-cover rounded-lg"
                quality={70}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="/images/placeholder.webp"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="w-full sm:w-3/5 flex flex-col justify-between py-2 sm:py-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">{apt.title}</h2>
                <p className="text-white/90 mb-2 text-sm sm:text-base font-light">{apt.location}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white font-light my-2">
                <div className="flex items-center gap-1"><FaBed /> {apt.bedrooms} Beds</div>
                <div className="flex items-center gap-1"><FaBath /> {apt.bathrooms} Baths</div>
                <div className="flex items-center gap-1"><FaUserFriends /> {apt.maxGuests} Guests</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>



    {/* Right Side (Map) */}
    <div className="hidden md:block w-1/2 h-full map-container">
      <Map apartments={filteredApartments} selected={selectedApartment} />
    </div>
  </div>

  {/* Modal */}
  {showModal && (
    <BookingFormModal
      apartment={selectedApartmentForInquiry}
      onClose={() => setShowModal(false)}
    />
  )}
    </main>

  );
}

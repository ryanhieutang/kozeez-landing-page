'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaBed, FaBath, FaUserFriends } from 'react-icons/fa';
import emailjs from 'emailjs-com';

export default function BookingFormModal({ apartment, onClose }) {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: '',
    message: '',
  });

  const allFieldsFilled =
    formData.name &&
    formData.email &&
    formData.checkin &&
    formData.checkout &&
    formData.guests;

  // ✅ Animate modal
  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, []);

  // ✅ Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!apartment) return null;

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit (EmailJS integration)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFieldsFilled) return;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      checkin: formData.checkin,
      checkout: formData.checkout,
      guests: formData.guests,
      message: formData.message,
      apartment_title: apartment.title,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Inquiry sent successfully!');
          onClose();
        },
        (error) => {
          console.error('FAILED...', error);
          alert('Something went wrong. Please try again later.');
        }
      );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-center overflow-hidden px-10 md:px-0
     onTouchMove={(e) => e.preventDefault()}"
    >
      <div
        ref={modalRef}
        className="bg-[#050712] border border-[#2F3034] rounded-2xl w-full max-w-2xl text-white relative shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto overscroll-contain touch-pan-y flex-1 p-6 sm:p-8 md:p-10 pt-12 custom-scroll"
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-white/60 hover:text-white text-2xl"
          >
            ✕
          </button>

          {/* Apartment Info */}
          <h2 className="text-2xl sm:text-3xl font-semibold leading-snug mb-2 pr-10">
            {apartment.title}
          </h2>
          <p className="text-[#D0D0D1] text-sm mb-4">{apartment.location}</p>

          {/* Specs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/80 mb-8">
            <div className="flex items-center gap-1">
              <FaBed className="text-[#C3A054]" /> {apartment.bedrooms}{' '}
              {apartment.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-[#C3A054]" /> {apartment.bathrooms}{' '}
              {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}
            </div>
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-[#C3A054]" /> {apartment.maxGuests}{' '}
              {apartment.maxGuests === 1 ? 'Guest' : 'Guests'}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1"
                type="text"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            {/* Inline Inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Check-in</label>
                <input
                  name="checkin"
                  value={formData.checkin}
                  onChange={handleChange}
                  required
                  className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1"
                  type="date"
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium">Check-out</label>
                <input
                  name="checkout"
                  value={formData.checkout}
                  onChange={handleChange}
                  required
                  className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1"
                  type="date"
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium">Guests</label>
                <input
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  min={1}
                  className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1"
                  type="number"
                  placeholder="Guests"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="rounded-lg bg-[#12121A] border border-[#2F3034] p-3 w-full outline-none focus:border-[#C3A054] mt-1 min-h-[100px]"
                placeholder="Tell us a bit about your stay..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!allFieldsFilled}
              className={`mt-5 rounded-xl py-3 text-white font-medium transition-all duration-300 ${
                allFieldsFilled
                  ? 'bg-gradient-to-r from-[#C3A054] via-[#BD9847] to-[#C8AD62] hover:scale-[1.02]'
                  : 'bg-[#2F3034] text-[#8C8C8D] opacity-80 cursor-not-allowed'
              }`}
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

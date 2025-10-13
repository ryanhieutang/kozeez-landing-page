"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
        "Nice apartment, has everything you need, and feels very nice to be inside. Can walk to the Redfern train stop, and self check in with the code was a snap. Would recommend and would stay here again.",
    name: "Sam P.",
    avatar: "/images/testimonials/sam.avif",
    rating: 5,
  },
  {
    quote:
      "Highly recommend!! came from the gold coast to stay for a few nights and the host was absolutely amazing, the communication was absolutely fantastic. The apartment itself was so beautiful!! definitely would book again when I’m next in Sydney!",
    name: "Isabella C.",
    avatar: "/images/testimonials/isabella.avif",
    rating: 5,
  },
  {
    quote:
      "We had a wonderful stay! The apartment was beautifully clean and tidy and felt very homely as soon as we arrived. Checking in and communicating with the host was super easy and we were even able to organise a late checkout.",
    name: "Lauren J.",
    avatar: "/images/testimonials/lauren.avif",
    rating: 5,
  },
  {
    quote:
      "Really enjoyed our stay here, beautiful apartment and location. Danny was really friendly and very easy to communicate with. Would definitely recommend!",
    name: "Joe G.",
    avatar: "/images/testimonials/joe.avif",
    rating: 5,
  },
  {
    quote:
      "The apartment is brand new, clean, fully furnished as described. Quiet location, good security Friendly, caring host. Will come back when I have a chance",
    name: "Do Q.",
    avatar: "/images/testimonials/do.avif",
    rating: 5,
  },
  {
    quote:
      "Kozeez's place was absolutely beautiful, and he was super responsive with any of my enquiries. I would definitely recommend this place to anyone else.",
    name: "Joseph H.",
    avatar: "/images/testimonials/joseph.avif",
    rating: 5,
  },
  {
    quote:
      "Kozeez were the perfect host. They made sure we were comfortable and checked up on us. The place is quite ideal. Safe neighborhood. Really close to a Woolworth. The apartment feels like home. Super clean and welcoming.",
    name: "Sangeeta N.",
    avatar: "/images/testimonials/sangeeta.avif",
    rating: 5,
  },
  {
    quote:
      "Great spot in Redfern. Plenty of pubs and food nearby. Host was very helpful with an early checkin after my flights changed.",
    name: "David B.",
    avatar: "/images/testimonials/david.avif",
    rating: 5,
  },
];

const Testimonials = () => {
   const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // responsive count

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3); // desktop
      else if (window.innerWidth >= 768) setVisibleCards(2); // tablet
      else setVisibleCards(1); // mobile
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Step 1: Animate title + description
    tl.fromTo(
      ".testimonials-heading p, .testimonials-heading h2",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      }
    );

    // Step 2: Animate ONLY the first 3 visible cards
    tl.fromTo(
      ".testimonial-card:nth-child(-n+3)", // first 3 cards only
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.25,
      },
      "-=0.3" // slight overlap with heading
    );

    // Step 3: Animate the slider arrows immediately after (or during) last card
    tl.fromTo(
      ".testimonial-arrows button",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      },
      "-=0.2" // 👈 overlap slightly with the last card animation
    );

  }, sectionRef);

  return () => ctx.revert();
}, []);


  const next = () => {
    if (index < testimonials.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const cardWidth = 100 / visibleCards; // each card width in viewport %
  const trackShift = index * cardWidth;

  return (
    <section className="flex flex-col py-28 text-white overflow-hidden">
      <div className="w-full px-8 sm:px-14 md:px-0 md:pl-20 lg:pl-28">
        <div className="testimonials-heading text-center md:text-left mx-auto md:ml-8 mb-8 md:mb-12 max-w-[90%] sm:max-w-2xl">
          <p className="text-sm tracking-wider text-[#79787C] uppercase">Testimonials</p>
          <h2 className="text-4xl md:text-5xl leading-[1.2] font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] to-[#C8AD62] bg-clip-text text-transparent mt-3">
            What People Are Saying
          </h2>
        </div>

        {/* Testimonial track */}
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="testimonial-track flex transition-transform duration-500 ease-out space-x-4 sm:space-x-6"
              style={{ transform: `translateX(-${trackShift}%)` }}
            >

              {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="testimonial-card bg-[#17161A] rounded-2xl relative flex-shrink-0 flex flex-col justify-between p-6 sm:p-7 md:p-8 min-h-[280px] w-full"
                    style={{
                      flex: `0 0 calc(${cardWidth}% - 1rem)` // small compensation for visual balance
                    }}
                  >
                  <p className="text-white/80 text-base leading-relaxed mb-6 line-clamp-6">
                    “{t.quote}”
                  </p>

                  <div className="flex items-center mt-auto">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <div className="flex text-[#d5bb68] text-sm">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <span key={idx}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="absolute bottom-6 right-6 text-4xl text-white/50">
                    ”
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider arrows */}
      <div className="testimonial-arrows flex justify-center mt-10 space-x-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2F3034] hover:bg-[#3c3c42] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ←
        </button>

        <button
          onClick={next}
          disabled={index === testimonials.length - visibleCards}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DDC872] text-black hover:bg-[#c9b05f] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default Testimonials;

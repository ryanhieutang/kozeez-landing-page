"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ContactBanner = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // ⏳ wait before animating

      // Loop through each contact-item and animate its icon + text together
      const items = gsap.utils.toArray(".contact-item");
      items.forEach((item, i) => {
        const icon = item.querySelector(".contact-icon");
        const text = item.querySelector(".contact-text");

        tl.fromTo(
          icon,
          { y: 60, opacity: 0, scale: 1.2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          i * 0.4 // stagger items
        ).fromTo(
          text,
          { y: 60, opacity: 0, scale: 1.2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          i * 0.4 + 0.2 // comes just after its icon
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute bottom-0 left-0 w-full bg-[#050712] border-b border-[#2F3034] text-white py-5 md:pr-24 flex justify-center md:justify-end space-x-3 sm:space-x-5 md:space-x-10 text-xs md:text-sm font-normal z-30"
    >
      <div className="hidden md:flex items-center space-x-2 contact-item">
        <img
          src="/icons/map-pin.svg"
          alt="Location Icon"
          className="contact-icon w-3 h-5 md:h-5 md:w-5"
        />
        <p className="contact-text">Sydney, Australia</p>
      </div>

      <a
        href="tel:+61406099478"
        className="flex items-center space-x-2 contact-item cursor-pointer hover:underline"
      >
        <img
          src="/icons/phone.svg"
          alt="Phone Icon"
          className="contact-icon w-3 h-5 md:h-5 md:w-5"
        />
        <span className="contact-text">(+61) 406 099 478</span>
      </a>

      <a
        href="mailto:contact@kozeez.com"
        className="flex items-center space-x-2 contact-item cursor-pointer hover:underline"
      >
        <img
          src="/icons/at-symbol.svg"
          alt="Email Icon"
          className="contact-icon w-3 h-5 md:h-5 md:w-5"
        />
        <span className="contact-text">contact@kozeez.com</span>
      </a>
    </section>
  );
};

export default ContactBanner;

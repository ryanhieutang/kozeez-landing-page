"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Footer = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
          once: true, // animate only once
        },
      });

      // Logo
      tl.fromTo(
        ".footer-logo",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Divider line
      tl.fromTo(
        ".footer-divider",
        { scaleY: 0, opacity: 0, transformOrigin: "top" },
        { scaleY: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Nav Links
      tl.fromTo(
        ".footer-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.2"
      );

      // Copyright line
      tl.fromTo(
        ".footer-copy",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // Social icons + email
      tl.fromTo(
        ".footer-social, .footer-email",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.1"
      );
    });

    const footerLinks = document.querySelectorAll(".footer-link");
    const handleClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.dataset.target;
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: targetEl, offsetY: 0 },
          ease: "power2.out",
        });
      }
    };

    footerLinks.forEach((link) => link.addEventListener("click", handleClick));
    return () => footerLinks.forEach((link) => link.removeEventListener("click", handleClick));

    return () => ctx.revert();
  }, []);

  return (
    <footer className="text-white py-12 px-6 md:px-36 bg-[#050712] border-t border-[#2F3034]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Logo + Links Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-12">
          <a href="/" className="mb-6 md:mb-0 footer-logo">
            <img 
              src="/images/Kozeez Transparent Full.webp" 
              alt="Kozeez Logo" 
              className="h-16 w-auto"
              loading="lazy"
            />
          </a>

          <div className="hidden md:block h-16 border-l border-[#2F3034] footer-divider"></div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start text-white/70 text-sm space-y-2">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-2">
              <a data-target="about" className="footer-link cursor-pointer hover:text-white/90 transition">About Us</a>
              <a data-target="services" className="footer-link cursor-pointer hover:text-white/90 transition">What We Provide</a>
              <a data-target="portfolio" className="footer-link cursor-pointer hover:text-white/90 transition">Our Portfolio</a>
              <a data-target="faq" className="footer-link cursor-pointer hover:text-white/90 transition">FAQ</a>
            </div>
            <p className="footer-copy text-xs md:mt-2">&copy; 2025 Kozeez. All rights reserved.</p>
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="flex flex-col items-center md:items-end text-white/70 text-sm space-y-3">
          <div className="flex space-x-4">
            <a href="https://www.airbnb.com.au/users/show/682498186" target="_blank" className="footer-social">
              <img src="/icons/airbnb.svg" alt="Airbnb" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
            <a href="https://www.instagram.com/kozeezstays" target="_blank" className="footer-social">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
            <a href="https://www.tiktok.com/@kozeezstays" target="_blank" className="footer-social">
              <img src="/icons/tiktok.svg" alt="Tiktok" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
          </div>
          <a href="mailto:contact@kozeez.com" className="footer-email text-sm hover:text-white/90">contact@kozeez.com</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

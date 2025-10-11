"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./navBar";
import ContactBanner from "./contactBanner";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
  if (!containerRef.current) return;

  const ctx = gsap.context(() => {
    const entryTl = gsap.timeline({
      onComplete: () => {
        // 🔑 Recalculate scroll positions AFTER entry animation finishes
        ScrollTrigger.refresh();
      },
    });

    entryTl
      .fromTo(
        ".top-skyscraper",
        { opacity: 0, y: -80, scale: 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".bottom-skyscraper",
        { opacity: 0, y: 80, scale: 1.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "<"
      )
      .fromTo(
        ".hero-heading .word",
        { opacity: 0, y: 60, scale: 1.1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.25,
        },
        "-=0.5"
      )
      .fromTo(
        ".hero-button",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

    // ✅ PARALLAX SCROLL
    gsap.fromTo(
      ".top-skyscraper",
      { y: 0 }, // <-- matches where entry animation ended
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.2,
          fastScrollEnd: true,
        },
      }
    );

gsap.fromTo(
  ".bottom-skyscraper",
  { y: 0 }, // <-- matches entry animation’s resting state
  {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.2,
      fastScrollEnd: true,
    },
  }
);


    gsap.fromTo(
      ".hero-middle",
      { opacity: 1, y: 0 }, // 👈 always start fully visible
      {
        opacity: 0,
        y: -20,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",    // when hero hits top
          end: "bottom top",   // until hero scrolls out
          scrub: true,
          fastScrollEnd: true,
        },
      }
    );

  }, containerRef);

  return () => ctx.revert();
}, []);





  return (
    <section className="flex min-h-screen w-full overflow-hidden">
      <div
  ref={containerRef}
  className="flex flex-col flex-1 min-h-[90vh] sm:min-h-screen relative w-full"
>

        <Navbar variant="overlay"/>

        {/* Background */}
        <Image
          src="/images/skyscraper-home-bg.webp"
          alt="Background Sky"
          fill
          priority
          className="object-cover z-0"
          sizes="100vw"
        />

        {/* Top skyscraper */}
        <Image
          src="/images/skyscraper-building-top.webp"
          alt="Top Skyscraper"
          fill
          className="top-skyscraper object-cover z-10 will-change-transform"
          priority // 👈 ensures preloading and high fetch priority
          fetchPriority="high" // 👈 explicitly mark for browser
          quality={80}
        />

        {/* Bottom skyscraper */}
        <div className="absolute bottom-0 left-0 w-full h-full z-20">
          <Image
            src="/images/skyscraper-building-bottom.webp"
            alt="Bottom Skyscraper"
            fill
            className="bottom-skyscraper object-cover z-20 will-change-transform"
            sizes="100vw"
            priority // 👈 ensures preloading and high fetch priority
            fetchPriority="high" // 👈 explicitly mark for browser
            quality={80}
          />
        </div>

        <ContactBanner />

        {/* Hero text */}
        <div className="hero-middle absolute inset-0 flex flex-col text-white z-30 
          px-6 sm:px-10 md:px-24 
          pt-36 sm:pt-44 md:pt-0 
          justify-center items-start">
          <h1 className="hero-heading text-6xl font-extralight leading-tight text-[#D0D0D1] tracking-normal">
            <span className="word inline-block">Stays</span>{" "}
            <span className="word inline-block">Are</span>{" "}
            <span className="word inline-block">Easy</span>{" "}
            <br />
            <span className="word inline-block">With</span>{" "}
            <span className="word inline-block font-cormorant text-7xl">
              Kozeez
            </span>
          </h1>

          <a
            className="hero-button mt-6 w-fit bg-gradient-to-r from-[#C3A054] via-[#BD9847] to-[#C8AD62] 
                      text-white px-6 py-3 rounded-full text-lg inline-flex items-center justify-center 
                      whitespace-nowrap relative"
            href="https://www.airbnb.com.au/users/show/682498186"
            target="_blank"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

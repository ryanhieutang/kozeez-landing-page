"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  const sectionRef = useRef(null);

  // Merge refs for GSAP + intersection observer
  const setRefs = (el) => {
    sectionRef.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (!sectionRef.current || !inView) return; // ⬅️ wait until section is visible

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // ✅ Animate image
      tl.fromTo(
        ".about-img",
        { scale: 1.2, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0
      );

      // ✅ Animate background
      tl.fromTo(
        ".about-bg",
        { scale: 0.7, rotate: -45, opacity: 0 },
        { scale: 1, rotate: -6, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        0
      );

      // ✅ Animate text & CTA
      tl.fromTo(
        ".about-line, .about-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]); // depend on inView so it runs only when visible

  return (
    <section
  id="about"
  ref={setRefs}
  className="flex flex-col-reverse lg:flex-row items-center justify-center 
             px-6 sm:px-10 md:px-16 lg:px-24 
             py-24 sm:py-32 lg:py-40 
             bg-[#050712] space-y-12 lg:space-y-0"
>
      {/* Left side image */}
      <div className="relative w-full lg:w-1/2 flex justify-center 
  mt-12 sm:mt-16 md:mt-20 lg:mt-0 
  mb-12 sm:mb-16 md:mb-20 lg:mb-0">

        <div
          className="about-bg absolute w-[90%] sm:w-[80%] md:w-[85%] h-full 
                    bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] 
                    via-[#CBB365] to-[#C8AD62] rounded-2xl 
                    -rotate-[6deg] skew-x-[3deg] skew-y-[2deg] z-0"
        />

        {inView && (
          <Image
            src="/images/DSC01106.webp"
            alt="Modern Apartment"
            width={550}
            height={400}
            className="about-img relative z-10 rounded-xl w-[90%] sm:w-[80%] md:w-[75%] h-auto object-cover"
            sizes="(max-width: 768px) 100vw, 550px"
          />
        )}
      </div>

      {/* Right side text */}
      <div className="about-text w-full lg:w-1/2 lg:pl-16 text-center lg:text-left">
        <p className="text-xs sm:text-sm tracking-wider text-[#79787C] uppercase about-line">
          What Is Kozeez
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl leading-snug font-cormorant mb-5 mt-2 about-line text-transparent bg-clip-text bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62]">
          Short-stay Property Hosts
        </h2>

        <p className="text-sm sm:text-base text-white font-light about-line mb-5">
          Kozeez is a contemporary take on classic host care. Seamless tech, effortless arrivals and calm, considered interiors are paired with reliable service that you can trust. The experience is guided, assured, and unobtrusive. We revive the old promise of being truly looked after, delivered with crisp and timeless ease.
        </p>

        <p className="text-sm sm:text-base text-white font-light about-line mb-8">
          Inspired by the image of a guardian angel, our emblem distils protection into balanced geometry: lifted contours gathering around a steady spine, held within a precise frame; we provide quiet assurance that is present when needed, unobtrusive when not.
        </p>

        {/* CTA buttons */}
        <div className="about-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
          <a
            className="rounded-3xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-md font-medium bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] text-white inline-flex justify-center whitespace-nowrap relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
            href="https://www.airbnb.com.au/users/show/682498186"
            target="_blank"
          >
            Book Now
          </a>

          <a
            className="text-sm sm:text-md font-light text-white hover:text-[#DEC973] transition-colors"
            href="/explore"
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

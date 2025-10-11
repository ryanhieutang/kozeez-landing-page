"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Pristine maintenance for each stay",
    description:
      "Each property is professionally cleaned and inspected after every stay, ensuring a spotless and highly-maintained environment for every guest.",
    img: "/images/bento-vectors/rock1.webp",
  },
  {
    title: "Handpicked furnishing by professionals",
    description:
      "All Kozeez managed properties are carefully furnished with high quality furniture; handpicked by our professionals for comfort and beauty beyond the eye.",
    img: "/images/bento-vectors/package.webp",
  },
  {
    title: "Convenient location access",
    description:
      "Strategically located, our apartments offer effortless access to iconic Australian landmarks like the Harbour Bridge, Opera House, Royal Botanic Garden and more!",
    img: "/images/bento-vectors/map.webp",
  },
  {
    title: "24/7 support and customer service",
    description:
      "Direct contact with the team to assist with any questions and concerns to ensure a seamless and stress free stay.",
    img: "/images/bento-vectors/rock2.webp",
  },
];

const WhatWeProvide = () => {
  const sectionRef = useRef(null);

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

      // 1️⃣ Section heading
      tl.fromTo(
        ".provide-heading p, .provide-heading h2",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // 2️⃣ Cards - animate images first
      tl.fromTo(
        ".provide-card img",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2, // each image cascades
        },
        "-=0.6" // overlap with heading
      );

            // 4️⃣ Rock images (slightly later in sequence)
      tl.fromTo(
        ".rock-1",
        { x: 100, rotate: 15, scale: 0.6, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          scale: 1,
          opacity: 0.6,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=1.5"
      );

      tl.fromTo(
        ".rock-4",
        { x: -100, rotate: 0, scale: 0.6, opacity: 0 },
        {
          x: 0,
          rotate: 12,
          scale: 1,
          opacity: 0.6,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=1"
      );

      // 3️⃣ Then the text groups inside each card
      tl.fromTo(
        ".provide-card .text-content, .provide-card h3, .provide-card p, .provide-card li",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.8" // overlap with images
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="px-8 sm:px-28 py-24 text-white"
    >
      <div className="provide-heading mx-auto md:ml-8 mb-8 md:mb-12">
        <p className="text-sm tracking-wider text-[#79787C] uppercase">What We Provide</p>
        <h2 className="text-5xl leading-[1.2] font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent mt-3">
          Experience Beyond Expectations
        </h2>
      </div>


      <div className="grid grid-cols-12 auto-rows-auto gap-6">
        {/* Card 1 */}
        <div className="provide-card relative rounded-2xl overflow-hidden bg-[#17161A] p-8 col-span-8 h-full min-h-[250px] ">
          <div className="relative z-10 pr-48">
            <h3 className="text-2xl font-semibold">{steps[0].title}</h3>
            <p className="text-white/70 mt-2">{steps[0].description}</p>
            <ul className="mt-4 space-y-2 text-white/70 list-disc list-inside max-w-[25rem]">
              <li>
                Professional cleaning carried out after every stay, leaving each
                property spotless and refreshed for the next guest.
              </li>
              <li>
                Premium maintenance standards applied to ensure every detail of
                the home is cared for and kept in top condition.
              </li>
              <li>
                Fresh linens and soft towels are prepared for every guest.
              </li>
              <li>
                All appliances and amenities are checked for reliability, so
                everything works seamlessly throughout your stay.
              </li>
            </ul>
          </div>
          <Image
            src={steps[0].img}
            alt={steps[0].title}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            className="rock-1 will-change-transform will-change-opacity absolute -bottom-10 -right-12 w-80 h-auto object-contain transform opacity-0 scale-60 translate-x-24 rotate-[15deg]"
          />

        </div>

        {/* Card 2 */}
        <div className="provide-card relative rounded-2xl overflow-hidden bg-[#17161A] p-6 col-span-4 h-full flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-xl font-semibold">{steps[1].title}</h3>
            <p className="text-white/70 mt-2 text-sm">{steps[1].description}</p>
          </div>
          <div className="w-full relative">
            <Image
              src={steps[1].img}
              alt={steps[1].title}
              width={320}
              height={250}
              loading="lazy"
              className="w-full h-auto object-contain will-change-transform will-change-opacity"
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="provide-card relative rounded-2xl overflow-hidden bg-[#17161A] col-span-4 h-full flex flex-col">
          <div className="w-full relative p-6">
            <Image
              src={steps[2].img}
              alt={steps[2].title}
              width={320}
              height={250}
              loading="lazy"
              className="w-full h-auto object-contain will-change-transform will-change-opacity"
            />
          </div>
          <div className="p-6 flex flex-col justify-between flex-1">
            <h3 className="text-xl font-semibold">{steps[2].title}</h3>
            <p className="text-white/70 mt-2 text-sm">{steps[2].description}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="provide-card relative rounded-2xl overflow-hidden bg-[#17161A] p-8 col-span-8 h-full flex items-center">
          {/* Rock Image positioned absolutely */}
          <Image
            src={steps[3].img}
            alt={steps[3].title}
            width={160}
            height={430}
            loading="lazy"
            decoding="async"
            className="rock-4 will-change-transform will-change-opacity absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-40 h-auto object-contain opacity-0 scale-60"
          />

          {/* Text Content */}
          <div className="relative z-10 pl-48 pr-8">
            <h3 className="text-2xl font-semibold">{steps[3].title}</h3>
            <p className="text-white/70 mt-2">{steps[3].description}</p>
            <ul className="mt-4 space-y-2 text-white/70 list-disc list-inside">
              <li>
                Round-the-clock assistance for any questions or unexpected
                issues during your stay.
              </li>
              <li>
                Fast response times through direct phone, email, or in-app
                messaging support.
              </li>
              <li>
                Seamless coordination for check-in, check-out, and special guest
                requests.
              </li>
              <li>
                Dedicated team members ensuring a stress-free and personalized
                experience.
              </li>
              <li>
                Peace of mind knowing support is always just a message or call
                away.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeProvide;

"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    image: "/images/apartments-home/DSC00954.webp",
    category: "Japandi",
    title: "Japandi Style Redfern Apt. w/ Private Balcony",
    date: "July 01, 2025",
    description:
      "A sunlit Japandi-style apartment with serene treetop views, natural textures, and a private balcony.",
    link: "https://www.airbnb.com.au/h/japandi-redfern"
  },
  {
    image: "/images/apartments-home/DSC09813.webp",
    category: "Cozy",
    title: "Cozy Urban Redfern Apt. w/ Designer Courtyard",
    date: "June 01, 2025",
    description:
      "A refined lower-ground apartment blending sculptural architecture, natural textures, and a private courtyard.",
    link: "https://www.airbnb.com.au/h/cozy-redfern"
  },
];

const PropertiesShowcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // start animating when section enters view
          toggleActions: "play none none reverse",
          once: true,
        },
      });

      // Animate section header
      tl.fromTo(
        ".portfolio-heading p, .portfolio-heading h2",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      // Step 1: Animate all cards in with stagger
      tl.fromTo(
        ".property-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          onComplete: () => {
            // ✅ clear GSAP inline scale so Tailwind hover works
            gsap.set(".property-card", { clearProps: "transform" });
          },
        },
        "-=0.5"
      );


      // Step 2: Animate text inside each card
      tl.fromTo(
        ".property-card span, .property-card h3, .property-card p",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        "-=0.6"
      );

      // Animate Book Now button last
      tl.fromTo(
        ".book-now-btn",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-16 relative"
    >
      <Image
        src="/images/bg-elements/bg-ring.webp"
        alt="Background Ring Vector"
        width="1701"
        height="1701"
        className="absolute top-60 -left-80 w-[18rem] md:w-[80rem] opacity-20 pointer-events-none select-none rotate-[65deg]"
      />

      {/* Header */}
      <div className="portfolio-heading text-center md:text-left mx-auto md:ml-8 mb-8 md:mb-12 max-w-[90%] sm:max-w-3xl sm:px-28"> 
        <p className="text-sm tracking-wider text-[#79787C] uppercase"> 
          Our Portfolio 
        </p> 
        <h2 className="text-4xl md:text-5xl leading-[1.2] font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] to-[#C8AD62] bg-clip-text text-transparent mt-3"> Explore Our Apartments </h2> 
      </div>


      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl px-8 sm:px-28">
        {properties.map((property, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div
              className={`property-card property-card-${index} relative rounded-2xl overflow-hidden shadow-lg h-[420px]`}
            >
              {/* Background image */}
              <Image
                src={property.image}
                alt={property.title}
                width={384}
                height={420}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white">
                <span className="inline-block bg-gradient-to-r from-[#C3A054] via-[#DEC973] via-[#CBB365] to-[#C8AD62] text-black text-xs px-3 py-1 rounded-md uppercase mb-3">
                  {property.category}
                </span>
                <h3 className="text-lg font-medium">{property.title}</h3>
                <p className="text-sm mt-2 text-white/80 line-clamp-5">
                  {property.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>


      {/* Book Now Button */}
      <Link href="/explore" className="flex justify-center mt-10">
        <button className="book-now-btn rounded-3xl border border-[#DDC872] text-[#DDC872] px-8 py-3 text-md font-medium hover:bg-gradient-to-r hover:from-[#C3A054] hover:via-[#BD9847] hover:via-[#DEC973] hover:via-[#CBB365] hover:to-[#C8AD62] hover:text-white inline-flex justify-center whitespace-nowrap relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
          Explore
        </button>
      </Link>
    </section>
  );
};

export default PropertiesShowcase;

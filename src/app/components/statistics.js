"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 82, suffix: "%", title: "Occupancy Rate", decimals: 0 },
  { value: 5.0, suffix: "", title: "Average Star Rating", decimals: 1 },
  { value: 100, suffix: "+", title: "Bookings Completed", decimals: 0 },
];

const Statistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ✅ Batch animate title words
      ScrollTrigger.batch(".stats-title span", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.2,
            }
          ),
        once: true,
      });

      // ✅ Batch animate description lines
      ScrollTrigger.batch(".stats-desc-line", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15,
            }
          ),
        once: true,
      });

      // ✅ Animate stat blocks individually (with counters)
      const statBlocks = sectionRef.current.querySelectorAll(".stat-block");
      statBlocks.forEach((block, i) => {
        const el = block.querySelector(".stat-value");
        if (!el) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // Block animation
            gsap.fromTo(
              block,
              { x: -20, y: 20, scale: 0.8, opacity: 0 },
              {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "back.out(1.7)",
              }
            );

            // Counter animation
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stats[i].value,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent =
                  stats[i].decimals > 0
                    ? obj.val.toFixed(stats[i].decimals) + stats[i].suffix
                    : Math.floor(obj.val) + stats[i].suffix;
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={sectionRef}
  className="relative w-full bg-[#050712] text-white px-8 sm:px-28 py-24 overflow-visible"
>
  {/* Decorative BG asset */}
  <Image
    src="/images/bg-elements/bg-net.webp"
    alt="Background Net Vector"
    width="1447"
    height="1140"
    className="absolute -top-32 -right-96 w-[18rem] md:w-[100rem] opacity-30 pointer-events-none select-none rotate-90"
  />

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-start relative z-10">
    {/* Left Title */}
    <div className="md:col-span-2 stats-title text-2xl md:text-3xl font-light leading-tight">
      <span className="inline-block">Consistency.</span>{" "}
      <span className="inline-block">Comfort.</span>{" "}
      <span className="inline-block italic font-semibold">Kozeez.</span>
    </div>

    {/* Right Content */}
    <div className="md:col-span-3 space-y-8">
      {/* Description */}
      <div className="text-lg md:text-xl font-light leading-relaxed text-gray-100 space-y-2">
        <p className="stats-desc-line">
          Kozeez is more than accommodation, it&apos;s a reflection of every
          guest who left smiling,
        </p>
        <p className="stats-desc-line">
          stayed longer, or came back again. Exceptional service. Exceptional stays.
        </p>
        <p className="stats-desc-line">We let the numbers do the talking.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-block text-center md:text-left px-2 md:px-4 ${
              index !== stats.length - 1 ? "border-r border-gray-600" : ""
            }`}
          >
            <p className="stat-value text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#C3A054] via-[#BD9847] to-[#C8AD62]">
              {stat.value}
              {stat.suffix}
            </p>
            <p className="text-base text-[#79787C] mt-1">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default Statistics;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How do I book a property?",
    a: "You can easily book through our online platform. Select your dates, confirm your reservation, and you’ll receive instant booking confirmation.",
  },
  {
    q: "Are the properties professionally cleaned?",
    a: "Yes! Every property is cleaned and inspected by our professional team after each stay to ensure a spotless environment.",
  },
  {
    q: "What if I need assistance during my stay?",
    a: "We provide 24/7 customer support. You can contact us anytime through phone, email, or in-app messaging.",
  },
  {
    q: "Can I request a late checkout?",
    a: "Late checkouts are possible depending on availability. Please reach out to our team in advance, and we’ll do our best to accommodate.",
  },
  {
    q: "Do you offer discounts for long-term stays?",
    a: "Yes, we provide special rates for extended bookings. If you're planning a long-term stay, reach out to our team and we’ll be happy to arrange a tailored offer for you.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Step 1: Animate heading
      tl.fromTo(
        ".faq-heading p, .faq-heading h2",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // Step 2: Animate FAQ boxes one by one
      tl.fromTo(
        ".faq-box",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.25,
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={sectionRef}
  id="faq"
  className="relative py-24 text-white overflow-hidden w-full"
>

      {/* Heading */}
      <div className="faq-heading text-center mb-12 relative z-10">
        <p className="text-sm tracking-wider text-[#79787C] uppercase">FAQ</p>
        <h2 className="text-4xl md:text-5xl leading-[1.2] font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent mt-3">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Boxes */}
      <div className="space-y-4 relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="faq-box rounded-2xl bg-[#17161A]/80 backdrop-blur-sm p-6 cursor-pointer"
              onClick={() => toggle(i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-light">{faq.q}</h3>
                <span
                  className={`transform transition-transform duration-300 text-xl text-white/30 font-semibold ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  ✕
                </span>
              </div>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-white/70">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;

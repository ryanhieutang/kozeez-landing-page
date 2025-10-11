"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = ({ variant = "overlay" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isOverlay = variant === "overlay";

  useEffect(() => {
    // --- GSAP Animations ---
    const navWrapper = document.querySelector(".nav-wrapper");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = navContainer?.querySelectorAll(".nav-link");
    const navLogo = document.querySelector(".nav-logo");

    if (!navWrapper || !navContainer || !navLogo) return;

    gsap.set(navLogo, { y: 40, opacity: 0 });
    gsap.set(navContainer, { transformOrigin: "right center", scaleX: 0.35, opacity: 0 });
    gsap.set(navLinks, { opacity: 0, x: 20 });

    const tl = gsap.timeline();

    tl.fromTo(
      navLogo,
      { opacity: 0, y: 40, scale: 1.1 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        navWrapper,
        { opacity: 0, scale: 1.1, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out" },
        "-=0.6"
      )
      .to(
        navContainer,
        { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
        "-=0.6"
      )
      .to(
        navLinks,
        { opacity: 1, x: 0, duration: 0.8, stagger: { each: 0.15, from: "end" }, ease: "power3.out" },
        "-=0.4"
      );

    // --- Smooth Scroll / Navigation ---
    const handleClick = (e) => {
      const targetId = e.currentTarget.dataset.target;
      if (!targetId) return;
      e.preventDefault();

      // ✅ If already on home page → Smooth scroll
      if (pathname === "/") {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: targetEl, offsetY: 0 },
            ease: "none",
          });
        }
      } else {
        // ✅ If on /explore or another route → redirect to home with hash
        router.push(`/#${targetId}`);
      }
    };

    // Attach listeners
    navLinks?.forEach((link) => {
      if (link.dataset.target) link.addEventListener("click", handleClick);
    });

    return () => {
      navLinks?.forEach((link) => {
        if (link.dataset.target) link.removeEventListener("click", handleClick);
      });
    };
  }, [pathname, router]);

  return (
    <nav
      className={`${
        isOverlay
          ? "absolute top-12 left-0 px-14 bg-transparent"
          : "relative bg-[#0A0C14] px-4 pb-12"
      } w-full z-50`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center nav-logo">
          <Image
            src="/images/Kozeez Transparent Full.webp"
            alt="Kozeez Logo"
            width={64}
            height={64}
            className="h-16 w-auto"
            loading="lazy"
          />
        </Link>

        {/* Nav pill */}
        <div className="hidden md:inline-block nav-wrapper will-change-transform">
          <div
            className={`nav-container inline-flex items-center justify-end rounded-3xl overflow-hidden will-change-transform ${
              isOverlay
                ? "backdrop-blur-md bg-black/20 shadow-lg py-3 px-6"
                : "bg-[#17161A] py-3 px-8 rounded-2xl shadow-lg"
            }`}
          >
            <div className="nav-links flex items-center gap-8 mr-6">
              <a data-target="about" className="nav-link cursor-pointer text-sm font-medium text-white">
                About Us
              </a>
              <a data-target="services" className="nav-link cursor-pointer text-sm font-medium text-white">
                What We Provide
              </a>
              <a data-target="portfolio" className="nav-link cursor-pointer text-sm font-medium text-white">
                Our Portfolio
              </a>
              <a data-target="faq" className="nav-link cursor-pointer text-sm font-medium text-white">
                FAQ
              </a>
            </div>

            <Link
              href="/explore"
              className="transform transition-all duration-300 hover:scale-[1.03] nav-link nav-book relative z-10 text-base px-5 py-2 rounded-2xl bg-gradient-to-r 
            from-[#F8F8F8] via-[#F2F2F2] to-[#EAEAEA] text-gray-900 font-medium"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

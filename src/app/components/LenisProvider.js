"use client";
import { useEffect } from "react";
import Lenis from 'lenis'

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false, // optional: disable smooth on mobile
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}

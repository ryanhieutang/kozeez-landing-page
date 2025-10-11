"use client"
import React from "react";
import HeroSection from "./components/hero";
import AboutUs from "./components/aboutUs";
import Statistics from "./components/statistics";
import WhatWeProvide from "./components/whatWeProvide";
import Testimonials from "./components/testimonials";
import FAQ from './components/faq'
import PropertiesShowcase from "./components/portfolio";
import Footer from "./components/footer";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col lenis lenis-smooth">
      <HeroSection />

      <AboutUs />

      <Statistics />

      <WhatWeProvide />

      <Testimonials />

      <PropertiesShowcase />

      <FAQ />

      <Footer />
    </div>
  );
};

export default HomePage;

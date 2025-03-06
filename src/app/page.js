"use client"
import React from "react";
import HeroSection from "./sections/hero";
import AboutUs from "./sections/aboutUs";
import Statistics from "./sections/statistics";
import HowWeOperate from "./sections/whatWeProvide";
import PropertiesShowcase from "./sections/portfolio";
import Footer from "./sections/footer";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />

      <AboutUs />

      <Statistics />

      <HowWeOperate />

      {/* <PropertiesShowcase /> */}

      <Footer />
    </div>
  );
};

export default HomePage;

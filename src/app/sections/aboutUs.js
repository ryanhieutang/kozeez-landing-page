import React from "react";

const AboutUs = () => {
  return (
    <section id="who-we-are" className="flex flex-col-reverse lg:flex-row items-center justify-center px-20 md:px-28 py-40 bg-[#050712]">
      <div className="flex lg:w-1/2 space-x-6">
        <img 
            src="/images/apartment1.jpg" 
            alt="Modern Architecture" 
            className="w-1/2 object-cover shadow-lg opacity-85 mt-10 border-2 border-[#C3A054]"
        />
        <img 
            src="/images/apartment2.jpg" 
            alt="Interior Design" 
            className="w-1/2 object-cover shadow-lg opacity-85 mb-10 border-2 border-[#C3A054]"
        />
      </div>
      <div className="lg:w-1/2 lg:pl-24 pb-24 lg:pb-0">
        <p className="text-sm tracking-wider text-[#79787C] uppercase">Who We Are</p>
        <h2 className="text-5xl font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent mt-3">
            Short-stay Property Hosts
        </h2>
        <p className="text-base text-white font-light mt-4">
        Founded by two travel enthusiasts who grew up with out-of-state working parents, Kozeez is driven by a passion for delivering the ultimate premium stay experience.
        </p>
        <p className="text-base text-white font-light mt-6">
        Whether you're here for work, a holiday or even a family visit, we’re dedicated to making your stay as Kozeez as possible.
        </p>
        <button className="mt-12 border border-[#A78949] text-[#A78949] px-8 py-3 text-md font-medium hover:bg-gradient-to-r hover:from-[#C3A054] hover:via-[#BD9847] hover:via-[#DEC973] hover:via-[#CBB365] hover:to-[#C8AD62] hover:text-white">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default AboutUs;

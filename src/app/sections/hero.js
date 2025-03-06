import React, { useState } from "react";

const Hero = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex px-5 bg-[#050712] text-white flex-col items-center justify-center space-y-24 py-10 h-screen border-r border-b border-[#2F3034] z-10 text-sm">
        <a
          href="https://www.airbnb.com.au/users/show/682498186"
          target="_blank"
          className={`rotate-[-90deg] tracking-wide ${
            hoveredLink === "facebook" ? "text-white underline" : "text-[#79787C]"
          }`}
          onMouseEnter={() => setHoveredLink("facebook")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          airbnb
        </a>
        <a
          href="https://www.tiktok.com/@kozeezstays"
          target="_blank"
          className={`rotate-[-90deg] tracking-wide ${
            hoveredLink === "tiktok" ? "text-white underline" : "text-[#79787C]"
          }`}
          onMouseEnter={() => setHoveredLink("tiktok")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          tiktok
        </a>
        <a
          href="https://www.instagram.com/kozeezstays"
          target="_blank"
          className={`rotate-[-90deg] tracking-wide ${
            hoveredLink === "instagram" ? "text-white underline" : "text-[#79787C]"
          }`}
          onMouseEnter={() => setHoveredLink("instagram")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          instagram
        </a>
      </div>

      <div className="flex flex-col flex-1 h-screen relative w-full">
        <img 
          src="/images/skyscraper-home.jpg" 
          alt="Skyscraper" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="absolute justify-center pl-32 inset-0 flex flex-col text-white px-6 z-10">
          <div className="text-white">
            <h1 className="text-6xl font-extralight leading-tight opacity-80 tracking-wide">
              Stays Are Easy <br></br>With <span className="font-cormorant text-7xl opacity-100">Kozeez</span>
            </h1>
            <div>
                <a className="mt-6 bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] text-white px-16 py-3 rounded-full text-lg inline-flex justify-center whitespace-nowrap relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]" href="https://www.airbnb.com.au/users/show/682498186" target="_blank">
                  Book Now
                </a>
            </div>
          </div>
        </div>

        <a href="/" className="absolute top-0 left-0 z-20 pl-20 pt-16">
          <img 
            src="/images/Kozeez Transparent Full.png" 
            alt="Company Logo" 
            className="h-16 w-auto"
          />
        </a>

        <div className="absolute bottom-0 w-full bg-[#050712] border-b border-[#2F3034] text-white py-5 md:pr-24 flex justify-center md:justify-end space-x-10 text-xs md:text-sm font-normal z-10">
          <div className="hidden md:flex items-center space-x-2">
            <img src="/icons/map-pin.svg" alt="Location Icon" className="w-3 h-5 md:h-5 md:w-5" />
            <p>Sydney, Australia</p>
          </div>

          <a href="tel:+61406099478" className="flex items-center space-x-2 cursor-pointer hover:underline">
            <img src="/icons/phone.svg" alt="Phone Icon" className="w-3 h-5 md:h-5 md:w-5" />
            <span>(+61) 406 099 478</span>
          </a>

          <a href="mailto:contact@kozeez.com" className="flex items-center space-x-2 cursor-pointer hover:underline">
            <img src="/icons/at-symbol.svg" alt="Email Icon" className="w-3 h-5 md:h-5 md:w-5" />
            <span>contact@kozeez.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

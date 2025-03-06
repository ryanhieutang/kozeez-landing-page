import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-12 px-6 md:px-36 bg-[#050712]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-12">
          <a href="/" className="mb-6 md:mb-0">
            <img 
              src="/images/Kozeez Transparent Full.png" 
              alt="Company Logo" 
              className="h-16 w-auto"
            />
          </a>

          <div className="hidden md:block h-16 border-l border-[#2F3034]"></div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start text-white/70 text-sm space-y-2">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-2">
                <a href="#who-we-are" className="hover:text-white/90 transition">Who We Are</a>
                <a href="#what-we-provide" className="hover:text-white/90 transition">What We Provide</a>
                {/* <a href="#" className="hover:text-white/90 transition">Our Portfolio</a> */}
            </div>
            <p className="text-xs md:mt-2">&copy; 2025 Kozeez. All rights reserved.</p>
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="flex flex-col items-center md:items-end text-white/70 text-sm space-y-3">
          <div className="flex space-x-4">
            <a href="https://www.airbnb.com.au/users/show/682498186" target="_blank">
              <img src="/icons/airbnb.svg" alt="Airbnb" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
            <a href="https://www.instagram.com/kozeezstays" target="_blank">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
            {/* <a href="" target="_blank">
              <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a> */}
            <a href="https://www.tiktok.com/@kozeezstays" target="_blank">
              <img src="/icons/tiktok.svg" alt="Tiktok" className="w-5 h-5 opacity-70 hover:opacity-90" />
            </a>
          </div>
          <a href="mailto:contact@kozeez.com" className="text-sm hover:text-white/90">contact@kozeez.com</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

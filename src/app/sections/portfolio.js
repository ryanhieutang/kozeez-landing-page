import React from "react";

const properties = [
  {
    image: "/images/interior1.webp",
    category: "Luxury",
    title: "Modern Penthouse with City View",
    date: "March 12, 2024",
    description: "Experience breathtaking city views in this high-end penthouse located in the heart of downtown.",
  },
  {
    image: "/images/interior2.webp",
    category: "Beachfront",
    title: "Exclusive Beachside Villa",
    date: "April 5, 2024",
    description: "A stunning beachfront villa offering direct ocean access, private pools, and luxurious interiors.",
  },
  {
    image: "/images/interior3.webp",
    category: "Cozy",
    title: "Scandinavian Style Cabin",
    date: "February 20, 2024",
    description: "A warm and cozy Scandinavian cabin nestled in the mountains, perfect for a peaceful retreat.",
  },
];

const PropertiesShowcase = () => {
  return (
    <section className="py-28 px-24 mx-auto border-b border-[#2F3034]">
      {/* Header */}
      <div className="ml-8 mb-12">
        <p className="text-sm tracking-wider text-[#79787C] uppercase">Our Portfolio</p>
        <h2 className="text-5xl font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent mt-3">
            Explore Our Apartments
        </h2>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div key={index} className="shadow-lg overflow-hidden">
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
              <span className="absolute bottom-3 left-3 bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] text-black text-xs px-3 py-1 uppercase">
                {property.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-light text-white">{property.title}</h3>
              <p className="text-sm mt-3 text-white/80">{property.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-10">
        <button className="mt-6 border border-[#A78949] text-[#A78949] px-6 py-2 text-sm font-medium hover:bg-[#A78949] hover:text-black transition-all">
            Book Now
        </button>
      </div>
    </section>
  );
};

export default PropertiesShowcase;

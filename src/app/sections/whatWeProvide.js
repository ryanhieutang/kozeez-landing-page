import React from "react";

const steps = [
  {
    title: "Pristine maintenance for each stay",
    description: "Each property is professionally cleaned and inspected after every stay, ensuring a spotless and highly-maintained environment for every guest",
    alt: "Pristine Maintenance",
  },
  {
    title: "24/7 support and customer service for a Kozeez stay",
    description: "Direct contact with the team to assist with any questions and concerns to ensure a seamless and stress free stay. Our autonomous, no-contact key exchange system ensures a smooth and secure arrival and departure, giving YOU complete flexibility and peace of mind",
    alt: "24/7 Support",
  },
  {
    title: "Handpicked furnishing by professionals",
    description: "All Kozeez managed properties are carefully furnished with high quality furniture; handpicked by our professionals for comfort and beauty beyond the eye",
    alt: "Handpicked furnishing",
  },
  {
    title: "Convenient location access to famous landmarks",
    description: "Strategically located, our apartments offer effortless access to iconic Australian landmarks like the Harbour Bridge, Opera House, Royal Botanic Garden and more!",
    alt: "Convenient locations",
  },
];

const HowWeOperate = () => {
  return (
    <section id="what-we-provide" className="px-6 md:px-16 py-16 flex text-white border-y border-[#2F3034] flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-col justify-between px-6 md:p-8">
        <div className="flex flex-row">
            <div className="mb-10 mr-28">
                <p className="text-6xl font-cormorant bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent mt-3">What We Provide</p>
            </div>

            {/* <div className="mr-10">
                <p className="mt-4 text-sm text-white/70 max-w-72 leading-6">
                    Experience top-tier hospitality with premium stays, exceptional service, and thoughtfully curated spaces designed for comfort and convenience.
                </p>
                <button className="mt-6 border border-[#A78949] text-[#A78949] px-6 py-2 text-sm font-medium hover:bg-[#A78949] hover:text-black transition-all">
                    Book Now
                </button>
            </div> */}
        </div>

        <div className="space-y-10">
        {steps.map((step, index) => (
            <div key={index} className="flex space-x-6">
            <div>
                <h3 className="text-2xl font-medium">{step.title}</h3>
                <p className="text-base text-white/70 mt-2 max-w-2xl">{step.description}</p>
            </div>
            </div>
        ))}
        </div>
      </div>

      <div className="w-[450px] h-[700px] overflow-hidden hidden lg:flex">
        <img 
            src="/images/interior-vertical.jpg" 
            alt="Our Process" 
            className="w-full h-full object-cover object-right border-2 border-[#C3A054]"
        />
      </div>
    </section>
  );
};

export default HowWeOperate;

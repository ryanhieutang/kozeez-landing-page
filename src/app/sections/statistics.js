import React from "react";

const stats = [
  {
    value: "82%",
    title: "Occupancy Rate",
    description: "Our properties maintain a 82% occupancy rates, giving guests the confidence of a reliable, comfortable, and stress-free stay.",
  },
  {
    value: "4.8",
    title: "Average Star Rating",
    description: "We proudly holds a 4.8 star rating, reflecting our commitment to quality, cleanliness, and a great guest experience.",
  },
  {
    value: "100+",
    title: "Bookings Completed",
    description: "With over 100+ confirmed bookings, Kozeez' top rated stays ensure exceptional service and reliability you can count on!",
  },
];

const Statistics = () => {
  return (
    <section className="text-white pb-32 px-12 md:px-10 w-full flex flex-col items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col max-w-lg">
            <div className="flex flex-row items-end gap-2 bg-gradient-to-r from-[#C3A054] via-[#BD9847] via-[#DEC973] via-[#CBB365] to-[#C8AD62] bg-clip-text text-transparent">
                <p className="text-4xl font-normal">{stat.value}</p>
                <p className="text-base font-light">{stat.title}</p>
            </div>
            <p className="text-sm text-gray-200 mt-2">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;

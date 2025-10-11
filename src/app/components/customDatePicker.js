'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import './custom-datepicker.css';

function CustomCalendarContainer({ className, children }) {
  return (
    <div
      className={`${className} bg-[#050712] border border-[#2F3034] text-white p-4 shadow-lg`}
    >
      {children}
    </div>
  );
}

export default function CustomDatePicker({
  selected,
  onChange,
  placeholder,
  minDate,
  maxDate,
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      calendarClassName="!bg-transparent"
      calendarContainer={CustomCalendarContainer}
      dayClassName={(date) => {
        const today = new Date();
        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const isSelected =
            selected &&
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear();

        return [
            'text-[#D0D0D1]',
            'hover:bg-[#2F3034]/40',
            'rounded-none', // <-- ensures hover is NOT rounded
            isSelected ? 'border border-[#A78949]' : '',
            'w-10 h-10 flex items-center justify-center mx-auto',
        ].join(' ');
        }}

      weekDayClassName={() => 'text-[#D0D0D1]'}
      popperClassName="react-datepicker-popper z-50"
      wrapperClassName="w-full"
      className="bg-[#050712] outline-none w-full placeholder-white text-sm font-medium"
    />
  );
}

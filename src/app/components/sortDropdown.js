import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  'Default Order',
  'Price (Low to High)',
  'Price (High to Low)',
  'Rating',
  'Featured First',
  'Date Old to New',
  'Date New to Old',
];

export default function SortDropdown({ selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 cursor-default">
        <span className="text-lg font-light text-white">Sort By:</span>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-[#D0D0D1] flex items-center gap-1"
        >
          {selected}
          <ChevronDown size={16} className="mt-[2px]" />
        </button>
      </div>

      {open && (
        <ul className="absolute right-0 mt-2 w-56 border border-[#2F3034] bg-[#050712] shadow-lg text-sm text-white z-50">
          {sortOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-[#2F3034] ${
                selected === option ? 'bg-[#2F3034] text-white' : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

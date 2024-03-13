import React from 'react';

interface Option {
  id: number;
  label: string;
  value: string;
}

interface DropdownProps {
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <label
      htmlFor={name}
      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
    >
      <select
        name={name}
        id={name}
        className='w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-11 pl-3'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value='' disabled>
          Select position
        </option>
        {options.map(({ id, label, value }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

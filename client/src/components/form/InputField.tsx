import React from 'react';

interface InputFieldProps {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label
      htmlFor={name}
      className='relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
    >
      <input
        type={type}
        id={name}
        className='text-base peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-11 pl-3'
        placeholder={placeholder}
        value={value}
        autoComplete='off'
        onChange={(e) => onChange(e.target.value)}
      />

      <span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
        {label}
      </span>
    </label>
  );
};

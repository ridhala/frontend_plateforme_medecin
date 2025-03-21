import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputField({ label, type, name, value, onChange, required }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-l font-medium text-black">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full rounded-xl bg-white px-3 py-1.5 text-base text-black-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-black-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm"
        />
      </div>
    </div>
  );
}

export default InputField;
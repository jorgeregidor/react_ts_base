import React from "react";

interface InputProps {
  id: string;
  type: string;
  register: any;
  label: string;
  error?: any;
  placeholder?: string;
  validation?: any;
  onChange?: () => void;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  register,
  label,
  error,
  placeholder,
  validation = {},
  onChange,
  defaultValue,
}) => {
  return (
    <div className="relative group">
      <input
        className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
          !error ? "border-gray-300" : "border-red-600"
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(id, {
          ...validation,
          onChange: (_e: any) => {
            if (onChange) onChange();
          },
        })}
      />
      <label
        className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500 ${
          !error ? "text-gray-300" : "text-red-600"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

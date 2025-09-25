import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  className = '',
  disabled = false
}) => {
  const baseClasses = "font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 transition-colors duration-200";
  
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-400",
    secondary: "bg-gray-400 hover:bg-gray-700 text-white focus:ring-gray-300",
    danger: "bg-red-500 hover:bg-red-700 text-white focus:ring-red-400"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`.trim();

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

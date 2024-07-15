import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  ...rest
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none';
  let buttonClasses = baseClasses;

  if (className) {
    buttonClasses += ` ${className}`;
  }

  if (loading) {
    buttonClasses += ' opacity-50 cursor-wait';
  } else {
    buttonClasses += ' bg-blue-500 text-white hover:bg-blue-600';
  }

  return (
    <button className={buttonClasses} disabled={loading} {...rest}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;

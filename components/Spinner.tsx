import React from 'react';

interface SpinnerProps {
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-primary ${className}`}
      role="status"
      aria-label="loading"
    >
        <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
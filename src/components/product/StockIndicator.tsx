import React from 'react';

const StockIndicator = ({ stockRemaining, isHovered }) => {
  return (
    <div className="mb-3">
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-100">
          <div 
            style={{ width: `${(stockRemaining / 10) * 100}%` }} 
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StockIndicator;
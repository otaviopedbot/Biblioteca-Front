import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="flex items-center justify-center h-screen mt-2">
      <div className="max-w-sm rounded overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
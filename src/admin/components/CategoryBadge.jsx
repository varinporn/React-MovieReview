// components/CategoryBadge.jsx
import React from 'react';

const CategoryBadge = ({ category }) => {
    const dotColor =
    category === 'Movies' ? 'text-blue-500' :
    category === 'TV Shows' ? 'text-red-500' :
    'text-gray-400'; 

  return (
    <span className=" text-gray-800 px-2 py-1 rounded-full text-sm border border-gray-200">
      <span className={`${dotColor}`}>•</span> {category}
    </span>
  );
};

export default CategoryBadge;

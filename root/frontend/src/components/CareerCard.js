import React from "react";

const CareerCard = ({ title, image, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-4 cursor-pointer w-72">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-xl" />
      <h3 className="text-xl font-semibold mt-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
};

export default CareerCard;

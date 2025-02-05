import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

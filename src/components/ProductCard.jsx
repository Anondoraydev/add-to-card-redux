// ProductCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border relative overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold text-blue-600">${product.price}</span>

        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
        >
          <FaShoppingCart size={18} /> Add to Cart
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ProductCard;

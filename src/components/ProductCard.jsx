import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === product.id); // Check if product is in cart

  const [popupMessage, setPopupMessage] = useState(null);

  const handleAddToCart = () => {
    if (isInCart) {
      setPopupMessage("⚠️ This product is already in your cart.");
    } else {
      dispatch(addToCart(product));
      setPopupMessage("✅ Added to Cart!");
    }

    setTimeout(() => setPopupMessage(null), 2000); // Hide popup after 2s
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-5 border relative overflow-hidden"
      whileHover={{ scale: 1.05 }} // Card hover effect
      transition={{ duration: 0.3 }}
    >
      <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
      <h3 className="text-lg font-semibold mt-2 line-clamp-1">{product.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold text-blue-600">${product.price}</span>

        <motion.button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleAddToCart}
          whileTap={{ scale: 0.8, rotate: -5 }} // Click animation
        >
          <ShoppingCart size={18} /> {isInCart ? "✔️ Added" : "Add"}
        </motion.button>
      </div>

      {/* Toast-style Error Popup */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            className={`fixed top-16 right-10 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md text-white ${
              popupMessage.includes("⚠️") ? "bg-red-500" : "bg-green-500"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;

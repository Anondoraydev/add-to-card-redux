import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold"> 🛍️ MyShop </Link>
        <Link to="/cart" className="hover:text-blue-400 transition flex items-center gap-1 relative">
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.3, 1] }} // Bounces when updated
            transition={{ duration: 0.3 }}
            key={cartItems.length} // Re-runs animation on change
          >
            <ShoppingCart size={24} />
          </motion.div>
          
          <span>Cart</span>

          {cartItems.length > 0 && (
            <motion.span
              className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              {cartItems.length}
            </motion.span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

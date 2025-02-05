import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Store } from "lucide-react"; // Import icons
import { motion } from "framer-motion";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Store Icon */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Store size={28} className="text-blue-400" /> MyShop
        </Link>

        {/* Icons for User & Cart */}
        <div className="flex items-center gap-6">
          {/* User Icon */}
          <Link to="/user" className="text-white">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <User size={24} />
            </motion.div>
          </Link>

          {/* Cart Icon with Item Count */}
          <Link to="/cart" className="text-white relative flex items-center gap-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart size={24} />
            </motion.div>

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
      </div>
    </nav>
  );
};

export default Navbar;

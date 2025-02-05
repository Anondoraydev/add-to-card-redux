import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice"; // Import remove action
import { FaTrash } from "react-icons/fa"; // Import remove trash icon from react-icons
import { ToastContainer } from "react-toastify"; // Toast Container for displaying messages
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); // Dispatch remove action
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : null}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </div>

            {/* Remove Item Button with Icon */}
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
            >
              <FaTrash size={18} className="mr-2" /> Remove
            </button>
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CartPage;

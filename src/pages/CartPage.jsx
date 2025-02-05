import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [selectedPayment, setSelectedPayment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle item removal
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      dispatch(updateQuantity({ id, quantity: value }));
    }
  };

  // Handle payment method selection
  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("❌ Please select a payment method!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    if (!deliveryAddress) {
      toast.error("❌ Please provide a delivery address!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    toast.success(`✅ Payment successful via ${selectedPayment}!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("❌ Your cart is empty. Please add products to the cart before checking out!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    if (!selectedPayment || !deliveryAddress || !name || !email || !phone) {
      toast.error("❌ Please fill in all details before checkout!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    toast.success("✅ Order placed successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {/* Quantity buttons */}
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        +
                      </button>
                    </div>
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

          <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <p className="mt-2">Total Items: {cartItems.length}</p>
            <p className="mt-2 text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}

      {/* Personal Information Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Enter Personal Information</h3>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Delivery Address Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Enter Delivery Address</h3>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Delivery Address"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Select Payment Method</h3>
        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Payment Method --</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      {/* Checkout Buttons */}
      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={handlePayment}
          disabled={cartItems.length === 0}
          className={`w-full py-3 rounded-lg ${
            cartItems.length === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 text-white"
          } hover:bg-green-600 transition`}
        >
          Proceed to Payment
        </button>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Checkout
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CartPage;

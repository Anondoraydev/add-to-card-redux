import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { FaTrash, FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from "react-icons/fa";
import { MdError, MdPayment } from "react-icons/md";
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

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.info(<div className="flex items-center gap-2"><FaTrash className="text-red-500" /> Product removed!</div>);
  };

  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      dispatch(updateQuantity({ id, quantity: value }));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error(<div className="flex items-center gap-2"><MdError className="text-red-500" /> Cart is empty!</div>);
      return;
    }
    if (!selectedPayment || !deliveryAddress || !name || !email || !phone) {
      toast.error(<div className="flex items-center gap-2"><MdError className="text-red-500" /> Fill all details!</div>);
      return;
    }
    toast.success(<div className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Order placed successfully!</div>);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">🛒 Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-2xl text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl border border-gray-300">
              <div className="flex items-center gap-6">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-gray-600 font-medium">${item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md" disabled={item.quantity <= 1}>-</button>
                    <span className="text-xl font-bold">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="bg-red-600 text-white px-5 py-3 rounded-lg flex items-center text-lg font-bold shadow-md">
                <FaTrash size={20} className="mr-2" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-700">Order Summary</h3>
        <p className="text-lg text-gray-600">Total Items: {cartItems.length}</p>
        <p className="font-bold text-2xl text-blue-600">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>

      <div className="mt-8 bg-white p-6 shadow-lg rounded-xl border border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Enter Details</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-3 mb-3 border rounded-lg" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 border rounded-lg" required />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full p-3 mb-3 border rounded-lg" required />
        <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Delivery Address" className="w-full p-3 mb-3 border rounded-lg" required />
      </div>

      <div className="mt-8 bg-white p-6 shadow-lg rounded-xl border border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Payment Method</h3>
        <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} className="w-full p-3 border rounded-lg" required>
          <option value="">-- Select Payment --</option>
          <option value="bKash">bKash</option>
          <option value="Nagad">Nagad</option>
          <option value="Rocket">Rocket</option>
          <option value="Upay">Upay</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={handleCheckout} className="bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg flex items-center">
          <MdPayment size={24} className="mr-3" /> Checkout
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CartPage;

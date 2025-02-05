import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : null}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg">{item.title}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;

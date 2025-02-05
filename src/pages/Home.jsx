import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, currentPage } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(fetchProducts());
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center my-6">🛍️ Our Products</h2>
      {loading ? <p className="text-center">Loading...</p> : null}

      {/* 3 Cards Per Row Design */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[1, 2, 3, 4].map((page) => (
          <motion.button
            key={page}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(page)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {page}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Home;

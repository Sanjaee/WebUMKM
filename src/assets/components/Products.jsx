import { useEffect, useState } from "react";
import api from "../../utils/api"; // Adjust the path accordingly
import { Link } from "react-router-dom";
import ProductCardSkeleton from "./SkeletonProducts";
import "boxicons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getItems(); // Assuming the API function is named getItems
        setProducts(data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-[1200px] sticky top-0">
      <div className="flex bg-white h-[67.9972px] items-center pl-2 pr-2 sm:pr-6 sm:pl-6 overflow-x-auto">
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Makanan
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
        <button className="py-2 px-2 bg-red-500 rounded-lg mr-3 text-white shadow-lg">
          Electonik
        </button>
      </div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-3 pl-2 pr-2 sm:pr-6 sm:pl-6 pb-[200px]">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => {
              const discountedPrice = product.harga * 0.8;
              const discountAmount = product.harga - discountedPrice;
              const discountPercentage = Math.round(
                (discountAmount / product.harga) * 100
              );

              return (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="max-w-[188.008px] max-h-[368.984px] border bg-white rounded-xl shadow-lg">
                    <img
                      className="max-w-[188.008px] w-full h-full min-h-[171.600px] object-cover object-center rounded-t-lg"
                      src={product.gambar}
                      alt={product.altText}
                      loading="lazy"
                    />
                    <div className="p-2 w-full min-h-[160px]">
                      <p className="text-[17px] font-normal line-clamp-2 ">
                        {product.nama_product}
                      </p>
                      <p className="text-[17px] font-bold mt-1">
                        {formatRupiah(discountedPrice)}
                      </p>
                      <div className="flex">
                        <p className="text-sm mr-1 text-gray-500 line-through">
                          {formatRupiah(product.harga)}
                        </p>
                        <p className="text-sm text-red-500 font-bold">
                          {discountPercentage}%
                        </p>
                      </div>
                      <div className="flex items-center mt-1">
                        <box-icon
                          name="current-location"
                          color="#12d207"
                        ></box-icon>
                        <p className=" ml-1 text-[#6D7588] text-[12px]">
                          {product.lokasi}
                        </p>
                      </div>

                      <p className="text-[12px] mt-1 text-[#6D7588] flex line-clamp-1">
                        <svg
                          className="unf-icon mr-1"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="var(--YN300, #FFC400)"
                        >
                          <path d="M21.57 9.14a2.37 2.37 0 00-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 00-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 00-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 002.35 2.79 2.42 2.42 0 001.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 002.57-.23 2.369 2.369 0 00.89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 00.57-2.44z"></path>
                        </svg>
                        {product.rate} | {product.terjual} Terjual
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Products;

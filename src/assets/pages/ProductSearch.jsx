// ProductSearch.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import ProductCardSkeleton from "../components/SkeletonProducts";
import Navbars from "../components/Navbars";

const ProductSearch = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await api.getItemById(id);
        setProduct(data);

        // Fetch related products with the same category
        const relatedData = await api.getItemsByCategory(data.category);
        setRelatedProducts(
          relatedData.filter(
            (item) => item._id !== id && item.category === data.category
          )
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      setLoading(false);
    };

    fetchProductDetail();
  }, [id]);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const discountedPrice = product?.harga * 0.8;
  const discountAmount = product?.harga - discountedPrice;
  const discountPercentage = Math.round(
    (discountAmount / product?.harga) * 100
  );

  return (
    <div>
      <Navbars />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-24 sm:mt-32 pl-2 pr-2 sm:pr-6 sm:pl-6 ">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          <>
            {/* Display the main product */}
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              className="max-w-[234.006px] border bg-white rounded-xl shadow-lg"
            >
              <img
                className="max-w-[100%] max-h-[100%] object-cover rounded-t-lg"
                src={product?.gambar}
                alt={product?.altText}
                loading="lazy"
              />
              <div className="p-2">
                <p className="text-[17px] font-normal line-clamp-2">
                  {product?.nama_product}
                </p>
                <p className="text-[17px] font-bold mt-1">
                  {discountedPrice !== undefined
                    ? formatRupiah(discountedPrice)
                    : formatRupiah(product?.harga)}
                </p>
                <div className="flex">
                  <p className="text-sm mr-1 text-gray-500 line-through">
                    {formatRupiah(product?.harga)}
                  </p>
                  <p className="text-sm text-red-500 font-bold">
                    {discountPercentage}%
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <box-icon name="current-location" color="#12d207"></box-icon>
                  <p className=" ml-1 text-[#6D7588] text-[12px]">
                    {product?.lokasi}
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="unf-icon mr-1"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="var(--YN300, #FFC400)"
                  >
                    <path d="M21.57 9.14a2.37 2.37 0 00-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 00-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 00-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 002.35 2.79 2.42 2.42 0 001.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 002.57-.23 2.369 2.369 0 00.89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 00.57-2.44z"></path>
                  </svg>
                  <p className="text-[10px]">
                    {product?.rate} | {product?.terjual} Terjual
                  </p>
                </div>
              </div>
            </Link>

            {/* Display related products */}
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                to={`/product/${relatedProduct._id}`}
                className="max-w-[234.006px] border bg-white rounded-xl shadow-lg"
              >
                <img
                  className="max-w-[100%] max-h-[100%] object-cover rounded-t-lg"
                  src={relatedProduct.gambar}
                  alt={relatedProduct.altText}
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-[17px] font-normal line-clamp-2">
                    {relatedProduct.nama_product}
                  </p>
                  <p className="text-[17px] font-bold mt-1">
                    {discountedPrice !== undefined
                      ? formatRupiah(discountedPrice)
                      : formatRupiah(product?.harga)}
                  </p>
                  <div className="flex">
                    <p className="text-sm mr-1 text-gray-500 line-through">
                      {formatRupiah(product?.harga)}
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
                      {product?.lokasi}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="unf-icon mr-1"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="var(--YN300, #FFC400)"
                    >
                      <path d="M21.57 9.14a2.37 2.37 0 00-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 00-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 00-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 002.35 2.79 2.42 2.42 0 001.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 002.57-.23 2.369 2.369 0 00.89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 00.57-2.44z"></path>
                    </svg>
                    <p className="text-[10px]">
                      {relatedProduct.rate} -| {relatedProduct.terjual} Terjual
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;

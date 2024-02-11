// ProductSearch.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import ProductCardSkeleton from "../components/SkeletonProducts";

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

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-3 pl-2 pr-2 sm:pr-6 sm:pl-6">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          <>
            {/* Display the main product */}
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="max-w-[234.006px] border bg-white rounded-xl shadow-lg"
            >
              <img
                className="max-w-[100%] max-h-[100%] object-cover rounded-t-lg"
                src={product.gambar}
                alt={product.altText}
                loading="lazy"
              />
              <div className="p-2">
                <p className="text-[17px] font-normal line-clamp-2">
                  {product.nama_product}
                </p>
                <p className="font-bold">{formatRupiah(product.harga)}</p>
                <p className="text-[10px]">⭐5.0 | {product.rate} Terjual</p>
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
                  <p className="font-bold">
                    {formatRupiah(relatedProduct.harga)}
                  </p>
                  <p className="text-[10px]">
                    ⭐5.0 | {relatedProduct.rate} Terjual
                  </p>
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

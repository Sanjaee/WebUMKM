import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import NavbarDetailProduct from "../components/NavbarDetailProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await api.getItemById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
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

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  const discountedPrice = product.harga * 0.8;
  const discountAmount = product.harga - discountedPrice;

  return (
    <div className="bg-gray-100 md:flex">
      <NavbarDetailProduct />
      <img
        className="w-full h-[400px] object-cover object-center md:w-[240px] md:h-[240px] mt-14"
        src={product.gambar}
        alt={product.altText}
      />
      <div className="p-4 shadow-lg bg-white">
        <p className="font-bold text-[18px]">{formatRupiah(discountedPrice)}</p>
        <div className="flex">
          <p className="text-sm text-gray-500 line-through ">
            {formatRupiah(product.harga)}
          </p>
          <p className="text-sm text-red-500 ml-1 font-bold">
            {Math.round((discountAmount / product.harga) * 100)}%
          </p>
        </div>
        <p className="text-[18px] mt-4">{product.nama_product}</p>
        <p className="text-sm mt-4">Terjual {product.rate}+</p>
      </div>

      <div className="p-4 mt-4 shadow-lg bg-white">
        <h1 className="font-bold mb-4">Detail Produk</h1>
        <div className="flex border-b border-gray-300">
          <p className="mb-2">Kondisi</p>
          <p className="ml-[70px]">Baru</p>
        </div>
        <div className="flex border-b border-gray-300">
          <p>Kategori</p>
          <p className="ml-16">{product.category}</p>
        </div>
        <div className="mt-4">
          <h1 className="font-bold">Deskripsi Produk</h1>
          <p className="text-sm mt-4">{product.deskripsi}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

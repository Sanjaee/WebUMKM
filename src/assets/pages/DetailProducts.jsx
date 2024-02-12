import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const sliderSettings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const discountedPrice = product.harga * 0.8;
  const discountAmount = product.harga - discountedPrice;

  return (
    <div className="bg-gray-100 ">
      <NavbarDetailProduct />
      {/* mobile */}
      <div className="sm:hidden">
        <Slider {...sliderSettings}>
          {product.detailproduct.map((slide) => (
            <div key={slide._id}>
              <img
                className="w-full h-[400px] object-cover object-center mt-14"
                src={slide.image}
                alt={product.nama_product}
              />
            </div>
          ))}
        </Slider>
        <div className="p-4 shadow-lg bg-white">
          <p className="font-bold text-[18px]">
            {formatRupiah(discountedPrice)}
          </p>
          <div className="flex">
            <p className="text-sm text-gray-500 line-through ">
              {formatRupiah(product.harga)}
            </p>
            <p className="text-sm text-red-500 ml-1 font-bold">
              {Math.round((discountAmount / product.harga) * 100)}%
            </p>
          </div>
          <p className="text-[18px] mt-4">{product.nama_product}</p>
          <div className="flex items-center">
            <p className="text-sm mt-4  text-black">
              Terjual {product.terjual}+
            </p>
            <a className="  items-center">
              <p className="text-sm mt-4 ml-2 text-black border border-gray-400 rounded-lg px-2 py-[7px] flex items-center justify-center  font-bold hover:bg-slate-100">
                <svg
                  className="unf-icon mr-1"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="var(--YN300, #FFC400)"
                >
                  <path d="M21.57 9.14a2.37 2.37 0 00-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 00-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 00-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 002.35 2.79 2.42 2.42 0 001.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 002.57-.23 2.369 2.369 0 00.89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 00.57-2.44z"></path>
                </svg>
                {product.rate}
                <span className="ml-1 text-gray-500">({product.terjual})</span>
              </p>
            </a>
          </div>
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
        {/* Tombol chekout Mobile */}
        <div className="flex items-center fixed bottom-0 w-full h-[60px] bg-white px-2 border shadow-2xl justify-center">
          <a href="" className="border border-gray-800 bg-white p-2 rounded-lg">
            <svg
              className="unf-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="var(--NN1000, #000000)"
            >
              <path d="M3.66 21.67a.84.84 0 0 0 .34.08.74.74 0 0 0 .45-.15l3.8-2.85H17A3.71 3.71 0 0 0 20.75 15V7A3.71 3.71 0 0 0 17 3.25H7A3.71 3.71 0 0 0 3.25 7v14a.76.76 0 0 0 .41.67ZM6.13 4.907A2.2 2.2 0 0 1 7 4.75h10A2.2 2.2 0 0 1 19.25 7v8A2.2 2.2 0 0 1 17 17.25H8a.74.74 0 0 0-.45.15l-2.8 2.1V7a2.2 2.2 0 0 1 1.38-2.093ZM16 9.74H8a.75.75 0 0 1 0-1.5h8a.75.75 0 1 1 0 1.5Zm-3 4H8a.75.75 0 1 1 0-1.5h5a.75.75 0 1 1 0 1.5Z"></path>
            </svg>
          </a>
          <button className="ml-2 w-full h-10 border text-green-500 font-bold border-green-500 rounded-lg">
            Beli
          </button>
          <button className="ml-2 w-full h-10 border text-white font-bold rounded-lg bg-green-500">
            + Keranjang
          </button>
        </div>
      </div>
      {/* pc */}
      <div className="hidden  bg-white sm:flex">
        <Slider
          className="w-full sm:w-[270px] sm:h-[280px]  sm:mt-[161px] sm:rounded-xl ml-8"
          {...sliderSettings}
        >
          {product.detailproduct.map((slide) => (
            <div key={slide._id}>
              <img
                className="w-full  object-cover object-center sm:w-[270px] sm:h-[280px]  sm:rounded-xl "
                src={slide.image}
                alt={product.nama_product}
              />
            </div>
          ))}
        </Slider>
        <div className="sm:flex sm:flex-col mt-[161px] w-[360px] ml-10">
          <div className=" bg-white">
            <p className="text-xl font-extrabold">{product.nama_product}</p>
            <div className="flex items-center">
              <p className="text-md mt-1">Terjual {product.terjual}+</p>
              <span className="items-center px-2">•</span>
              <svg
                className="unf-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="var(--YN300, #FFC400)"
              >
                <path d="M21.57 9.14a2.37 2.37 0 00-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 00-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 00-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 002.35 2.79 2.42 2.42 0 001.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 002.57-.23 2.369 2.369 0 00.89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 00.57-2.44z"></path>
              </svg>
              <p className="ml-1 text-md">
                {product.rate}{" "}
                <span className="text-gray-500 font-semibold">
                  ({product.terjual} rating)
                </span>
              </p>
            </div>
            <p className="font-bold text-3xl mt-4">
              {formatRupiah(discountedPrice)}
            </p>
            <div className="flex">
              <p className="text-[10px] text-red-500 ml-1 font-bold bg-red-200 px-[3px] py-1 rounded-md ">
                {Math.round((discountAmount / product.harga) * 100)}%
              </p>
              <p className="text-md  text-gray-500 line-through ml-1 ">
                {formatRupiah(product.harga)}
              </p>
            </div>
          </div>

          <div className=" mt-4  bg-white ">
            <h1 className="font-bold mb-4 border-t pt-4">Detail Produk</h1>

            <div className="mt-4">
              <p className="text-sm mt-4">{product.deskripsi}</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block  w-[268px] h-[368px] mt-[161px] rounded-lg p-4 border border-gray-400 ml-10">
          <h1 className="font-bold text-lg">Atur jumlah dan catatan</h1>
          {product.detailproduct.length > 0 && (
            <div
              key={product.detailproduct[0]._id}
              className="flex items-center"
            >
              <img
                className="w-full object-cover object-center sm:w-[48px] sm:h-[48px] sm:rounded-md mt-4"
                src={product.detailproduct[0].image}
                alt={product.nama_product}
              />
              <p className="text-md ml-3 mt-2 font-bold">
                {product.detailproduct[0].size} <span>{product.type}</span>
              </p>
            </div>
          )}
          <div className="flex  items-center juctify-center mt-4 border-t pt-4">
            <div className="w-[100px] h-[30px] flex  justify-between px-2  rounded-lg items-center border border-gray-400">
              <button className=" ">
                <svg
                  className="unf-icon"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  fill="var(--NN300, #BFC9D9)"
                >
                  <path d="M20 12.75H4a.75.75 0 110-1.5h16a.75.75 0 110 1.5z"></path>
                </svg>
              </button>
              <p>1</p>
              <button className=" ">
                <svg
                  className="unf-icon"
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  fill="var(--GN500, #00AA5B)"
                >
                  <path d="M20 11.25h-7.25V4a.75.75 0 10-1.5 0v7.25H4a.75.75 0 100 1.5h7.25V20a.75.75 0 101.5 0v-7.25H20a.75.75 0 100-1.5z"></path>
                </svg>
              </button>
            </div>
            <p className="ml-2">
              Stok: <b>{product.stok}</b>
            </p>
          </div>

          <div className="flex justify-between mt-9">
            <p className="mt-8 text-gray-400">Subtotal</p>
            <div>
              <p className="text-[18px]  text-gray-500 line-through ml-1 text-end">
                {formatRupiah(product.harga)}
              </p>
              <p className="font-bold text-[18px] ">
                {formatRupiah(discountedPrice)}
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button className="w-[98.750px] h-[38px] text-sm text-green-600 border border-green-400 rounded-md font-extrabold ">
              Beli Langsung
            </button>
            <button className="w-[98.750px] h-[38px] text-sm text-white bg-green-600 rounded-md font-extrabold">
              + Keranjang
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <a href="" className="flex justify-center items-center   ml-2">
              <svg
                className="unf-icon "
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="var(--NN950, #212121)"
              >
                <path d="M3.66 21.67a.84.84 0 00.34.08.74.74 0 00.45-.15l3.8-2.85H17A3.71 3.71 0 0020.75 15V7A3.71 3.71 0 0017 3.25H7A3.71 3.71 0 003.25 7v14a.76.76 0 00.41.67zM6.13 4.907A2.2 2.2 0 017 4.75h10A2.2 2.2 0 0119.25 7v8A2.2 2.2 0 0117 17.25H8a.74.74 0 00-.45.15l-2.8 2.1V7a2.2 2.2 0 011.38-2.093zM16 9.74H8a.75.75 0 010-1.5h8a.75.75 0 110 1.5zm-3 4H8a.75.75 0 110-1.5h5a.75.75 0 110 1.5z"></path>
              </svg>
              <p className=" font-bold border-r border-gray-700 pr-2 pl-2">
                Chat
              </p>
            </a>
            <a href="" className="flex justify-center items-center   ml-2">
              <svg
                className="unf-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="var(--NN950, #212121)"
                data-testid="viewUnwishlisted"
              >
                <path d="M12.11 20.81a1.61 1.61 0 01-.92-.28c-2.14-1.28-6-4-7.92-7.64a6.8 6.8 0 010-7.12 5.39 5.39 0 014.6-2.54A5.1 5.1 0 0112 5.55a5.14 5.14 0 014.24-2.32 5.5 5.5 0 014.56 2.56 7.62 7.62 0 01.15 7c-2.31 4.17-7 7.15-8 7.7a1.63 1.63 0 01-.84.32zM7.87 4.73a3.89 3.89 0 00-3.4 1.87c-.18.27-1.6 2.45.13 5.59 1.7 3.32 5.4 5.86 7.4 7.08a.19.19 0 00.2 0c.56-.34 5.29-3.25 7.43-7.1a6.11 6.11 0 00-.09-5.6 4 4 0 00-3.29-1.86 4.12 4.12 0 00-3.57 2.61L12 8.68l-.67-1.34c-.84-1.68-2.07-2.61-3.46-2.61z"></path>
              </svg>
              <p className=" font-bold border-r border-gray-700 pr-2 pl-2">
                Wishlist
              </p>
            </a>
            <a href="" className="flex justify-center items-center  ml-2">
              <svg
                className="unf-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="var(--NN950, #212121)"
              >
                <path d="M18.28 14.85a2.89 2.89 0 00-2.36 1.21l-6.69-3.53a.38.38 0 01-.1 0A2.63 2.63 0 009.1 11h.09l7-3.2a2.85 2.85 0 002.12 1 2.95 2.95 0 10-3-2.88c.02.203.057.403.11.6L8.57 9.61a.83.83 0 00-.18.13 2.95 2.95 0 00-5.06 2.12 3 3 0 003 2.88 2.94 2.94 0 002.16-1c.028.026.058.05.09.07l6.84 3.61c-.01.13-.01.26 0 .39a3 3 0 003 2.88 2.949 2.949 0 002.196-5.09 2.95 2.95 0 00-2.196-.8l-.14.05zm0-10.5a1.45 1.45 0 110 2.89 1.52 1.52 0 01-1.45-1.44 1.46 1.46 0 011.45-1.45zm-12 8.89a1.52 1.52 0 01-1.45-1.44 1.45 1.45 0 111.45 1.44zm12 6a1.52 1.52 0 01-1.45-1.44 1.45 1.45 0 111.45 1.44z"></path>
              </svg>
              <p className=" font-bold pr-2 pl-2">Share</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";
import shopping from "../../assets/quick-atc-add-to-cart-grey.svg";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";
import useGetWishList from "../../Hooks/useGetWishList";
export default function ProductDetails() {
  const [porductDetails, setPorductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [CartData, setCartData] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const { data } = useGetWishList();
  const { addToCart, getCart, removeCartItems } = useContext(CartContext);
  const { addToWish, removeWish } = useContext(WishListContext);
  var settings = {
    dots: true,
    infinite: porductDetails?.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let { id, category } = useParams();
  function getPorductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setPorductDetails(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let related = allProduct.filter((product) => {
          return product.category.name == category;
        });
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Fetch Cart
  async function getCartt() {
    const response = await getCart();
    if (response.data.status === "success") {
      setCartData(response.data.data.products);
    } else {
      toast.error(response.data.message);
    }
  }
  // Add to Cart
  async function addCarrt(productId) {
    const response = await addToCart(productId);
    if (response.data.status === "success") {
      await getCartt();
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { background: "#333", color: "#fff" },
        icon: "🛒",
      });
    } else {
      toast.error(response.data.message);
    }
  }
  // Remove from Cart
  async function removeFromCart(id) {
    const response = await removeCartItems(id);
    if (response.data.status === "success") {
      await getCartt();
      setCartData(response.data.data.products);
      toast.success("Product removed from cart successfully", {
        duration: 4000,
        position: "top-center",
        style: { background: "#333", color: "#fff" },
        icon: "🗑️",
      });
    } else {
      toast.error(response.message);
    }
  }
  // Checkers
  function isInCart(id) {
    return CartData?.some((item) => item.product.id === id);
  }

  function isLikeIt(id) {
    return likeList.includes(id);
  }
  // Get Wishlist
  useEffect(() => {
    if (data) {
      const wishlistIds = data.map((item) => item.id);
      setLikeList(wishlistIds);
    }
  }, [data]);
  // Add to Wishlist
  async function addWishList(id) {
    const response = await addToWish(id);
    if (response.data.status === "success") {
      setLikeList(response.data.data);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { background: "#333", color: "#fff" },
        icon: "❤️",
      });
    } else {
      toast.error(response.message);
    }
  }

  // Remove from Wishlist
  async function removeWishList(id) {
    const response = await removeWish(id);
    if (response.data.status === "success") {
      setLikeList(response.data.data);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { background: "#333", color: "#fff" },
        icon: "💔",
      });
    } else {
      toast.error(response.message);
    }
  }
  useEffect(() => {
    getPorductDetails(id);
    getRelatedProducts(category);
    getCartt();
  }, [id, category]);
  return (
    <>
      <div className="row mb-5">
        <div className="w-full lg:w-1/4">
          <Slider {...settings}>
            {porductDetails?.images.map((src) => (
              <img className="w-full" src={src} alt={porductDetails?.title} />
            ))}
          </Slider>
        </div>
        <div className="w-full lg:w-3/4 pl-10">
          <h1 className="text-2xl font-medium">{porductDetails?.title}</h1>
          <p className="font-light my-3">{porductDetails?.description}</p>
          <span className="block  text-green-600 mb-2">
            {porductDetails?.category.name}
          </span>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-3xl">
              {porductDetails?.price}{" "}
              <samp className="font-extralight italic text-xl">EGP</samp>
            </span>
            <span className="bg-gray-200 text-gray-800  font-medium me-2  px-2 py-0.5 rounded-md text-md">
              {porductDetails?.ratingsAverage}{" "}
              <i className="fa-solid fa-star text-yellow-300"></i>
            </span>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button
              onClick={() => addCarrt(porductDetails?.id)}
              className="w-3/4 font-semibold text-white bg-green-600 py-2 rounded-md  cursor-pointer hover:bg-green-800 transition duration-300"
            >
              Add To Cart
            </button>
            <span
              onClick={() =>
                isLikeIt(porductDetails?.id)
                  ? removeWishList(porductDetails?.id)
                  : addWishList(porductDetails?.id)
              }
              className="cursor-pointer"
            >
              <i
                className={`fa-${
                  isLikeIt(porductDetails?.id)
                    ? "solid text-red-700"
                    : "regular"
                } fa-heart fa-2x`}
              ></i>
            </span>
          </div>
        </div>
      </div>
      <div className=" w-full border-2 opacity-15 bg-gray-400 absolute left-0 right-0"></div>
      <h2 className="mb-2 ml-6 mt-14 text-3xl font-semibold capitalize">
        Products related to {porductDetails?.category.name}
      </h2>

      <div className="row justify-center bg-white gap-x-1 rounded-xl">
        {relatedProducts?.map((product) => {
          return (
            <div
              key={product.id}
              className=" border border-gray-300 rounded-2xl w-full sm:w-[49.5%] md:w-[24.6%] xl:w-[16.4%] my-4 px-3"
            >
              <Link
                to={`/ProductDetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="ml-2">
                  <span className="block  text-green-600">
                    {product.category.name}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-2xl">
                      {product.price}{" "}
                      <samp className="font-extralight italic text-xl">
                        EGP
                      </samp>
                    </span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fa-solid fa-star text-yellow-300"></i>
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between items-center">
                <button
                  id={product.id}
                  onClick={() =>
                    isInCart(product.id)
                      ? removeFromCart(product.id)
                      : addCarrt(product.id)
                  }
                  className={`px-3 font-semibold text-white py-2 rounded-md my-2 cursor-pointer transition duration-300 ${
                    isInCart(product.id)
                      ? "bg-sky-600 hover:bg-sky-800"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  <img className="w-6" src={shopping} alt="Add to Cart" />
                </button>
                <span
                  onClick={() =>
                    isLikeIt(product.id)
                      ? removeWishList(product.id)
                      : addWishList(product.id)
                  }
                  className="cursor-pointer"
                >
                  <i
                    className={`fa-${
                      isLikeIt(product.id) ? "solid text-red-700" : "regular"
                    } fa-heart fa-2x`}
                  ></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

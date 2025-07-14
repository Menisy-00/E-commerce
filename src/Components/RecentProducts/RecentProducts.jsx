import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProducts.module.css";
import axios from "axios";
import Spiner from "../Spiner/Spiner";
import { Link } from "react-router-dom";
import ProductSlider from "../ProductSlider/ProductSlider";
import MainSlider from "../MainSlider/MainSlider";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";
import useGetWishList from "../../Hooks/useGetWishList";
import toast from "react-hot-toast";
import shopping from "../../assets/quick-atc-add-to-cart-grey.svg";

export default function RecentProducts() {
  const [RecentProd, setRecentProd] = useState([]);
  const [CartData, setCartData] = useState([]);
  const [likeList, setLikeList] = useState([]);

  const { data } = useGetWishList();
  const { addToCart, getCart, removeCartItems } = useContext(CartContext);
  const { addToWish, removeWish } = useContext(WishListContext);

  // Get Wishlist
  useEffect(() => {
    if (data) {
      const wishlistIds = data.map((item) => item.id);
      setLikeList(wishlistIds);
    }
  }, [data]);

  // Initial Data (Products + Cart)
  useEffect(() => {
    getProducts();
    getCartt();
  }, []);

  // Fetch Products
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => setRecentProd(data.data))
      .catch((error) => console.log(error));
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

  // Checkers
  function isInCart(id) {
    return CartData?.some((item) => item.product.id === id);
  }

  function isLikeIt(id) {
    return likeList.includes(id);
  }

  // UI
  return (
    <>
      {RecentProd.length > 0 ? (
        <div>
          <MainSlider />
          <ProductSlider />
          <div className="row justify-center bg-white gap-x-1">
            {RecentProd.map((product) => (
              <div
                key={product.id}
                className="border border-gray-300 rounded-2xl w-full sm:w-[49.5%] md:w-[24.6%] xl:w-[16.4%] my-4 px-3"
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
                    <span className="block text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-2xl">
                        {product.price}{" "}
                        <span className="font-extralight italic text-xl">
                          EGP
                        </span>
                      </span>
                      <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2 py-0.5 rounded-md">
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
            ))}
          </div>
        </div>
      ) : (
        <Spiner />
      )}
    </>
  );
}

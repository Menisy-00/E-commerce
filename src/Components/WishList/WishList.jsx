import React, { useContext, useEffect, useState } from "react";
import shopping from "../../assets/quick-atc-add-to-cart-grey.svg";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";
import useGetWishList from "../../Hooks/useGetWishList";
import Spiner from "../Spiner/Spiner";

export default function WishList() {
  const { data, isLoading, isError } = useGetWishList();
  const [wishlist, setWishlist] = useState([]);
  const [CartData, setCartData] = useState([]);
  const { addToCart, getCart, removeCartItems } = useContext(CartContext);
  const { removeWish} = useContext(WishListContext);

  useEffect(() => {
    if (data) {
      setWishlist(data);
    }
  }, [data]);

  async function removeWishList(id) {
    let response = await removeWish(id);
    console.log(response);
    
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { background: "#333", color: "#fff" },
        icon: "💔",
      });
      setWishlist(wishlist.filter((wish) => wish.id !== id));
    } else {
      toast.error(response.data.message);
    }
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
  if (isLoading) return <Spiner />;
  if (isError) return <p>Error loading wishlist.</p>;

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg flex gap-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th scope="col" className="px-16 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Remove
            </th>
            <th scope="col" className="px-6 py-3">
              Add to Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {wishlist?.map((list) => (
            <tr
              key={list.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-4">
                <img
                  src={list.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={list.title}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {list.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {list.price} EGP
              </td>
              <td className="px-6 py-4">
                <span
                  onClick={() => removeWishList(list.id)}
                  className="cursor-pointer font-semibold text-red-600 hover:text-red-800 transition duration-300"
                >
                  <i className="fa-solid fa-trash-can fa-2x"></i>
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  id={list.id}
                  onClick={() =>
                    isInCart(list.id)
                      ? removeFromCart(list.id)
                      : addCarrt(list.id)
                  }
                  className={`px-3 font-semibold text-white py-2 rounded-md my-2 cursor-pointer transition duration-300 ${
                    isInCart(list.id)
                      ? "bg-sky-600 hover:bg-sky-800"
                      : "bg-gray-200 hover:bg-gray-400"
                  }`}
                >
                  <img className="w-6" src={shopping} alt="Add to Cart" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

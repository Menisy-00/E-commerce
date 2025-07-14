import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";
export default function useGetWishList() {
  const token = localStorage.getItem("userToken");
  function getWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token,
      },
    });
  }
  let query = useQuery({
    queryKey: ["WishList"],
    queryFn: getWishList,
    select :(data)=>{
      return data?.data.data
    }
  });

  return query;
}

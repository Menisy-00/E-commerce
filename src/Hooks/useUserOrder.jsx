import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export default function useUserOrder() {
  function getUserIdFromToken() {
  const token = localStorage.getItem("userToken"); 

  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1]; 
    const payloadDecoded = atob(payloadBase64); 
    const payload = JSON.parse(payloadDecoded); 

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn("Token expired");
      return null;
    }

    return payload.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
      function getUserOrders()
      {
        const userId = getUserIdFromToken();
          if (!userId) {
            return;
          }
     return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      }
       let Query =useQuery({
    queryKey: ['userOrders'],
    queryFn: getUserOrders,
  })
  return Query
}

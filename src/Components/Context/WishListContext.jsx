import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext= createContext()

export default function WishListContextProvider(props){
      let headers={
    token:localStorage.getItem('userToken')
  }
     function removeWish(id)
            {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                    {
                        headers
                    })
                    .then((response)=>response)
                    .catch((error)=>error)
            }
     function addToWish(productId)
            {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId:productId
            },
                    {
                        headers
                    })
                    .then((response)=>response)
                    .catch((error)=>error)
            }
return <WishListContext.Provider value={{removeWish ,addToWish}}>
        {props.children}
    </WishListContext.Provider>
}


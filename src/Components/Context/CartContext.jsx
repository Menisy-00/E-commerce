import axios from "axios";
import { createContext, useState } from "react";
export let CartContext=createContext();

export default function CartContextProvider(props){
    const [countCart, setCountCart] = useState(0)
    const [CartId, setCartId] = useState(null)
    let headers={
        token: localStorage.getItem('userToken'),
    }
    function getCart()
    {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers:headers,
            }
        )
        .then((response)=>{
            setCountCart(response.data.numOfCartItems)
            setCartId(response?.data?.cartId)
            return response
        })
        .catch((error)=>error)
    }
    function addToCart(productId)
    {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId:productId
            },
            {
                headers:headers
            })
            .then((response)=>response)
            .catch((error)=>error)
    }
    function UpdateCartCount(productId ,conut)
    {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count:conut
            },
            {
                headers:headers
            })
            .then((response)=>response)
            .catch((error)=>error)
    }
    function removeCartItems(productId)
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:headers
            })
            .then((response)=>{
            setCountCart(response.data.numOfCartItems)
            return response
        })
            .catch((error)=>error)
    }
    function removeCarts()
    {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers:headers
            })
            .then((response)=>{
            setCountCart(0)
            return response
        })
            .catch((error)=>error)
    }
    return <CartContext.Provider value={{addToCart ,getCart,removeCartItems,removeCarts,UpdateCartCount ,CartId ,headers,countCart}}>
        {props.children}
    </CartContext.Provider>
}
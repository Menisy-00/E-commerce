import "./App.css";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/categories/categories";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Components/Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./Components/GuestRoute/GuestRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from "./Components/Context/CartContext";
import { Toaster } from 'react-hot-toast'
import CheckOut from "./Components/CheckOut/CheckOut";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import SpecificOrder from "./Components/specificOrder/SpecificOrder";
import WishListContextProvider from "./Components/Context/WishListContext";
import ForgetPassword from "./Components/ForgetPassword/EnterEmail";
import VerificationCode from "./Components/ForgetPassword/VerificationCode";
import ResetPassword from "./Components/ForgetPassword/ResetPassword";

function App() {
  let queryClient= new QueryClient()
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element:<ProtectedRoute><Cart /></ProtectedRoute>},
        { path: "checkout", element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
        { path: "allorders", element:<ProtectedRoute><Allorders/></ProtectedRoute>},
        { path: "specific_order/:id", element:<ProtectedRoute><SpecificOrder/></ProtectedRoute>},
        { path: "wishlist", element:<ProtectedRoute><WishList/></ProtectedRoute>},
        { path: "ProductDetails/:id/:category", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        { path: "categories", element:  <ProtectedRoute><Categories /></ProtectedRoute>},
        { path: "brands", element:<ProtectedRoute><Brands /></ProtectedRoute>},
        { path: "forget-passowrd", element:  <GuestRoute><ForgetPassword/></GuestRoute>},
        { path: "v-code", element:  <GuestRoute><VerificationCode/></GuestRoute>},
        { path: "reset-passwored", element:  <GuestRoute><ResetPassword/></GuestRoute>},
        { path: "login", element:  <GuestRoute><Login /></GuestRoute>},
        { path: "register", element:  <GuestRoute><Register /></GuestRoute>},
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <WishListContextProvider>
    <CartContextProvider>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
        <Toaster/>
        <RouterProvider router={router} />
        <ReactQueryDevtools/>
    </UserContextProvider>
    </QueryClientProvider>
    </CartContextProvider>
    </WishListContextProvider>
  );
}

export default App;

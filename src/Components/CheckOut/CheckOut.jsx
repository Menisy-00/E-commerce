import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import * as Yup from "yup";
export default function CheckOut() {
  let { CartId, headers } = useContext(CartContext);
  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  });
  function payOnline(val) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5173`,
        {
          shippingAddress: val,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status == "success") {
          window.location.href = response.data.session.url;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: payOnline,
  });
  return (
    <>
      <div className="max-w-sm md:max-w-4xl mx-auto py-6 bg-slate-100 p-10 rounded-2xl shadow mt-15">
        <h2 className="text-3xl text-green-500 font-bold mb-8">
          Checkout Now{" "}
        </h2>
        <form
          className="border-green-600 border-l-2 p-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.details}
              onChange={formik.handleChange}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name :{" "}
            </label>
          </div>
          {formik.errors.details && formik.touched.details && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.details}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Phone :{" "}
            </label>
          </div>
          {formik.errors.details && formik.touched.details && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.details}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.city}
              onChange={formik.handleChange}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your City :{" "}
            </label>
          </div>
          {formik.errors.details && formik.touched.details && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.details}
            </div>
          )}
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="cursor-pointer text-white bg-green-700 hover:bg-green-800 disabled:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Pay Online
          </button>
        </form>
      </div>
    </>
  );
}

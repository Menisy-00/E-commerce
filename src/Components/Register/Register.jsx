import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  let {UserLogin,setUserLogin}=useContext(UserContext)
  let navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [apiSuccess, setapiSuccess] = useState("");
  const [isLonding, setIsLonding] = useState(false);
    // Auto-hide error message after 2 seconds
    useEffect(() => {
      if (apiError) {
        const timer = setTimeout(() => setapiError(''), 2000)
        return () => clearTimeout(timer)
      }
    }, [apiError])
    // Auto-hide success message after 2 seconds
    useEffect(() => {
      if (apiSuccess) {
        const timer = setTimeout(() => setapiSuccess(''), 2000)
        return () => clearTimeout(timer)
      }
    }, [apiSuccess])
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(10, "Name must not exceed 10 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Email format is invalid")
      .required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{4,10}$/,
        "Password must match pattern: one uppercase letter followed by 5-10 lowercase letters or digits"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
      .required("Phone number is required"),
  });

  function handleRegister(formValues) {
    setIsLonding(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        localStorage.setItem('userToken',apiResponse?.data?.token)
        setUserLogin(apiResponse?.data?.token)
        setIsLonding(false);
        setapiSuccess(apiResponse?.data?.message);
        navigate("/login");
      })
      .catch((apiResponse) => {
        setIsLonding(false);
        setapiError(apiResponse?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="max-w-sm md:max-w-4xl mx-auto py-6 bg-slate-100 p-10 rounded-2xl shadow mt-10">
        <h2 className="text-3xl text-green-500 font-bold mb-8">
          Register Now :{" "}
        </h2>
        <form
          className="border-green-600 border-l-2 p-5"
          onSubmit={formik.handleSubmit}
        >
          {/* Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name :{" "}
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          ) : null}
          {/* email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email Address :{" "}
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
          {/* password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password :{" "}
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
          {/* rePassword */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Repassword :{" "}
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}
          {/* Phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onBlur={formik.handleBlur}
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
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
          {/* ------------------------------------------ */}
          {apiError ? (
            <div
              className="text-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{apiError}</span>
            </div>
          ) : null}

          {apiSuccess ? (
            <div
              className="text-center font-bold p-3 mb-4 text-sm text-green-500 rounded-lg bg-red-50 dark:bg-gray-800 "
              role="alert"
            >
              <span className="font-medium">{apiSuccess}</span>
            </div>
          ) : null}
          <div className="flex items-center gap-7">
            <button
              type="submit"
              className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLonding ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
            <p className="text-md text-gray-800  ">
              Already have an account? ?{" "}
              <span className="italic font-semibold text-sky-500 border-b-1">
                <Link to={"/login"}>Longin Now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

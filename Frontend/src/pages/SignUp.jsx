import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeRole, login } from "../store/auth";

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password =
            "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          newErrors.password =
            "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "Password must contain at least one number";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
          newErrors.password =
            "Password must contain at least one special character";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          newErrors.confirmPassword = "Confirm password is required";
        } else if (value !== Values.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } 
        else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };
  const change = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setValues({ ...Values, [name]: value });
  };
  const submit = async (e) => {
    try {
      if(Object.keys(errors).length > 0) {
        return
      }
     
      const response = await api.post(`api/v1/sign-up`, Values)
      console.log(response)
      toast.success("Sign up successfull !", {
        theme: "dark",
      });
      dispatch(login({email: response.data.email}))
      dispatch(changeRole(response.data.role))
      response.data.role === 'admin' ? navigate('/profile/add-book') : navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        theme: "dark",
      });
    }
  };
  return (
    <div className="h-screen bg-orange-200 px-12 py-8 flex items-center justify-center">
      <div className="bg-black rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-white text-xl">Sign Up</p>
        <div className="mt-4">
          <div className="mt-4">
            <label htmlFor="" className="text-white">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-white text-black p-2 outline-none"
              placeholder="email"
              name="email"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          {errors.email && <div className="text-red-500">{errors.email}</div>}
          <div className="mt-4">
            <label htmlFor="" className="text-white">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-white text-black p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          {errors.password && <div className="text-red-500">{errors.password}</div>}
          <div className="mt-4">
            <label htmlFor="" className="text-white">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-white text-black p-2 outline-none"
              placeholder="confirm password"
              name="confirmPassword"
              required
              value={Values.confirmPassword}
              onChange={change}
            />
          </div>
          {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded
                 hover:bg-blue-400 transition-all duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <p className="text-zinc-400">
              Already have an account?
              <Link to={"/login"} className="text-blue-500">
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

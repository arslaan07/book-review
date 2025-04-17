import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { changeRole, logout } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email, role} = useSelector((state) => state.auth);

  return (
    <div className="bg-orange-100 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[80vh]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" alt="" />
        <p className="mt-1 text-normal text-black font-semibold"> {email} </p>
      </div>
      <div className="w-full mt-4 h-[1px] bg-orange-200 hidden lg:block"></div>
      {
        role === 'user' && (
            <div className="w-full items-center justify-center hidden flex-col lg:flex">
        
        <Link
          to="/profile/settings"
          className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 hover:text-white
         rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
        )
      }
      {
        role === 'admin' && (
            <div className="w-full items-center justify-center hidden flex-col lg:flex">
        <Link
          to="/profile/add-book"
          className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 hover:text-white
         rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div>
        )
      }
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex 
      items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
      onClick={() => {
        dispatch(logout())
        dispatch(changeRole('user'))
        navigate('/')
        toast.success("Logout Success !", {
          theme: "dark"
        })
      }}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;

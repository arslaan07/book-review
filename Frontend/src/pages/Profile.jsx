import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Home/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import api from '../api';

const Profile = () => {
  //   const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(
        `api/v1/user`
      );
      console.log(response.data.data)
      setProfile(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-orange-200 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-screen flex items-center justify-center">
          {" "}
          <Loader />{" "}
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={Profile}/>
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6 ">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

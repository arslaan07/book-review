import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import api from "../../../api";
import { toast } from "react-toastify";
import ReviewModal from "../../ReviewModal/ReviewModal";
import ReviewCard from "../../ReviewCard/ReviewCard";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const {isAuthenticated, role} = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();


  const openModal = () => {
    setIsModalOpen(true)
   }
   const closeModal = () => {
    setIsModalOpen(false)
   }
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get(`api/v1/book/${id}`);
      console.log(response)
      setData(response.data.data);
    };
    fetch();
  }, [id, closeModal]);

 
  return (
    <>
    <div className="px-6 md:px-12 min-h-[100vh] py-8 bg-orange-200 flex flex-col md:flex-row gap-8">
      {!Data && (
        <div className=" w-full flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      {Data && (
        <>
          {/* Image Section */}
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col md:flex-row items-center justify-center">
            <img
              src={Data.url}
              alt="Book Cover"
              className="h-[50vh] lg:h-[70vh] w-auto object-contain"
            />
            
           
          </div>

          {/* Details Section */}
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-3xl lg:text-4xl text-black font-semibold">
              {Data.title}
            </h1>
            <p className="mt-1 text-black font-semibold text-lg">
              by {Data.author}
            </p>
            <p className="mt-4 text-black text-sm lg:text-lg">{Data.desc}</p>
            <p className="mt-4 flex items-center text-black">
              <GrLanguage className="mr-2" /> {Data.language}
            </p>
            
            
            <div>
            
              <p ><span className="text-yellow-400 text-xl">&#9733;</span> <span className="text-black">Average Rating: {Data.rating.toFixed(1)}</span></p>
             
            <p className="flex items-center text-black font-semibold">{Data.reviews.length} reviews</p>
            </div>
            <p className="mt-4 text-black font-normal text-2xl lg:text-3xl">
              Price: Rs. {Data.price}
            </p>
            {isAuthenticated && (
              <div className="flex md:flex-col  md:gap-8 gap-4 mt-4 ">
                <button onClick={openModal}
                 className="bg-zinc-100 text-2xl w-[200px] px-4 py-2 rounded-md hover:bg-zinc-300 font-semibold">Add Review</button>
              </div>
            )}
          </div>
          
        </>
      )}
      
    </div>
    <div className="px-6 md:px-12 py-8 bg-orange-200 text-black flex flex-col md:flex-row gap-8 ">
    <h1 className="text-3xl font-semibold mb-4">Reviews</h1>
    <div className="flex mt-20 gap-4 flex-wrap">
      {
        Data && Data.reviews.length === 0 && <div className="text-zinc-200 text-4xl font-bold">No reviews yet</div>
      }
      {
        Data && [...Data.reviews].reverse().map((item, i) => (
          <div className="" key={i}><ReviewCard rating={item.rating} review={item.review}/> </div>
        ))
      }
    </div>
  </div>
  <ReviewModal isOpen={isModalOpen} closeModal={closeModal} bookId = {id} />
 </>
  );
};

export default ViewBookDetails;

import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[70.5vh] flex flex-col md:flex-row  ">
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-6xl lg:text-6xl font-semibold text-black text-center lg:text-left pt-[3.5rem] md:text-3xl">
          Books That Ignite Your Mind
        </h1>
        <p className="mt-4 text-xl text-black text-center lg:text-left">
          No fluff. No filler. Just powerful stories, game-changing ideas, and reads that 
          stick with you long after the last page.
        </p>
        <div className="mt-8">
            <Link to='/all-books' className="text-black text-normal lg:text-2xl font-semibold border-8 border-black px-10 py-3 hover:bg-orange-400 rounded-full">
              Show Me the Goods →
            </Link>
        </div>
      </div>
      <div className=" w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img
          className="object-cover w-[120px] sm:w-[180px] md:w-[300px] lg:w-[500px] h-auto"
          src="./hero1.png"
          alt="Hero Image"
        />
      </div>
    </div>
  );
};

export default Hero;

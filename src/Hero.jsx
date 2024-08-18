import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6 lg:px-20">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
            StreamLine Your Video Management
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            Manage, upload, and collaborate on your video content with ease. 
            StreamLine offers a seamless platform to handle large files, making 
            your creative process smoother and more efficient, even in remote locations.
          </p>
          <div className="flex flex-col md:flex-row">
            <Link to="/signup">
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4 hover:bg-gray-100 transition-all duration-300">
              Get Started
            </button>
            </Link>
            <Link to="/about">
            <button className="bg-transparent border border-white text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
            </Link>
          </div>
        </div>


        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0">
          <img 
            src="" 
            alt="Hero Illustration" 
            className="w-3/4 lg:w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

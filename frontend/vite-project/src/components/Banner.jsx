import React from 'react';

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Earth from space"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/70"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore Our World
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Discover fascinating facts about countries, their cultures, and the diverse landscapes that make our planet unique.
          </p>
          <div className="mt-10">
            <a
              href="#explore"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Banner; 
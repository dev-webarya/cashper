import React from "react";

const HeroSection = () => {
  const handleApplyNow = () => {
    const element = document.getElementById('popular-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <section
      className="relative w-full min-h-[500px] xs:min-h-[550px] sm:min-h-[600px] md:min-h-[700px] lg:h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/50"></div>
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-end sm:items-center justify-start pt-0 sm:pt-20 pb-16 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-left pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:pl-16">
          <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            Loans, Insurance & Investments — all in one place{" "}
          </h1>
          <div className="flex flex-col xs:flex-col sm:flex-row gap-3 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start items-stretch sm:items-start">
            <button
              onClick={handleApplyNow}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 xs:px-6 sm:px-7 md:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-sm xs:text-base sm:text-lg md:text-xl text-center transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Apply Now
            </button>
           
            <button 
              onClick={handleExploreServices}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 text-white font-semibold px-5 xs:px-6 sm:px-7 md:px-8 lg:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 lg:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-sm xs:text-base sm:text-lg md:text-xl text-center transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

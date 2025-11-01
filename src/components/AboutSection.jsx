import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              About <span className="text-green-700">Cashper</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
              At Cashper, we believe that everyone deserves access to transparent, reliable, and 
              personalized financial solutions. With years of expertise in the financial services 
              industry, we've helped thousands of individuals and businesses achieve their financial 
              goals through our innovative products and customer-first approach.
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              Our commitment to trust, transparency, and innovation sets us apart. Whether you're 
              looking for a loan, insurance, investment advice, or tax planning services, our team 
              of experienced professionals is dedicated to guiding you every step of the way. 
              Your financial success is our success.
            </p>
            <Link
              to="/about"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-300 inline-block text-sm sm:text-base"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/image copy 2.png"
                alt="Professional business meeting"
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>
            {/* Decorative Elements - Hidden on mobile */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-green-700 rounded-2xl opacity-20 -z-10"></div>
            <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-green-700 rounded-2xl opacity-20 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


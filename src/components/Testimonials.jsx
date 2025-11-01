import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const testimonials = [
    {
      id: 1,
      name: "Ruhi yadav",
      role: "Business Owner",
      image: "/testimonial/image copy 8.png",
      rating: 5,
      text: "Cashper made my loan approval process so simple and stress-free. Their team was professional, responsive, and helped me secure the funding I needed for my business expansion. Highly recommended!",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "priyanshu goyal",
      role: "Software Engineer",
      image: "/testimonial/image copy 2.png",
      rating: 5,
      text: "Their investment advice helped me start my first SIP and now I'm on track to achieve my financial goals. The experts at Cashper took time to understand my needs and created a perfect plan for me.",
      location: "Bangalore"
    },
    {
      id: 3,
      name: "Ajay singh",
      role: "Teacher",
      image: "/testimonial/image copy 3.png",
      rating: 5,
      text: "Easy process, no spam calls—just good service and peace of mind for my family. The health and term insurance policies they recommended were exactly what I was looking for. Excellent service!",
      location: "Delhi"
    },
    {
      id: 4,
      name: "Ankit Tiwari",
      role: "Entrepreneur",
      image: "/testimonial/image copy 9.png",
      rating: 5,
      text: "Transparent, reliable, and customer-focused — that's what defines Cashper. They've been instrumental in helping me manage both my personal finances and business investments with their expert guidance.",
      location: "Pune"
    },
    {
      id: 5,
      name: "Nehal Kapoor",
      role: "Marketing Manager",
      image: "/testimonial/image copy 4.png",
      rating: 5,
      text: "The tax planning services provided by Cashper saved me a significant amount. Their team is knowledgeable and always available to answer my questions.",
      location: "Hyderabad"
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Freelancer",
      image: "/testimonial/image copy 10.png",
      rating: 5,
      text: "As a freelancer, getting a personal loan was challenging until I found Ashper. They made the entire process seamless and quick!",
      location: "Jaipur"
    }
  ];
  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide one card at a time
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= testimonials.length - itemsPerPage ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? testimonials.length - itemsPerPage : prev - 1));
  };

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentSlide, currentSlide + itemsPerPage);
  };

  const maxSlide = testimonials.length - itemsPerPage;

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-14 md:py-16 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our <span className="text-green-700">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Don't just take our word for it. Here's what real customers have to say about their experience with Cashper.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Left Arrow - Hidden on mobile, shown on md and above */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white hover:bg-green-700 text-gray-700 hover:text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonials"
          >
            <FaChevronLeft className="text-lg sm:text-xl" />
          </button>

          {/* Testimonials Grid - Horizontal scroll on mobile, grid on md+ */}
          <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 flex-shrink-0 w-[85vw] snap-center"
              >
                {/* Customer Image */}
                <div className="mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-green-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 text-center italic line-clamp-4">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="text-center border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500 mt-1">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid - Hidden on mobile, shown on md+ */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 transition-all duration-300"
              >
                {/* Customer Image */}
                <div className="mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-green-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 text-center italic line-clamp-4">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="text-center border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500 mt-1">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile, shown on md and above */}
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-green-700 text-gray-700 hover:text-white w-12 h-12 rounded-full shadow-lg items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next testimonials"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Dots Indicator - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => {
            if (index > maxSlide) return null;
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-green-700 w-6 sm:w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaEye, FaUserTie, FaUsers, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'Fast Approvals',
      description: 'Get your loans and policies approved within 24 hours. Our streamlined process ensures quick turnaround times.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaEye className="text-4xl" />,
      title: 'Transparent Process',
      description: 'No hidden charges or surprises. We believe in complete transparency with clear terms and conditions.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaUserTie className="text-4xl" />,
      title: 'Personalized Guidance',
      description: 'Expert advisors provide tailored solutions based on your unique financial needs and goals.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Experienced Team',
      description: 'Our team of financial experts brings decades of combined experience in the industry.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help or have questions.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="px-6 py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-700">Cashper?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with personalized service to deliver exceptional financial solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

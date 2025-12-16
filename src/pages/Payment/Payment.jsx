import React from 'react';
import { FaCrown, FaCheck, FaTimes, FaBook, FaAd, FaRocket, FaLock, FaUsers, FaChartLine, FaInfinity } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Features comparison table
  const features = [
    {
      feature: 'Create Lessons',
      free: 'Up to 10 lessons',
      premium: 'Unlimited lessons',
      freeIcon: <FaBook className="text-green-500" />,
      premiumIcon: <FaInfinity className="text-primary" />
    },
    {
      feature: 'Premium Lesson Creation',
      free: <FaTimes className="text-red-500" />,
      premium: <FaCheck className="text-green-500" />,
      freeIcon: <FaLock className="text-red-500" />,
      premiumIcon: <FaCrown className="text-primary" />
    },
    {
      feature: 'Access Premium Content',
      free: <FaTimes className="text-red-500" />,
      premium: <FaCheck className="text-green-500" />,
      freeIcon: <FaLock className="text-red-500" />,
      premiumIcon: <FaCrown className="text-primary" />
    },
    {
      feature: 'Ad-Free Experience',
      free: <FaTimes className="text-red-500" />,
      premium: <FaCheck className="text-green-500" />,
      freeIcon: <FaAd className="text-red-500" />,
      premiumIcon: <FaCheck className="text-green-500" />
    },
    {
      feature: 'Priority Listing',
      free: <FaTimes className="text-red-500" />,
      premium: <FaCheck className="text-green-500" />,
      freeIcon: <FaChartLine className="text-gray-400" />,
      premiumIcon: <FaRocket className="text-primary" />
    },
    {
      feature: 'Advanced Analytics',
      free: 'Basic stats',
      premium: 'Detailed insights',
      freeIcon: <FaChartLine className="text-gray-400" />,
      premiumIcon: <FaChartLine className="text-green-500" />
    },
    {
      feature: 'Community Access',
      free: 'Read-only',
      premium: 'Full participation',
      freeIcon: <FaUsers className="text-gray-400" />,
      premiumIcon: <FaUsers className="text-blue-500" />
    },
    {
      feature: 'Support',
      free: 'Community help',
      premium: 'Priority 24/7 support',
      freeIcon: <FaUsers className="text-gray-400" />,
      premiumIcon: <FaCheck className="text-green-500" />
    }
  ];

  const handleUpgrade = async () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to upgrade to premium',
      });
      navigate('/login');
      return;
    }

    try {
        // payment info:
        const paymentInfo={
            price: 12.30,
            userName:user?.displayName,
            userEmail:user?.email,
            userImage:user?.photoURL
        }
      //  checkout session
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

      // Redirect to Stripe Checkout
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upgrade Failed',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upgrade to <span className="text-primary">Premium</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive features and take your wisdom journey to the next level
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">৳0</div>
              <p className="text-gray-500">Forever free</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.freeIcon}
                  <span className="flex-1 text-gray-700">{item.feature}</span>
                  <span className="text-gray-600 font-medium">{item.free}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl p-8 border-2 border-[#F69074] relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-semibold">
              Most Popular
            </div>
            
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaCrown className="text-primary text-2xl" />
                <h3 className="text-2xl font-bold text-gray-900">Premium Plan</h3>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">৳1500</div>
              <p className="text-gray-600">One-time payment • Lifetime access</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {item.premiumIcon}
                  <span className="flex-1 text-gray-800 font-medium">{item.feature}</span>
                  <span className="text-gray-700">{item.premium}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={handleUpgrade}
              className="btn bg-linear-to-r from-primary to-amber-500 hover:from-primary hover:to-amber-600 text-white border-0 w-full text-lg font-semibold py-4"
            >
              <FaCrown className="mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* banner */}
        <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-teal-500 to-teal-700 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to unlock premium wisdom?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of members who have transformed their learning experience with premium access.
          </p>
          <button
            onClick={handleUpgrade}
            className="btn bg-white text-teal-600 hover:bg-gray-100 border-0 text-lg font-semibold px-8"
          >
            <FaCrown className="mr-2" />
            Upgrade Now - ৳1500
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
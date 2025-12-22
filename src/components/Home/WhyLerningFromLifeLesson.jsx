import React from 'react';
import { FaBrain, FaHeart, FaUsers, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router';
const WhyLerningFromLifeLesson = () => {
    const benefits = [
    {
      id: 1,
      icon: <FaBrain />,
      title: "Builds Emotional Intelligence",
      description: "Reflecting on experiences increases self-awareness and empathy.",
      color: "text-primary",
      border: "border-l-4 border-primary"
    },
    {
      id: 2,
      icon: <FaHeart />,
      title: "Accelerates Personal Growth",
      description: "Document insights to avoid repeating mistakes.",
      color: "text-secondary",
      border: "border-l-4 border-secondary"
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "Creates Meaningful Connections",
      description: "Share lessons to build authentic communities.",
      color: "text-secondary",
      border: "border-l-4 border-secondary"
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: "Enhances Decision Making",
      description: "Use documented wisdom for better future choices.",
      color: "text-primary",
      border: "border-l-4 border-primary"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform experiences into wisdom that shapes your future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${benefit.border}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${benefit.color} text-2xl shrink-0 mt-1`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={'/add-lesson'} className="btn bg-secondary hover:bg-teal-600 text-white border-0 px-8">
            Start Documenting Your Wisdom
          </Link>
        </div>
      </div>
    </section>
  );
};


export default WhyLerningFromLifeLesson;
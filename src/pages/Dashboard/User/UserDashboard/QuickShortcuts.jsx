import { Link } from 'react-router';
import { FaPlus,  FaBookOpen,  FaGlobe,  FaHeart,  FaCrown, FaArrowRight} from 'react-icons/fa';

const QuickShortcuts = () => {
  const shortcuts = [
    {
      to: "/dashboard/add-lesson",
      label: "Add New Lesson",
      icon: <FaPlus className="text-blue-500" />,
      color: "blue"
    },
    {
      to: "/dashboard/my-lessons",
      label: "My Lessons",
      icon: <FaBookOpen className="text-purple-500" />,
      color: "purple"
    },
    {
      to: "/public-lessons",
      label: "Public Lessons",
      icon: <FaGlobe className="text-green-500" />,
      color: "green"
    },
    {
      to: "/dashboard/my-favorites",
      label: "My Favorites",
      icon: <FaHeart className="text-red-500" />,
      color: "red"
    },
    {
      to: "/payment",
      label: "Upgrade to Premium",
      icon: <FaCrown className="text-yellow-500" />,
      color: "yellow"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-1 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Actions</h3>
        <p className="text-gray-500 text-sm">Navigate quickly to different sections</p>
      </div>

      <div className="space-y-4">
        {shortcuts.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-linear-to-r from-white to-gray-50 hover:from-amber-50 hover:to-white"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${link.color}-50 group-hover:bg-${link.color}-100 transition-colors`}>
                <div className="text-2xl">
                  {link.icon}
                </div>
              </div>
              
              <div>
                <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Click to navigate
                </p>
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <FaArrowRight className="text-primary text-sm" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Optional: Add a helpful tip */}
      <div className="mt-8 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          <span className="font-medium">💡 Quick Tip:</span>
          Use these shortcuts for faster navigation to frequently used pages
        </p>
      </div>
    </div>
  );
};

export default QuickShortcuts;
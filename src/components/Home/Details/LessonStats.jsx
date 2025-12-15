import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";
// static view
const viewsCount = Math.floor(Math.random() * 10000);

const LessonStats = ({lesson}) => {

  return (
    <div className="flex items-center gap-6 text-gray-700 mt-6">
      {/* Likes */}
      <div className="flex items-center gap-2">
        <FaHeart className="text-red-500" />
        <span className="font-medium">{lesson?.likesCount} Likes</span>
      </div>

      {/* Favorites */}
      <div className="flex items-center gap-2">
        <FaBookmark className="text-blue-500" />
        <span className="font-medium">
          {lesson?.favoritesCount} Favorites
        </span>
      </div>

      {/* Views */}
      <div className="flex items-center gap-2">
        <FaEye className="text-green-600" />
        <span className="font-medium">{viewsCount} Views</span>
      </div>
    </div>
  );
};

export default LessonStats;

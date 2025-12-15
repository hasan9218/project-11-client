import { Link } from "react-router";

const LessonAuthorCard = ({ lesson }) => {
  return (
    <div className="p-5 bg-base-100 border rounded-lg flex items-center gap-4 shadow">
      <img
        src={lesson?.authorPhoto}
        className="w-16 h-16 rounded-full object-cover shadow"
      />

      <div>
        <h4 className="font-bold">{lesson?.authorName}</h4>
        <p className="text-xs text-gray-500">
          {lesson.authorLessonCount} lessons shared
        </p>
        <Link to={`/author-profile/${lesson?.authorEmail}`} className="btn btn-sm btn-info mt-2">
          View Author Profile
        </Link>
      </div>
    </div>
  );
};

export default LessonAuthorCard;

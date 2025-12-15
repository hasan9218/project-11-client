import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaHeart, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Favorites from "./lessonInteraction/Favorites";
import Report from "./lessonInteraction/Report";
import Share from "./lessonInteraction/Share";

const LessonInteractions = ({ lesson, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [liked, setLiked] = useState(lesson.likes?.includes(user?.email) || false);

  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
  // Like
  const handleLike = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        text: "Please log in to like lessons!",
      });
      return navigate('/login');
    }

    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      await axiosSecure.post(`/lesson/${lesson._id}/like`, {
        userEmail: user.email
      });
      refetch();
    } catch (error) {
      console.log(error)
      setLiked(liked);
      setLikesCount(likesCount);
    }
  };

 

  return (
    <div className="mt-6 p-4 rounded-xl bg-base-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">

      {/* Likes */}
      <button
        onClick={handleLike}
        className={`btn btn-sm ${liked ? "btn-error" : "btn-outline"}`}
      >
        <FaHeart size={18} className={liked ? "fill-white" : ""} />
        {lesson.likesCount}
      </button>

      {/* Favorites */}
      <Favorites lesson={lesson} refetch={refetch}></Favorites>

      {/* Report */}
      <Report lesson={lesson} refetch={refetch}></Report>

      {/* Share */}
      <Share lesson={lesson}></Share>

    </div>
  );
};

export default LessonInteractions;

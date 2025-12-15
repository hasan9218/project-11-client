import LessonContent from "../../components/Home/Details/LessonContent";
import LessonMetadata from "../../components/Home/Details/LessonMetadata";
import LessonAuthorCard from "../../components/Home/Details/LessonAuthorCard";
import LessonInteractions from "../../components/Home/Details/LessonInteractions";
import CommentsSection from "../../components/Home/Details/CommentsSection";
import SimilarLessonsSection from "../../components/Home/Details/SimilarLessonsSection";
import useRole from "../../hooks/useRole";
import { useNavigate, useParams } from "react-router";
import LessonStats from "../../components/Home/Details/LessonStats";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const LessonDetails = () => {
  const { userData } = useRole();
  const navigate = useNavigate();

  // id
  const {id}=useParams();
  console.log(id)

  // get lesson data
  const {data: lesson={}, isLoading, refetch}=useQuery({
    queryKey: ['lesson',id],
    queryFn:async()=>{
      const result=await axios.get(`${import.meta.env.VITE_API_URL}/lesson-details/${id}`)
      return result.data;
    }
  })
  
  // loading
  if(isLoading) return <LoadingSpinner/>

  const isLocked =
    lesson.accessLevel === "premium" && !userData?.isPremium;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">

      {/* Premium Restriction Check */}
      {isLocked && (
        <div className="bg-warning text-center text-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">🔒 Premium Lesson</p>
          <p className="mb-2">Upgrade to unlock full lesson details.</p>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate("/pricing")}
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* Main Lesson Content */}
      <LessonContent lesson={lesson} isLocked={isLocked} />

      {/* Metadata Section */}
      {!isLocked && <LessonMetadata lesson={lesson} />}

      {/* Author Information */}
      {!isLocked && <LessonAuthorCard lesson={lesson} />}
      
      {/* State Information */}
      {!isLocked && <LessonStats lesson={lesson}/>}

      {/* Like / Save / Share / Report */}
      {!isLocked && <LessonInteractions lesson={lesson} refetch={refetch} />}

      {/* Comment section */}
      {!isLocked && <CommentsSection lessonId={lesson._id} />}

      {/* Similar Recommended Lessons */}
      <SimilarLessonsSection lesson={lesson} />
    </div>
  );
};

export default LessonDetails;

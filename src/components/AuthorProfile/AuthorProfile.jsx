import { useParams,useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaCrown, FaArrowLeft } from 'react-icons/fa';
import coverImg from '../../assets/coverImage.jpg';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LessonCard from '../Home/Lessons/LessonCard';
import LoadingSpinner from '../Shared/LoadingSpinner';

const AuthorProfile = () => {
  const { authorEmail } = useParams(); 
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: authorResponse = {}, isLoading } = useQuery({
  queryKey: ['author', authorEmail],
  queryFn: async () => {
    const res = await axiosSecure.get(`/author/${authorEmail}`);
    return res.data;
  }
});

// Then use authorResponse directly (not authorResponse.data)
const author = authorResponse;

  //  author's public lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ['authorLessons', authorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/author/${authorEmail}`);
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Author Profile */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <img 
          src={coverImg} 
          alt="Cover" 
          className="w-full h-48 object-cover"
        />
        
        <div className="px-6 pb-6 -mt-16">
          <div className="flex flex-col items-center">
            <img 
              src={author.photoURL || 'https://ui-avatars.com/api/?name=User'} 
              alt={author.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            
            <h1 className="text-2xl font-bold mt-4">{author.name}</h1>
            <p className="text-gray-600">{author.email}</p>
            
            {/* Premium Badge*/}
            {author.isPremium && (
              <span className="badge bg-yellow-100 text-yellow-800 mt-2 gap-1">
                <FaCrown /> Premium Creator
              </span>
            )}
          </div>

          {/* lessons count */}
          <div className="flex justify-center mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{lessons.length}</p>
              <p className="text-gray-600">Public Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Public Lessons */}
      <h2 className="text-2xl font-bold mb-4">
        Lessons by {author.name}
      </h2>
      
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map(lesson => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaBook className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No public lessons yet</p>
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;
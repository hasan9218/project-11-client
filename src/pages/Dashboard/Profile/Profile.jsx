import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/coverImage.jpg'
import LessonCard from '../../../components/Home/Lessons/LessonCard';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const Profile = () => {
  const { user } = useAuth()
  const { userData } = useRole()
  const axiosSecure = useAxiosSecure();

  const isAdmin = userData?.role === 'admin';

  // User lessons
  const { data: lessons = [] } = useQuery({
    enabled: !isAdmin,
    queryKey: ['lessons', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-lessons/${user?.email}`)
      return result.data;
    }
  })

  // Favorites
  const { data: favorites = [] } = useQuery({
    enabled: !isAdmin,
    queryKey: ['favorites', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/favorites/${user?.email}`)
      return result.data;
    }
  })

  return (
    <div className="px-4 py-10">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl mx-auto">
        <img
          src={coverImg}
          alt="cover"
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />

        <div className="flex flex-col items-center -mt-16 px-6 pb-6">
          <img
            alt="profile"
            src={user?.photoURL}
            className="object-cover rounded-full h-28 w-28 border-4 border-white shadow-md"
          />

          <p className="mt-2 text-2xl font-bold text-gray-800">
            {user?.displayName}
          </p>

          {/* Role Badge */}
          {isAdmin ? (
            <p className="mt-1 px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-600">
              🛡️ Admin
            </p>
          ) : userData?.isPremium ? (
            <p className="mt-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-600">
              ⭐ Premium Member
            </p>
          ) : null}

          <p className="text-gray-600">{user?.email}</p>

          {/* Stats (User only) */}
          {!isAdmin && (
            <div className="flex gap-6 mt-4 text-center">
              <div>
                <p className="text-lg font-bold">{lessons.length}</p>
                <p className="text-xs text-gray-600">Lessons Created</p>
              </div>
              <div>
                <p className="text-lg font-bold">{favorites.length}</p>
                <p className="text-xs text-gray-600">Saved Lessons</p>
              </div>
            </div>
          )}

          <Link to={'/update-profile'} className="bg-secondary px-6 py-2 rounded-lg text-white mt-4 hover:bg-teal-700">
            Update Profile
          </Link>
        </div>
      </div>

      {/* User Lessons Section (Only for users) */}
      {!isAdmin && (
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Lessons by <span className="text-2xl text-primary">{user?.displayName}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



export default Profile

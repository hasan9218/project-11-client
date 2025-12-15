import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaBookmark } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Favorites = ({ lesson, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isSaved, setIsSaved] = useState(lesson.favorites?.includes(user?.email) || false);
    const [favoritesCount, setFavoritesCount] = useState(lesson.favoritesCount || 0);
    // favourite
    const handleFavorite = async () => {
        if (!user) {
            Swal.fire({
                icon: "info",
                text: "Please log in to save lessons!",
            });
            return;
        }

        setIsSaved(!isSaved);
        setFavoritesCount(isSaved ? favoritesCount - 1 : favoritesCount + 1);

        try {
            const favoritesData={
                lessonId: lesson._id,
                title: lesson.title,
                category: lesson.category,
                emotionalTone: lesson.emotionalTone,
                accessLevel: lesson.accessLevel,
                userEmail: user.email,
            }
            await axiosSecure.post(`/lesson/${lesson._id}/favorite`, favoritesData);
            
            refetch();
        } catch (error) {
            console.log(error)
            setIsSaved(isSaved);
            setFavoritesCount(favoritesCount);
        }
    };
    return (
        <button
            onClick={handleFavorite}
            className={`btn btn-sm ${isSaved ? "btn-warning" : "btn-outline"}`}
        >
            <FaBookmark size={18} className={isSaved ? "fill-white" : ""} />
            {lesson.favoritesCount}
        </button>
    );
};

export default Favorites;
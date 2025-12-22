import useRole from "../../../hooks/useRole";
import { FiLock } from "react-icons/fi";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router";

const LessonCard = ({ lesson }) => {
    const { userData, isRoleLoading } = useRole();

    if (isRoleLoading) return <LoadingSpinner />;

    const isLocked =lesson.accessLevel === "premium" && !userData?.isPremium;

    return (
        <div className="relative group">
            {/* Card */}
            <div className={`h-65 relative card bg-base-100 shadow-xl border border-gray-300 p-4 transition ${isLocked ? "group-hover:blur-[2px]" : ""}`} >
                {/* Hover Overlay */}
                {isLocked && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2 text-white rounded-xl opacity-0 group-hover:opacity-80 transition z-20 backdrop-blur-sm">
                        <FiLock size={28} />
                        <p className="font-semibold text-center">
                            Premium Lesson — Upgrade to view
                        </p>
                    </div>
                )}

                <div className="flex items-start gap-4">
                    {/* Author photo */}
                    <img
                        src={lesson.authorPhoto}
                        alt={lesson.authorName}
                        className="w-14 h-14 object-cover rounded-full border shadow"
                    />

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                        <h2 className="font-bold text-lg">{lesson.title}</h2>

                        <p className="text-sm text-gray-600 line-clamp-2 h-10 overflow-hidden">
                            {lesson.description}...
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs mt-2">
                            <span className="badge badge-primary">{lesson.category}</span>
                            <span className="badge badge-secondary">
                                {lesson.emotionalTone}
                            </span>
                            <span
                                className={`badge ${lesson.accessLevel === "premium"
                                        ? "badge-error"
                                        : "badge-success"
                                    }`}
                            >
                                {lesson.accessLevel}
                            </span>
                        </div>

                        <p className="text-xs text-gray-500">
                            by <span className="font-semibold">{lesson.authorName}</span> ·{" "}
                            {lesson.createdAt}
                        </p>

                        <Link
                            to={`/lesson-details/${lesson._id}`}
                            className="btn btn-sm btn-outline btn-primary mt-2"
                        >
                            See Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonCard;

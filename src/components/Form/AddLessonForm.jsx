import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { imageUpload } from "../../utils";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonUploadAnimation from "../Lottie/LessonUploadAnimation";

const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
];

const emotionalTones = [
    "Motivational",
    "Sad",
    "Realization",
    "Gratitude",
];

const AddLessonForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const { userData } = useRole();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (data) => {
        // data
        const { title, description, image, category, emotionalTone, privacy, accessLevel, } = data;

        const imageFile = image[0];
        let imageURL = ''

        try {
            setLoading(true);

            if (imageFile) {
                imageURL = await imageUpload(imageFile);
            }

            //   lesson data for backend
            const lessonData = {
                title: title,
                description: description,
                category: category,
                emotionalTone: emotionalTone,
                privacy: privacy,
                accessLevel: accessLevel,
                authorName: user?.displayName,
                authorEmail: user?.email,
                authorPhoto: user?.photoURL,
                likesCount: 0,
                favoritesCount: 0,
                createdAt: new Date(),
            };
            //   console.table(lessonData)
            if (data.image?.[0]) {
                lessonData.image = imageURL
            }
            else {
                lessonData.image = null;
            }

            const res = await axiosSecure.post(`/lessons`, lessonData);

            if (res.data.insertedId || res.data._id) {
                setShowSuccess(true);
                reset();

                setTimeout(() => {
                    setShowSuccess(false);
                }, 2500);
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Insert Failed",
                text: "Could not submit lesson.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Create New Life Lesson</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <input
                    type="text"
                    placeholder="Lesson Title"
                    {...register("title", { required: true })}
                    className="input input-bordered w-full"
                />

                {/* Description */}
                <textarea
                    placeholder="Full Description, Story or Insight"
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered w-full h-40"
                ></textarea>

                {/* Category */}
                {/* <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option disabled selected>
                        Select Category
                    </option>
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select> */}
                <select
                    {...register("category", { required: true })}
                    defaultValue=""
                    className="select select-bordered w-full"
                >
                    <option disabled value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Emotional Tone */}
                {/* <select
                    {...register("emotionalTone", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option disabled selected>
                        Select Emotional Tone
                    </option>
                    {emotionalTones.map((tone) => (
                        <option key={tone}>{tone}</option>
                    ))}
                </select> */}
                <select
                    {...register("emotionalTone", { required: true })}
                    defaultValue=""
                    className="select select-bordered w-full"
                >
                    <option disabled value="">Select Emotional Tone</option>
                    {emotionalTones.map((tone) => (
                        <option key={tone} value={tone}>{tone}</option>
                    ))}
                </select>

                {/* Image */}
                <input
                    type="file"
                    {...register("image")}
                    className="file-input file-input-bordered w-full"
                />

                {/* Privacy */}
                <select
                    {...register("privacy", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                {/* Access Level (Free/Premium) */}
                <div className="tooltip tooltip-right"
                    data-tip={!userData?.isPremium ? "Upgrade to Premium to create paid lessons" : ""}
                >
                    <select
                        {...register("accessLevel")}
                        disabled={!userData?.isPremium}
                        className="select select-bordered w-full"
                        defaultValue="free"
                    >
                        <option value="free">Free</option>
                        <option value="premium">Premium (Paid)</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Submit Lesson"}
                </button>
            </form>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-200 bg-opacity-50"
                        onClick={() => setShowSuccess(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <LessonUploadAnimation />
                        <div className="p-4 border-t">
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="btn btn-secondary w-full"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddLessonForm;

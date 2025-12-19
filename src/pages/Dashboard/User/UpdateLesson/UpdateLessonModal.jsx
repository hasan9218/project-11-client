import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../../utils';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


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

const UpdateLessonModal = ({ closeModal, isOpen, lesson, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure=useAxiosSecure();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        // data
        const { title, description, image, category, emotionalTone, privacy, accessLevel, } = data;

        const imageFile = image[0];
        let imageURL = ''
        console.log(imageFile)
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
                last_update_at: new Date(),
            };
            //   console.table(lessonData)
            if (data.image?.[0]) {
                lessonData.image = imageURL
            }
            else {
                lessonData.image = image;
            }

            const res = await axiosSecure.patch(`/my-lesson/${lesson._id}`, lessonData);

            if (res.data.modifiedCount) {
                refetch()
                Swal.fire({
                    icon: "success",
                    text: "Lesson updated successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                reset();
                closeModal();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Could not update lesson.",
            });
            reset(),
                closeModal()
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog
            open={isOpen}
            as='div'
            className='relative z-10 focus:outline-none '
            onClose={close}
        >
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <DialogPanel
                        transition
                        className='w-full max-w-4xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
                    >
                        <DialogTitle
                            as='h3'
                            className='text-2xl font-bold mb-4 text-center leading-6 text-gray-900'
                        >
                            Update Life Lesson
                        </DialogTitle>

                        {/* Update form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Title */}
                            <input
                                type="text"
                                placeholder="Lesson Title"
                                {...register("title", { required: true })}
                                className="input input-bordered w-full"
                                defaultValue={lesson?.title}
                            />

                            {/* Description */}
                            <textarea
                                placeholder="Full Description, Story or Insight"
                                {...register("description", { required: true })}
                                className="textarea textarea-bordered w-full h-40"
                                defaultValue={lesson?.description}
                            ></textarea>

                            {/* Category */}
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered w-full"
                                defaultValue={lesson?.category}
                            >
                                <option disabled selected>
                                    Select Category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>

                            {/* Emotional Tone */}
                            <select
                                {...register("emotionalTone", { required: true })}
                                className="select select-bordered w-full"
                                defaultValue={lesson?.emotionalTone}
                            >
                                <option disabled selected>
                                    Select Emotional Tone
                                </option>
                                {emotionalTones.map((tone) => (
                                    <option key={tone}>{tone}</option>
                                ))}
                            </select>

                            {/* Image (optional) */}
                            <input
                                type="file"
                                {...register("image")}
                                className="file-input file-input-bordered w-full"
                            />

                            {/* Privacy */}
                            <select
                                {...register("privacy", { required: true })}
                                className="select select-bordered w-full"
                                defaultValue={lesson?.privacy}
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>

                            {/* Access Level (Free/Premium) */}
                            <div className="tooltip tooltip-right"
                            //   data-tip={!userData?.isPremium ? "Upgrade to Premium to create paid lessons" : ""}
                            >
                                <select
                                    {...register("accessLevel")}
                                    // disabled={!userData?.isPremium}
                                    className="select select-bordered w-full"
                                    defaultValue={lesson.accessLevel}
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
                                {loading ? "Posting..." : "Update Lesson"}
                            </button>
                        </form>
                        <hr className='mt-8 ' />
                        <div className='flex mt-2 justify-around'>
                            <button

                                type='button'
                                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-teal-100 px-4 py-2 text-sm font-medium text-secondary hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2'
                            >
                                Continue
                            </button>
                            <button
                                type='button'
                                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
};

export default UpdateLessonModal;
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { imageUpload, saveOrUpdateUser } from '../../../utils';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useNavigate } from 'react-router';

const UpdateProfile = () => {
    // navigate
    const navigate=useNavigate();
    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // AuthContext
    const { user,updateUserProfile, loading } = useAuth();

    const onSubmit = async (data) => {
        const { name, image } = data;
        // image file
        const imageFile = image[0];
        try {
            const imageURL = await imageUpload(imageFile);

            //Save username & profile photo
            await updateUserProfile(
                name,
                imageURL
            )

            await saveOrUpdateUser({ 
                name, 
                image: imageURL,
                email:user?.email
            })

            toast.success('Profile updated successfully!!')
            
            navigate('/dashboard/profile')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center text-secondary">Update Profile</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    placeholder='Enter Your Name Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-secondary bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                    {...register('name', {
                                        maxLength: {
                                            value: 20,
                                            message: "Name must be within 20 character"
                                        }
                                    })}
                                />
                                {errors.name && <p className='text-red-600 text-sm'>{errors.name.message}</p>}
                            </div>
                            {/* Image */}
                            <div>
                                <label
                                    htmlFor='image'
                                    className='block mb-2 text-sm font-medium text-gray-700'
                                >
                                    Profile Image
                                </label>
                                <input
                                    {...register('image')}
                                    type='file'
                                    id='image'
                                    accept='image/*'
                                    className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-secondary
      hover:file:bg-teal-100
      bg-gray-100 border border-dashed border-secondary rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary
      py-2'
                                />
                                <p className='mt-1 text-xs text-gray-400'>
                                    PNG, JPG or JPEG (max 2MB)
                                </p>
                            </div>
                            <button
                                type='submit'
                                 className="bg-secondary cursor-pointer px-6 py-2 rounded-lg text-white mt-4 hover:bg-teal-700"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className='animate-spin m-auto' />
                                ) : (
                                    'Update'
                                )}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
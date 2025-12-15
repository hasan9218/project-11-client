import axios from "axios";

// upload image
export const imageUpload = async (imageData) => {
   
    const formData = new FormData();
    formData.append('image', imageData);

    // generate img url
    const data = await axios.post(`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    return data?.data?.data?.url;

}


// save or update
export const saveOrUpdateUser=async(userData)=>{
    const result=await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData)
    return result.data;
}
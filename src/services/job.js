import axios from 'axios';
import { addTokenToHeader } from '../helper/helper';

export const getAllJobs= async()=>{

      // Calling the helper function to append the token to the headers
    const headers = addTokenToHeader({headers:{}})
    const res =await axios.get(`${import.meta.env.VITE_BASE_URL}/api/job`,{
        headers
    });
    if(res.status === 401){
        localStorage.removeItem("token");
        alert("You are logged out!");
        window.location.href = "/login";
    }
    return res;
}

export const getJobById = async(id)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/job/${id}`,{
        headers
    });
    return res;
}

export const addJob = async(data)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/job`,data,{
        headers
    });
    return res;
}

export const editJob = async(data,id)=>{
    const headers = addTokenToHeader({headers:{}});
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/job/${id}`,data,{
        headers
    });
    return res;
}


export const searchJob = async(title)=>{
    const res= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/job/search/${title}`);
    return res;
}
// Normal Ways to Pass Headers in React:
// const getAllJobs = async () => {
//     const token = localStorage.getItem("token");  // Retrieve the token
//     const headers = { 
//         Authorization: `Bearer ${token}` // Attach token to headers
//     };

//     try {
//         const response = await axios.get('https://api.example.com/jobs', { headers });
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// };
import axios from 'axios';
// import { handleApiResponse } from '../helper/helper';

// Function to register a user by sending form data to the server
export const register = async (data) => {
    // Send a POST request to the server with the user registration data
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, data, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded" // Specify the format of the data being sent
      }
    });
  
    return res ; // Return the server's response for further processing
  };
  

  export const login = async(data)=>{
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`,data,{
      headers:{
        'Content-Type':"application/x-www-form-urlencoded"
      }
    })
    return res;
  }
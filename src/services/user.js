import axios from 'axios';
import { addTokenToHeader } from '../helper/helper';

export const getUserData = async (id) => {
  
    try{
        const headers = addTokenToHeader({headers:{}})
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`,{
            headers
        });
       return res;

    }catch(error){
        console.error("Error fetching user details", error);
        return null;
    }
}
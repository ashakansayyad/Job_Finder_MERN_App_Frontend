import { decodeToken } from "react-jwt";


export function addTokenToHeader({ headers }) {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");
  if (token) {
    // If token exists, add it to the Authorization field of headers
    headers.Authorization = `${token}`;
  }
  return headers; // Return the updated headers with Authorization if token exists
}

export function handleApiResponse(res) {
  // If there's no `res.response`, it means the request was successful
  if (!res.response) {
    switch (res.status) {
      case 201:
        alert("Register Successfully!");
        return res.data;

      case 200:
        return res.data;
      default:
        alert("Something went wrong");
        return null;
    }
  } 
   // Handle error cases if `res.response` exists (indicating an error was thrown)
  else {
    switch (res.response.status) {
      case 401:
        localStorage.removeItem("token");
        alert("You are logged out");
        window.location.href = "/login";
        return null;

      case 400:
        alert("Invalid email or password");
        return null;

      case 500:
        alert("something went wrong");
        return null;

      default:
        alert("Something went wrong!");
        return null;
    }
  }
}


export const isEditable=(id)=>{
  try{
      const token = localStorage.getItem("token");
      if(!token){
          return false;
      }
      const decoded = decodeToken(token);
    
      // console.log("decodedtk : ",decoded.id,"\n","creator: ",id);
      return decoded?.id == id ; 
  }
  catch(err){
      console.error(err);
  }
  
};// No dependencies, so this function won't be recalculated unless the component remounts


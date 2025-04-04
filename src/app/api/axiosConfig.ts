
import axios from "axios";
const axiosInstance  = axios.create({
    baseURL : 'https://fakestoreapi.com' , 
     
    headers : { 
        'Content-Type': 'application/json'   

    },
}); 

axiosInstance.interceptors.response.use(
    (response) => response ,
    (error) => { 
        console.log("Error") 
        return Promise.reject(error)
    }
)


export default axiosInstance 
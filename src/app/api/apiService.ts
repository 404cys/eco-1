
import axiosInstance from "./axiosConfig";

interface Para {
    route: string;
    data?: object; 
    category? : string ;  
}

const fetchData = async ({ route }: Para): Promise<any> => { 
    try {
        const res = await axiosInstance.get(route);
        return res.data;
    } catch (e) { 
        console.error(`Error getting data from ${route}:, e`);
        return null;
    }
}
 

const sendData = async ({ route, data }: Para): Promise<any> => {
    try { 
        const res = await axiosInstance.post(route, data);
        return res.data;
    } catch (e) { 
        console.error(`Error sending data to ${route}:, e`);
        return null;
    }
}


export { fetchData ,sendData} ; 

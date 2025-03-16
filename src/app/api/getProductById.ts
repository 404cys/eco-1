import axiosInstance from "./axiosConfig";

const getProductById = async (route: string, id: number) => {
    try {
        const res = await axiosInstance.get(`${route}/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

export default getProductById;

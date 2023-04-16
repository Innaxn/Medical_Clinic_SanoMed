import axios from 'axios';

export const axiosWithoutInterceptors= ()=> axios.create({baseURL: "http://localhost:8080"})


export default axiosWithoutInterceptors


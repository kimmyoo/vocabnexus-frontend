import axios from 'axios'
// const BASE_URL = 'http://localhost:3500' // for development
const BASE_URL = 'https://vocab-nexus-api.onrender.com'  // for deployment


export default axios.create(
    {
        baseURL: BASE_URL
    }
);




export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true
    }
});
// then create a hook to useAxiosPrivate

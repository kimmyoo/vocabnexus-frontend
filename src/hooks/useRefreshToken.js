import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            // this allows us to send cookie with request
            withCredentials: true
        })

        setAuth(prev => {
            // console.log(JSON.stringify(prev))
            // console.log(response.data.accessToken)
            return { ...prev, accessToken: response.data.accessToken }
        })
        // accessToken needs to be returned 
        // for login
        return response.data.accessToken
    }
    // simply return this fucntion for later use
    return refresh

}
export default useRefreshToken
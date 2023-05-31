import axios from "../api/axios";
import useAuth from './useAuth'


const useLogout = () => {
    const { setAuth } = useAuth()
    const logout = async () => {
        // empty auth state
        setAuth({})
        try {
            const response = await axios.post('/auth/logout', {
                withCredentials: true
            })
            console.log(response.data.message)
        } catch (err) {
            console.error(err)
        }
    }

    return logout
}

export default useLogout
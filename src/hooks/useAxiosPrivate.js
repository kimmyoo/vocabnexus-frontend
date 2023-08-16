// attach intercepters to this axios instance
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// a hook that returns axiosPrivate with intercepters attached to it. 
const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // initial request if Authorization header is not set
                if (!config.headers['Authorization']) {
                    // pass the accessToken in FROM AUTH which is set when during log in
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        // response intercept
        const responseIntercept = axiosPrivate.interceptors.response.use(
            // if response is good return it. 
            response => response,
            async (error) => {
                // get the previous request from error.config 
                // save it first for later retry 
                const prevRequest = error?.config
                // if 403 then server refuse to authorize, probably expired access token
                // also need to check if the request is sent or not, otherwise it's infinite loop. 
                // because you keep getting 403 response status
                if (error?.response.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()
                    // set the new accessToken
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                // deal with other errors
                return Promise.reject(error)
            }
        );

        // cleaning up otherwise will end up attaching more and more.
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.response.eject(requestIntercept)
        }
    }, [auth, refresh])

    return axiosPrivate
}


export default useAxiosPrivate
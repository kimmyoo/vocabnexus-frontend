// attach intercepters to this axios instance
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    // initial request if Authorization header is not set
                    // pass the accessToken in from auth which is set when during log in
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )


        // response intercept
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // get the previous request from error.config 
                // save it first for later retry 
                const prevRequest = error?.config
                // if 403 then server refuse to authorize, probably expired access token
                if (error?.response.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()
                    // set the new accessToken
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        );

        // cleaning up 
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.response.eject(requestIntercept)
        }
    }, [auth, refresh])

    return axiosPrivate
}


export default useAxiosPrivate
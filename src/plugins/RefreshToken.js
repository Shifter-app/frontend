import {useEffect} from "react"

import axios from 'axios'

import TokenStorage from '../modules/TokenStorage'
import {useNavigate} from "react-router";


const refreshTokenHandler = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (TokenStorage.isAuthenticated()) {
            (async () => TokenStorage.getToken())()
        }

        const interceptor = axios.interceptors.response.use((response) => {
            // Return a successful response back to the calling service
            return response
        }, async (error) => {
            const originalRequest = error.config
            const status          = error.response ? error.response.status : null

            // Logout user if token refresh didn't work or user is disabled
            if (error.config.url?.includes('v1/auth/refresh-token') || error.response?.data?.message === 'Account is disabled.') {
                TokenStorage.clearUserData()
                navigate('/login')

                return new Promise((resolve, reject) => {
                    reject(error)
                })
            }

            // Return any error which is not due to authentication back to the calling service
            if (status !== 401) {
                return new Promise((resolve, reject) => {
                    reject(error)
                })
            }


            if (!originalRequest._retry && status === 401) {
                originalRequest._retry                = true
                const token                           = await TokenStorage.getNewToken()
                originalRequest.headers.Authorization = `Bearer ${token}`
                originalRequest.baseURL               = undefined

                return axios.request(originalRequest)
            }
            TokenStorage.clearUserData()
            navigate('/login')

            axios.interceptors.response.eject(interceptor)
        })
    }, [])
}

export default refreshTokenHandler

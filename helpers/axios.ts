import axios, { Axios, AxiosInstance } from "axios";
import { NextRequest, NextResponse } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default axiosInstance
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
const baseUrl =import.meta.env.VITE_BASE_URL
const request = axios.create({
    baseURL:`${baseUrl}/api`
});
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
request.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // const refreshToken = localStorage.getItem('refreshToken');
            // try {
            //     const response = await axios.post('/refresh', { refreshToken });
            //     const { accessToken } = response.data;

            //     localStorage.setItem('accessToken', accessToken);

            //     // Retry the original request with the new token
            //     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            //     return axios(originalRequest);
            // } catch (error) {
            //     console.log('token out')
            //     localStorage.removeItem('accessToken')
            //     localStorage.removeItem('refreshToken')
            //     window.location.href = '/auth/login'
            //     // Handle refresh token error or redirect to login
                
            // }
            console.log('token out')
                localStorage.removeItem('accessToken')
                window.location.href = '/auth/login'
        }

        return Promise.reject(error);
    },
);
export const get = async (path: string, options: object = {}) => {
    const response = await request.get(path, options);
    return response.data;
};
export const post = async (path: string, data: any = undefined, options: object = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};
export const put = async (path: string, data:any = undefined, options: object = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
};
export const patch = async (path: string, data: any = undefined, options: object = {}) => {
    const response = await request.patch(path, data, options);
    return response.data;
};
export const del = async (path: string, options: object = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};
export default request;

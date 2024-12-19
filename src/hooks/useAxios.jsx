import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-projects-server.vercel.app',
    withCredentials: true
})

const useAxios = () => {
    const {logOut,setLoading} = UseAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response =>{
         
            return response;
        }, error =>{

            if(error.status === 401 || error.status === 403){
                
                logOut()
                .then(()=>{
                    navigate("/signIn");
                    
                })
                .catch(err => console.log(err))
            }
            return Promise.reject(error);
        } )
    },[])

    return axiosInstance;
};

export default useAxios;


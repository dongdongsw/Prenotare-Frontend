import axios, { AxiosInstance } from "axios";

export const apiClient:AxiosInstance = axios.create({
    baseURL:"http://localhost:9090",
    headers:{
        "Content-Type":"application/json"
    }
});

export const fileClient:AxiosInstance = axios.create({
     baseURL:"http://localhost:9090"
});
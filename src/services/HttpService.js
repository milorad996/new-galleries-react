import axios from "axios";

export default class HttpService {
    constructor() {
        this.client = axios.create({
            baseURL: "my-galleries.000webhostapp.com/api"

        });
        this.client.interceptors.request.use(function (config) {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
} 
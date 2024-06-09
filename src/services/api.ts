import axios from "axios";
import store from "./store";

const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = "http://localhost:5000/api";

const api = axios.create();


let refreshed = false;

api.interceptors.response.use(resp => resp, async (error) => {
    if (error.response.status === 401 && !refreshed) {
        refreshed = true;

        const response = await axios.post(`${baseURL}/users/auth/refresh`, { tokenId: store.getState().refresh?.id }, { withCredentials: true });
    
        if (response.status === 200) {
            store.getState().setToken(response.data.token);
            store.getState().setRefresh(response.data.refresh);

            axios.defaults.headers.common.Authorization = `Bearer ${store.getState().token}`;

            console.log("atualizado");

            return (error.config);
        }
    } 

    refreshed = false;

    return (error.response);
})


api.interceptors.request.use(async (req) => {
    if (store.getState().token) {
        req.headers.Authorization = `Bearer ${store.getState().token}`;
    }

    return (req);
})

export default api;
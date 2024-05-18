import axios from "axios";
import store from "./store";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${store.getState().token}` }
});

api.interceptors.request.use(async (req) => {
    if (store.getState().token) {
        req.headers.Authorization = `Bearer ${store.getState().token}`;

        const decoded = jwtDecode(store.getState().token || "");
            
        if (!dayjs(decoded.exp).isBefore(dayjs())) {
                return req;
        }
    
        const response = await axios.post(`${baseURL}/users/auth/refresh`, { tokenId: store.getState().refresh?.id });
    
        store.getState().setToken(response.data.token);
        store.getState().setRefresh(response.data.refresh);
    
        req.headers.Authorization = `Bearer ${store.getState().token}`;
    }

    return req;
})

export default api;
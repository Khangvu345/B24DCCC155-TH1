import axios from "axios";

export const getDichVu = (payload: any) => {
    return axios.get(`/api/dich-vu`, {params: payload});
}

export const addDichVu = (payload: any) => {
    return axios.post(`/api/dich-vu`, payload);
}

export const updateDichVu = (payload: any) => {
    return axios.put(`/api/dich-vu/${payload._id}`, payload);
}

export const deleteDichVu = (payload: any) => {
    return axios.delete(`/api/dich-vu/${payload._id}`);
}
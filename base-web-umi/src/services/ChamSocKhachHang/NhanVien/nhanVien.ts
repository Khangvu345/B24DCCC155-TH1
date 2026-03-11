import axios from "axios";

export const getNhanVien = (payload: any) => {
    return axios.get(`/api/nhan-vien`, {params: payload});
}

export const addNhanVien = (payload: any) => {
    return axios.post(`/api/nhan-vien`, payload);
}

export const updateNhanVien = (payload: any) => {
    return axios.put(`/api/nhan-vien/${payload._id}`, payload);
}

export const deleteNhanVien = (payload: any) => {
    return axios.delete(`/api/nhan-vien/${payload._id}`);
}

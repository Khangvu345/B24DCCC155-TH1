import axios from "axios";

export const getLichHen = (payload: any) => {
    return axios.get(`/api/lich-hen`, {params: payload});
}

export const addLichHen = (payload: any) => {
    return axios.post(`/api/lich-hen`, payload);
}

export const updateLichHen = (payload: any) => {
    return axios.put(`/api/lich-hen/${payload._id}`, payload);
}

export const deleteLichHen = (payload: any) => {
    return axios.delete(`/api/lich-hen/${payload._id}`);
}

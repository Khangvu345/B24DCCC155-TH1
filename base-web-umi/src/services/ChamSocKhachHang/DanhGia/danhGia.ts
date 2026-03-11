import axios from '@/utils/axios';
import { ip3 } from '@/utils/ip';

const url = '/api/danh-gia';

export const getDanhGia = (payload: any) => {
    return axios.get(url, { params: payload });
};

export const addDanhGia = (payload: any) => {
    return axios.post(url, payload);
};

export const updateDanhGia = (payload: { id: string; data: any }) => {
    const { id, data } = payload;
    return axios.put(`${url}/${id}`, data);
};

export const deleteDanhGia = (payload: { id: string }) => {
    const { id } = payload;
    return axios.delete(`${url}/${id}`);
};

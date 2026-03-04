import axios from '@/utils/axios';

const API_BASE = 'http://localhost:8080/api/quan-ly-ngan-hang-cau-hoi/cau-hoi';

export const getCauHoi = async (params?: any) => {
    return axios.get(API_BASE, { params });
};

export const createCauHoi = async (data: any) => {
    return axios.post(API_BASE, data);
};

export const updateCauHoi = async (id: string, data: any) => {
    return axios.put(`${API_BASE}/${id}`, data);
};

export const deleteCauHoi = async (id: string) => {
    return axios.delete(`${API_BASE}/${id}`);
};

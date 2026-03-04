import axios from '@/utils/axios';

const API_BASE = 'http://localhost:8080/api/quan-ly-ngan-hang-cau-hoi/mon-hoc';

export const getMonHoc = async (params?: any) => {
    return axios.get(API_BASE, { params });
};

export const createMonHoc = async (data: any) => {
    return axios.post(API_BASE, data);
};

export const updateMonHoc = async (id: string, data: any) => {
    return axios.put(`${API_BASE}/${id}`, data);
};

export const deleteMonHoc = async (id: string) => {
    return axios.delete(`${API_BASE}/${id}`);
};

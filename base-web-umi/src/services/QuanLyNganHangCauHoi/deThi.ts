import axios from '@/utils/axios';

const API_DETHI = 'http://localhost:8080/api/quan-ly-ngan-hang-cau-hoi/de-thi';
const API_CAU_TRUC = 'http://localhost:8080/api/quan-ly-ngan-hang-cau-hoi/cau-truc-de-thi';

// Cấu trúc đề thi
export const getCauTruc = async (params?: any) => axios.get(API_CAU_TRUC, { params });
export const createCauTruc = async (data: any) => axios.post(API_CAU_TRUC, data);
export const updateCauTruc = async (id: string, data: any) => axios.put(`${API_CAU_TRUC}/${id}`, data);
export const deleteCauTruc = async (id: string) => axios.delete(`${API_CAU_TRUC}/${id}`);

// Đề thi
export const getDeThi = async (params?: any) => axios.get(API_DETHI, { params });
export const taoDeThiTuDong = async (data: any) => axios.post(`${API_DETHI}/tao-tu-dong`, data);
export const updateDeThi = async (id: string, data: any) => axios.put(`${API_DETHI}/${id}`, data);
export const deleteDeThi = async (id: string) => axios.delete(`${API_DETHI}/${id}`);
export const getChiTietDeThi = async (id: string) => axios.get(`${API_DETHI}/${id}`);

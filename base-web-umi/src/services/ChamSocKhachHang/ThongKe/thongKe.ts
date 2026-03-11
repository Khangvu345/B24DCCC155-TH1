import axios from '@/utils/axios';

const url = '/api/thong-ke';

export const getThongKeLichHen = () => {
    return axios.get(`${url}/lich-hen-theo-ngay`);
};

export const getThongKeDichVu = () => {
    return axios.get(`${url}/doanh-thu-dich-vu`);
};

export const getThongKeNhanVien = () => {
    return axios.get(`${url}/doanh-thu-nhan-vien`);
};

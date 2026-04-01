import axios from '@/utils/axios';
import { message } from 'antd';

export default () => {
  const getSummary = async (lichTrinhId: string): Promise<KeHoachDuLich.INganSachSummary> => {
    if (!lichTrinhId) return Promise.reject('ID không hợp lệ');
    try {
      const res = await axios.get(`/api/du-lich/lich-trinh/${lichTrinhId}/ngan-sach`);
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateSummary = async (
    lichTrinhId: string,
    payload: Partial<KeHoachDuLich.INganSachSummary>,
  ): Promise<KeHoachDuLich.INganSachSummary> => {
    if (!lichTrinhId) return Promise.reject('ID không hợp lệ');
    try {
      const res = await axios.put(`/api/du-lich/lich-trinh/${lichTrinhId}/ngan-sach`, payload);
      message.success('Cập nhật ngân sách thành công');
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getSummary,
    updateSummary,
  };
};

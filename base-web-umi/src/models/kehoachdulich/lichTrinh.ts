import axios from '@/utils/axios';
import { message } from 'antd';
import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<KeHoachDuLich.ILichTrinh>('api/du-lich/lich-trinh', undefined, undefined, '');

  const sapXepDiemDen = async (id: string, ngay: string, diemDenIds: string[]) => {
    if (!id || !ngay) return Promise.reject('Dữ liệu sắp xếp không hợp lệ');
    try {
      const res = await axios.put(`/api/du-lich/lich-trinh/${id}/sap-xep`, { ngay, diemDenIds });
      message.success('Cập nhật thứ tự điểm đến thành công');
      await objInit.getByIdModel(id, true);
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const tinhNganSach = async (id: string): Promise<KeHoachDuLich.INganSachSummary> => {
    if (!id) return Promise.reject('ID không hợp lệ');
    try {
      const res = await axios.get(`/api/du-lich/lich-trinh/${id}/ngan-sach`);
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    ...objInit,
    sapXepDiemDen,
    tinhNganSach,
  };
};

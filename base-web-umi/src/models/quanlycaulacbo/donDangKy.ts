import axios from '@/utils/axios';
import { message } from 'antd';
import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuanLyCauLacBo.IDonDangKy>('api/don-dang-ky', undefined, undefined, '');

  const duyetNhieu = async (ids: string[], hanhDong: 'Approved' | 'Rejected', lyDo?: string) => {
    if (!ids?.length) return Promise.reject('Danh sach id rong');
    try {
      const res = await axios.put('/api/don-dang-ky/duyet', { ids, hanhDong, lyDo });
      message.success(hanhDong === 'Approved' ? 'Duyet don thanh cong' : 'Tu choi don thanh cong');
      await objInit.getModel();
      objInit.setSelectedIds(undefined);
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getLichSu = async (id: string): Promise<QuanLyCauLacBo.ILichSuThaoTac[]> => {
    if (!id) return Promise.reject('Id khong hop le');
    try {
      const res = await axios.get(`/api/don-dang-ky/${id}/lich-su`);
      return res?.data?.data || [];
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    ...objInit,
    duyetNhieu,
    getLichSu,
  };
};

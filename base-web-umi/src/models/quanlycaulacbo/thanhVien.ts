import axios from '@/utils/axios';
import { message } from 'antd';
import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuanLyCauLacBo.IThanhVien>('api/thanh-vien', undefined, undefined, '');

  const chuyenCLB = async (ids: string[], cauLacBoIdMoi: string) => {
    if (!ids?.length || !cauLacBoIdMoi) return Promise.reject('Du lieu chuyen CLB khong hop le');
    try {
      const res = await axios.put('/api/thanh-vien/chuyen-clb', { ids, cauLacBoIdMoi });
      message.success('Chuyen CLB thanh cong');
      await objInit.getModel();
      objInit.setSelectedIds(undefined);
      return res?.data?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    ...objInit,
    chuyenCLB,
  };
};

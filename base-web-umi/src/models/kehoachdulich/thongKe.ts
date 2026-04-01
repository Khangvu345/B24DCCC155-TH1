import axios from '@/utils/axios';

export default () => {
  const getTongQuan = async (): Promise<KeHoachDuLich.IThongKeTongQuan> => {
    const res = await axios.get('/api/du-lich/thong-ke/tong-quan');
    return res?.data?.data;
  };

  const getLichTrinhTheoThang = async (): Promise<KeHoachDuLich.IThongKeTheoThang[]> => {
    const res = await axios.get('/api/du-lich/thong-ke/lich-trinh-theo-thang');
    return res?.data?.data || [];
  };

  const getChiTieuTheoHangMuc = async (): Promise<KeHoachDuLich.IPhanBoNganSach> => {
    const res = await axios.get('/api/du-lich/thong-ke/chi-tieu-theo-hang-muc');
    return res?.data?.data;
  };

  const getDiemDenPhoBien = async (): Promise<KeHoachDuLich.IDiemDenPhoBien[]> => {
    const res = await axios.get('/api/du-lich/thong-ke/diem-den-pho-bien');
    return res?.data?.data || [];
  };

  return {
    getTongQuan,
    getLichTrinhTheoThang,
    getChiTieuTheoHangMuc,
    getDiemDenPhoBien,
  };
};

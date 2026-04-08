import type { ThongKeCongViec } from '@/pages/QuanLyCongViec/typing';
import { layThongKeTongQuan } from '@/services/QuanLyCongViec/congViec';
import { useState } from 'react';

const THONG_KE_MAC_DINH: ThongKeCongViec = {
	tongSoCongViec: 0,
	soChuaLam: 0,
	soDangLam: 0,
	soDaXong: 0,
	tiLeHoanThanh: 0,
};

export default () => {
	const [tongQuan, setTongQuan] = useState<ThongKeCongViec>(THONG_KE_MAC_DINH);
	const [loading, setLoading] = useState(false);

	const taiThongKe = async (): Promise<ThongKeCongViec> => {
		setLoading(true);
		try {
			const data = await layThongKeTongQuan();
			setTongQuan(data);
			return data;
		} catch (error) {
			setTongQuan(THONG_KE_MAC_DINH);
			return Promise.reject(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		tongQuan,
		setTongQuan,
		loading,
		taiThongKe,
	};
};

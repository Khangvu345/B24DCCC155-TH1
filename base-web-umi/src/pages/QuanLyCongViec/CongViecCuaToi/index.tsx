import type { NguoiDungDangNhap } from '@/pages/QuanLyCongViec/typing';
import { Alert, Button } from 'antd';
import { useEffect } from 'react';
import { history, useModel } from 'umi';
import MyTaskPanel from '../DanhSach/MyTaskPanel';

type AuthModel = {
	currentUser?: NguoiDungDangNhap;
	isLoggedIn: boolean;
	isNhanVien: boolean;
	refreshCurrentUser: () => Promise<NguoiDungDangNhap | undefined>;
};

const CongViecCuaToiPage = () => {
	const authModel = useModel('quanlycongviec.auth' as any) as AuthModel;

	useEffect(() => {
		authModel.refreshCurrentUser().catch(() => undefined);
	}, []);

	if (!authModel.isLoggedIn) {
		return (
			<Alert
				type='warning'
				showIcon
				message='Vui long dang nhap de xem cong viec cua toi'
				action={
					<Button type='link' onClick={() => history.push('/cong-viec/dang-nhap')}>
						Dang nhap
					</Button>
				}
			/>
		);
	}

	if (!authModel.isNhanVien) {
		return (
			<Alert
				type='info'
				showIcon
				message='Trang nay danh cho vai tro nhan vien. Vui long chuyen sang danh sach hoac thong ke.'
			/>
		);
	}

	return <MyTaskPanel />;
};

export default CongViecCuaToiPage;

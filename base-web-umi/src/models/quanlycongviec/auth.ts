import type { KieuLuuDangNhap, NguoiDungDangNhap } from '@/services/QuanLyCongViec/typing';
import { dangNhap, dangXuat, layNguoiDungHienTai, layTaiKhoanMau, matKhauMau } from '@/services/QuanLyCongViec/auth';
import { sha256 } from '@/utils/authHash';
import { message } from 'antd';
import { useEffect, useState } from 'react';

type DangNhapPayload = {
	username: string;
	password: string;
	storageType: KieuLuuDangNhap;
};

export default () => {
	const [currentUser, setCurrentUser] = useState<NguoiDungDangNhap | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [taiKhoanMau, setTaiKhoanMau] = useState<string[]>([]);

	const refreshCurrentUser = async () => {
		setLoading(true);
		try {
			const user = await layNguoiDungHienTai();
			setCurrentUser(user);
			return user;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setTaiKhoanMau(layTaiKhoanMau());
		refreshCurrentUser().catch(() => setCurrentUser(undefined));
	}, []);

	const login = async (payload: DangNhapPayload): Promise<NguoiDungDangNhap> => {
		setLoading(true);
		try {
			const passwordHash = await sha256(payload.password);
			const user = await dangNhap({
				username: payload.username.trim(),
				passwordHash,
				storageType: payload.storageType,
			});

			setCurrentUser(user);
			message.success('Dang nhap thanh cong');
			return user;
		} catch (error) {
			message.error('Dang nhap that bai. Vui long kiem tra lai thong tin.');
			return Promise.reject(error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		setLoading(true);
		try {
			await dangXuat();
			setCurrentUser(undefined);
			message.success('Da dang xuat');
		} catch (error) {
			message.error('Khong the dang xuat luc nay');
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return {
		currentUser,
		loading,
		isLoggedIn: Boolean(currentUser?.username),
		isAdmin: currentUser?.role === 'admin',
		isNhanVien: currentUser?.role === 'nhanvien',
		login,
		logout,
		refreshCurrentUser,
		taiKhoanMau,
		matKhauMau,
	};
};

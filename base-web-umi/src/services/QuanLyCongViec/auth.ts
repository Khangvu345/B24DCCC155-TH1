import axios from '@/utils/axios';
import type { KieuLuuDangNhap, NguoiDungDangNhap, VaiTroNguoiDung } from '@/services/QuanLyCongViec/typing';

type TaiKhoanXacThuc = {
	username: string;
	passwordHash: string;
	role: VaiTroNguoiDung;
};

export const QLCV_STORAGE_KEYS = {
	currentUser: 'qlcv_current_user',
	taskList: 'qlcv_task_list',
	authUsers: 'qlcv_auth_users',
} as const;

const TAI_KHOAN_MAC_DINH: TaiKhoanXacThuc[] = [
	{ username: 'admin', passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', role: 'admin' },
	{
		username: 'anh.nguyen',
		passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
		role: 'nhanvien',
	},
	{
		username: 'binh.tran',
		passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
		role: 'nhanvien',
	},
	{
		username: 'chi.le',
		passwordHash: 'daaad6e5604e8e17bd9f108d91e26afe6281dac8fda0091040a7a6d7bd9b43b5',
		role: 'nhanvien',
	},
	{
		username: 'duong.pham',
		passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
		role: 'nhanvien',
	},
	{
		username: 'em.vo',
		passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
		role: 'nhanvien',
	},
	{
		username: 'giang.do',
		passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
		role: 'nhanvien',
	},
];

export const matKhauMau = 'admin123 (admin), 123456, hoac 12345678';

const laMoiTruongTrinhDuyet = () => typeof window !== 'undefined';

const docJson = <T,>(storage: Storage, key: string, defaultValue: T): T => {
	try {
		const raw = storage.getItem(key);
		if (!raw) return defaultValue;
		return JSON.parse(raw) as T;
	} catch {
		return defaultValue;
	}
};

const ghiJson = <T,>(storage: Storage, key: string, value: T) => {
	storage.setItem(key, JSON.stringify(value));
};

const layStorageTheoLoai = (storageType: KieuLuuDangNhap): Storage =>
	storageType === 'sessionStorage' ? sessionStorage : localStorage;

const luuNguoiDungDangNhap = (user: NguoiDungDangNhap, storageType: KieuLuuDangNhap) => {
	if (!laMoiTruongTrinhDuyet()) return;
	localStorage.removeItem(QLCV_STORAGE_KEYS.currentUser);
	sessionStorage.removeItem(QLCV_STORAGE_KEYS.currentUser);
	ghiJson(layStorageTheoLoai(storageType), QLCV_STORAGE_KEYS.currentUser, {
		...user,
		storageType,
	});
};

const chuanHoaRole = (username: string, role?: VaiTroNguoiDung): VaiTroNguoiDung => {
	if (role === 'admin' || username === 'admin') return 'admin';
	return 'nhanvien';
};

const chuanHoaNguoiDungDangNhap = (value?: Partial<NguoiDungDangNhap>): NguoiDungDangNhap | undefined => {
	if (!value?.username || !value?.passwordHash) return undefined;

	const storageType: KieuLuuDangNhap = value.storageType === 'sessionStorage' ? 'sessionStorage' : 'localStorage';

	return {
		username: value.username,
		passwordHash: value.passwordHash,
		role: chuanHoaRole(value.username, value.role),
		storageType,
		loginAt: value.loginAt || new Date().toISOString(),
	};
};

const chuanHoaDanhSachTaiKhoan = (value: Partial<TaiKhoanXacThuc>[]): TaiKhoanXacThuc[] => {
	const mapped = value
		.filter((item) => item?.username && item?.passwordHash)
		.map((item) => ({
			username: item.username as string,
			passwordHash: item.passwordHash as string,
			role: chuanHoaRole(item.username as string, item.role),
		}));

	const uniqueByUsername = new Map<string, TaiKhoanXacThuc>();
	mapped.forEach((item) => uniqueByUsername.set(item.username, item));

	if (!uniqueByUsername.has('admin')) {
		uniqueByUsername.set('admin', TAI_KHOAN_MAC_DINH[0]);
	}

	const result = Array.from(uniqueByUsername.values());
	return result.length ? result : TAI_KHOAN_MAC_DINH;
};

const layNguoiDungTuStorage = (): NguoiDungDangNhap | undefined => {
	if (!laMoiTruongTrinhDuyet()) return undefined;

	const userSessionRaw = docJson<Partial<NguoiDungDangNhap> | undefined>(
		sessionStorage,
		QLCV_STORAGE_KEYS.currentUser,
		undefined,
	);
	const userSession = chuanHoaNguoiDungDangNhap(userSessionRaw);
	if (userSession?.username) {
		ghiJson(sessionStorage, QLCV_STORAGE_KEYS.currentUser, userSession);
		return userSession;
	}

	const userLocalRaw = docJson<Partial<NguoiDungDangNhap> | undefined>(
		localStorage,
		QLCV_STORAGE_KEYS.currentUser,
		undefined,
	);
	const userLocal = chuanHoaNguoiDungDangNhap(userLocalRaw);
	if (userLocal?.username) {
		ghiJson(localStorage, QLCV_STORAGE_KEYS.currentUser, userLocal);
		return userLocal;
	}

	return undefined;
};

const khoiTaoTaiKhoanMau = (): TaiKhoanXacThuc[] => {
	if (!laMoiTruongTrinhDuyet()) return TAI_KHOAN_MAC_DINH;

	const danhSachDaLuuRaw = docJson<Partial<TaiKhoanXacThuc>[]>(localStorage, QLCV_STORAGE_KEYS.authUsers, []);
	const danhSachDaLuu = chuanHoaDanhSachTaiKhoan(danhSachDaLuuRaw);
	if (danhSachDaLuu.length) {
		ghiJson(localStorage, QLCV_STORAGE_KEYS.authUsers, danhSachDaLuu);
		return danhSachDaLuu;
	}

	ghiJson(localStorage, QLCV_STORAGE_KEYS.authUsers, TAI_KHOAN_MAC_DINH);
	return TAI_KHOAN_MAC_DINH;
};

export const layTaiKhoanMau = (): string[] => khoiTaoTaiKhoanMau().map((item) => item.username);

export const layVaiTroNguoiDungHienTai = (): VaiTroNguoiDung | undefined => layNguoiDungTuStorage()?.role;

export const dangNhap = async (payload: {
	username: string;
	passwordHash: string;
	storageType: KieuLuuDangNhap;
}): Promise<NguoiDungDangNhap> => {
	try {
		const response = await axios.post('/api/cong-viec/auth/login', payload);
		const data = response?.data?.data as Partial<NguoiDungDangNhap> | undefined;
		const user = chuanHoaNguoiDungDangNhap({ ...(data || {}), storageType: payload.storageType });
		if (!user) {
			return Promise.reject(new Error('Du lieu nguoi dung khong hop le'));
		}
		luuNguoiDungDangNhap(user, payload.storageType);
		return user;
	} catch {
		const danhSachTaiKhoan = khoiTaoTaiKhoanMau();
		const matched = danhSachTaiKhoan.find(
			(item) => item.username === payload.username && item.passwordHash === payload.passwordHash,
		);

		if (!matched) {
			return Promise.reject(new Error('Thong tin dang nhap khong dung'));
		}

		const user: NguoiDungDangNhap = {
			username: matched.username,
			passwordHash: matched.passwordHash,
			role: matched.role,
			storageType: payload.storageType,
			loginAt: new Date().toISOString(),
		};

		luuNguoiDungDangNhap(user, payload.storageType);

		return user;
	}
};

export const dangXuat = async (): Promise<void> => {
	try {
		await axios.post('/api/cong-viec/auth/logout');
	} catch {
		// fallback local storage cleanup
	}

	if (laMoiTruongTrinhDuyet()) {
		localStorage.removeItem(QLCV_STORAGE_KEYS.currentUser);
		sessionStorage.removeItem(QLCV_STORAGE_KEYS.currentUser);
	}
};

export const layNguoiDungHienTai = async (): Promise<NguoiDungDangNhap | undefined> => {
	try {
		const response = await axios.get('/api/cong-viec/auth/me');
		return chuanHoaNguoiDungDangNhap(response?.data?.data as Partial<NguoiDungDangNhap> | undefined);
	} catch {
		return layNguoiDungTuStorage();
	}
};

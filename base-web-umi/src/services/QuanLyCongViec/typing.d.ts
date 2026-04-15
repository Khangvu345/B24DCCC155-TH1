export type MucDoUuTien = 'Thap' | 'TrungBinh' | 'Cao';
export type TrangThaiCongViec = 'ChuaLam' | 'DangLam' | 'DaXong';
export type KieuLuuDangNhap = 'localStorage' | 'sessionStorage';
export type VaiTroNguoiDung = 'admin' | 'nhanvien';

export interface NguoiDungDangNhap {
	username: string;
	passwordHash: string;
	role: VaiTroNguoiDung;
	storageType: KieuLuuDangNhap;
	loginAt: string;
}

export interface CongViec {
	_id?: string;
	id: string;
	tenCongViec: string;
	nguoiDuocGiao: string;
	mucDoUuTien: MucDoUuTien;
	deadline: string;
	trangThai: TrangThaiCongViec;
	moTa?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface BoLocCongViec {
	keyword?: string;
	trangThai?: TrangThaiCongViec;
	nguoiDuocGiao?: string;
}

export interface CalendarCongViecEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	resource: CongViec;
}

export interface ThongKeCongViec {
	tongSoCongViec: number;
	soChuaLam: number;
	soDangLam: number;
	soDaXong: number;
	tiLeHoanThanh: number;
}

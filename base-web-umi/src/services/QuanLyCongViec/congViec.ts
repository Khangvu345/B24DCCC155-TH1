import axios from '@/utils/axios';
import { EOperatorType } from '@/components/Table/constant';
import type { TFilter } from '@/components/Table/typing';
import type { BoLocCongViec, CongViec, ThongKeCongViec, TrangThaiCongViec } from '@/services/QuanLyCongViec/typing';
import { layNguoiDungHienTai, QLCV_STORAGE_KEYS } from './auth';

type PageQuery = {
	page?: number;
	limit?: number;
	condition?: Partial<CongViec> & BoLocCongViec;
	filters?: TFilter<CongViec>[];
	sort?: Record<string, 1 | -1 | undefined>;
	select?: string;
};

type PageResponse = {
	result: CongViec[];
	total: number;
};

const DS_NGUOI_DUOC_GIAO_MAC_DINH = ['anh.nguyen', 'binh.tran', 'chi.le', 'duong.pham', 'em.vo', 'giang.do'];

const DANH_SACH_CONG_VIEC_MAU = [
	'Hoan thien giao dien dashboard',
	'Viet tai lieu API cho module thong bao',
	'Toi uu toc do trang chu',
	'Tich hop dang nhap OIDC',
	'Kiem thu tinh nang import Excel',
	'Cap nhat bo quy tac coding',
	'Lam viec voi doi backend ve API auth',
	'Xu ly bug hien thi tren mobile',
	'Dong bo du lieu thong ke tu server',
	'Bo sung bo loc nang cao cho bang du lieu',
	'Ve sinh code va tach component lon',
	'Tao testcase cho module dang ky CLB',
	'Chuan hoa thong diep loi API',
	'Thiet ke man hinh quan ly lich trinh',
	'Cap nhat tai lieu huong dan su dung',
	'Ra soat quyen truy cap menu',
	'Dong bo avatar nguoi dung tu profile',
	'Kiem tra tinh toan thong ke theo ngay',
	'Triển khai tính năng tìm kiếm nhanh',
	'Hoan thien trang thong ke tong quan',
];

const laMoiTruongTrinhDuyet = () => typeof window !== 'undefined';

const docJson = <T,>(key: string, defaultValue: T): T => {
	if (!laMoiTruongTrinhDuyet()) return defaultValue;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return defaultValue;
		return JSON.parse(raw) as T;
	} catch {
		return defaultValue;
	}
};

const ghiJson = <T,>(key: string, value: T) => {
	if (!laMoiTruongTrinhDuyet()) return;
	localStorage.setItem(key, JSON.stringify(value));
};

const taoDuLieuCongViecMau = (): CongViec[] => {
	const trangThai: TrangThaiCongViec[] = ['ChuaLam', 'DangLam', 'DaXong'];
	const mucDo = ['Thap', 'TrungBinh', 'Cao'] as const;

	return DANH_SACH_CONG_VIEC_MAU.map((tenCongViec, index) => {
		const ngayDeadline = new Date();
		ngayDeadline.setDate(ngayDeadline.getDate() + (index % 15) - 5);

		const thoiDiemTao = new Date();
		thoiDiemTao.setDate(thoiDiemTao.getDate() - ((index % 7) + 1));

		const id = `qlcv-${index + 1}`;
		return {
			_id: id,
			id,
			tenCongViec,
			nguoiDuocGiao: DS_NGUOI_DUOC_GIAO_MAC_DINH[index % DS_NGUOI_DUOC_GIAO_MAC_DINH.length],
			mucDoUuTien: mucDo[index % mucDo.length],
			deadline: ngayDeadline.toISOString(),
			trangThai: trangThai[index % trangThai.length],
			moTa: `Cong viec #${index + 1} trong ke hoach sprint hien tai.`,
			createdAt: thoiDiemTao.toISOString(),
			updatedAt: thoiDiemTao.toISOString(),
		};
	});
};

const layDanhSachCongViec = (): CongViec[] => {
	const daLuu = docJson<CongViec[]>(QLCV_STORAGE_KEYS.taskList, []);
	if (daLuu.length) return daLuu;

	const duLieuMau = taoDuLieuCongViecMau();
	ghiJson(QLCV_STORAGE_KEYS.taskList, duLieuMau);
	return duLieuMau;
};

const luuDanhSachCongViec = (danhSach: CongViec[]) => {
	ghiJson(QLCV_STORAGE_KEYS.taskList, danhSach);
};

const layGiaTriTheoField = (record: Record<string, unknown>, field: string | [keyof CongViec, string]): unknown => {
	const path = Array.isArray(field) ? field.join('.') : field;
	return path.split('.').reduce<unknown>((acc, key) => {
		if (acc && typeof acc === 'object') {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, record);
};

const soSanhGiaTri = (left: unknown, right: unknown): number => {
	if (left == null && right == null) return 0;
	if (left == null) return -1;
	if (right == null) return 1;

	if (typeof left === 'number' && typeof right === 'number') {
		return left - right;
	}

	if (typeof left === 'string' && typeof right === 'string') {
		const leftTime = Date.parse(left);
		const rightTime = Date.parse(right);
		if (!Number.isNaN(leftTime) && !Number.isNaN(rightTime)) {
			return leftTime - rightTime;
		}
		return left.localeCompare(right, 'vi');
	}

	return String(left).localeCompare(String(right), 'vi');
};

const apDungCondition = (danhSach: CongViec[], condition?: Partial<CongViec> & BoLocCongViec): CongViec[] => {
	if (!condition) return danhSach;

	const keyword = condition.keyword?.trim().toLowerCase();

	return danhSach.filter((item) => {
		if (condition.trangThai && item.trangThai !== condition.trangThai) return false;
		if (condition.nguoiDuocGiao && item.nguoiDuocGiao !== condition.nguoiDuocGiao) return false;
		if (keyword) {
			const text = `${item.tenCongViec} ${item.moTa ?? ''}`.toLowerCase();
			if (!text.includes(keyword)) return false;
		}
		return true;
	});
};

const apDungFilters = (danhSach: CongViec[], filters?: TFilter<CongViec>[]): CongViec[] => {
	if (!filters?.length) return danhSach;

	return filters
		.filter((item) => item.active !== false && item.values?.length)
		.reduce((state, filter) => {
			return state.filter((record) => {
				const value = layGiaTriTheoField(record as unknown as Record<string, unknown>, filter.field);
				const values = filter.values.map((item) => String(item).toLowerCase());
				const base = String(value ?? '').toLowerCase();

				if (filter.operator === EOperatorType.CONTAIN) {
					return values.some((item) => base.includes(item));
				}

				return values.includes(base);
			});
		}, danhSach);
};

const apDungSort = (danhSach: CongViec[], sort?: Record<string, 1 | -1 | undefined>): CongViec[] => {
	if (!sort) return danhSach;

	const sortEntry = Object.entries(sort).find(([, value]) => value === 1 || value === -1);
	if (!sortEntry) return danhSach;

	const [field, direction] = sortEntry;
	const dir = direction === 1 ? 1 : -1;

	const sorted = [...danhSach];
	sorted.sort((left, right) => {
		const leftValue = layGiaTriTheoField(left as unknown as Record<string, unknown>, field as any);
		const rightValue = layGiaTriTheoField(right as unknown as Record<string, unknown>, field as any);
		return soSanhGiaTri(leftValue, rightValue) * dir;
	});

	return sorted;
};

const tinhThongKe = (danhSach: CongViec[]): ThongKeCongViec => {
	const tongSoCongViec = danhSach.length;
	const soChuaLam = danhSach.filter((item) => item.trangThai === 'ChuaLam').length;
	const soDangLam = danhSach.filter((item) => item.trangThai === 'DangLam').length;
	const soDaXong = danhSach.filter((item) => item.trangThai === 'DaXong').length;
	const tiLeHoanThanh = tongSoCongViec ? Number(((soDaXong / tongSoCongViec) * 100).toFixed(2)) : 0;

	return {
		tongSoCongViec,
		soChuaLam,
		soDangLam,
		soDaXong,
		tiLeHoanThanh,
	};
};

const taoTaskId = (): string => `qlcv-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const fallbackGetPage = async (query?: PageQuery): Promise<PageResponse> => {
	const page = Number(query?.page ?? 1) || 1;
	const limit = Number(query?.limit ?? 10) || 10;

	const daFilter = apDungCondition(layDanhSachCongViec(), query?.condition);
	const daLocNangCao = apDungFilters(daFilter, query?.filters);
	const daSort = apDungSort(daLocNangCao, query?.sort);

	const offset = (page - 1) * limit;
	return {
		result: daSort.slice(offset, offset + limit),
		total: daSort.length,
	};
};

export const getCongViecPage = async (query?: PageQuery): Promise<PageResponse> => {
	try {
		const response = await axios.get('/api/cong-viec/page', { params: query });
		return {
			result: (response?.data?.data?.result ?? []) as CongViec[],
			total: Number(response?.data?.data?.total ?? 0),
		};
	} catch {
		return fallbackGetPage(query);
	}
};

export const getTatCaCongViec = async (): Promise<CongViec[]> => {
	try {
		const response = await axios.get('/api/cong-viec/many');
		return (response?.data?.data ?? []) as CongViec[];
	} catch {
		return layDanhSachCongViec();
	}
};

export const taoCongViec = async (payload: Partial<CongViec>): Promise<CongViec> => {
	try {
		const response = await axios.post('/api/cong-viec', payload);
		return response?.data?.data as CongViec;
	} catch {
		const danhSach = layDanhSachCongViec();
		const now = new Date().toISOString();
		const id = taoTaskId();

		const record: CongViec = {
			_id: id,
			id,
			tenCongViec: payload.tenCongViec?.trim() || 'Cong viec moi',
			nguoiDuocGiao: payload.nguoiDuocGiao || DS_NGUOI_DUOC_GIAO_MAC_DINH[0],
			mucDoUuTien: payload.mucDoUuTien || 'TrungBinh',
			deadline: payload.deadline || now,
			trangThai: payload.trangThai || 'ChuaLam',
			moTa: payload.moTa?.trim(),
			createdAt: now,
			updatedAt: now,
		};

		luuDanhSachCongViec([record, ...danhSach]);
		return record;
	}
};

export const capNhatCongViec = async (id: string, payload: Partial<CongViec>): Promise<CongViec> => {
	try {
		const response = await axios.put(`/api/cong-viec/${id}`, payload);
		return response?.data?.data as CongViec;
	} catch {
		const danhSach = layDanhSachCongViec();
		const idx = danhSach.findIndex((item) => item.id === id || item._id === id);
		if (idx === -1) return Promise.reject(new Error('Khong tim thay cong viec can cap nhat'));

		const oldRecord = danhSach[idx];
		const updated: CongViec = {
			...oldRecord,
			...payload,
			tenCongViec: payload.tenCongViec?.trim() || oldRecord.tenCongViec,
			moTa: payload.moTa?.trim() ?? oldRecord.moTa,
			updatedAt: new Date().toISOString(),
		};
		danhSach[idx] = updated;
		luuDanhSachCongViec(danhSach);
		return updated;
	}
};

export const xoaCongViec = async (id: string): Promise<void> => {
	try {
		await axios.delete(`/api/cong-viec/${id}`);
	} catch {
		const danhSach = layDanhSachCongViec();
		luuDanhSachCongViec(danhSach.filter((item) => item.id !== id && item._id !== id));
	}
};

export const layCongViecCuaToi = async (username?: string): Promise<CongViec[]> => {
	try {
		const response = await axios.get('/api/cong-viec/my-tasks', { params: { username } });
		return (response?.data?.data ?? []) as CongViec[];
	} catch {
		let tenDangNhap = username;
		if (!tenDangNhap) {
			const current = await layNguoiDungHienTai();
			tenDangNhap = current?.username;
		}
		if (!tenDangNhap) return [];

		return layDanhSachCongViec().filter((item) => item.nguoiDuocGiao === tenDangNhap);
	}
};

export const layCalendarCongViec = async (): Promise<CongViec[]> => {
	try {
		const response = await axios.get('/api/cong-viec/calendar');
		return (response?.data?.data ?? []) as CongViec[];
	} catch {
		return layDanhSachCongViec();
	}
};

export const layThongKeTongQuan = async (): Promise<ThongKeCongViec> => {
	try {
		const response = await axios.get('/api/cong-viec/thong-ke/tong-quan');
		return response?.data?.data as ThongKeCongViec;
	} catch {
		return tinhThongKe(layDanhSachCongViec());
	}
};

export const layNguoiDuocGiao = (): string[] => {
	const fromTasks = layDanhSachCongViec().map((item) => item.nguoiDuocGiao);
	const raw = Array.from(new Set([...DS_NGUOI_DUOC_GIAO_MAC_DINH, ...fromTasks]));
	return raw.sort((left, right) => left.localeCompare(right, 'vi'));
};

export const capNhatTrangThaiCongViec = async (id: string, trangThai: TrangThaiCongViec): Promise<CongViec> => {
	return capNhatCongViec(id, { trangThai });
};

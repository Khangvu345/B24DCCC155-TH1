import { Request, Response } from 'express';

type MucDoUuTien = 'Thap' | 'TrungBinh' | 'Cao';
type TrangThaiCongViec = 'ChuaLam' | 'DangLam' | 'DaXong';
type KieuLuuDangNhap = 'localStorage' | 'sessionStorage';

interface NguoiDungDangNhap {
	username: string;
	passwordHash: string;
	storageType: KieuLuuDangNhap;
	loginAt: string;
}

interface CongViec {
	_id: string;
	id: string;
	tenCongViec: string;
	nguoiDuocGiao: string;
	mucDoUuTien: MucDoUuTien;
	deadline: string;
	trangThai: TrangThaiCongViec;
	moTa?: string;
	createdAt: string;
	updatedAt: string;
}

interface ThongKeCongViec {
	tongSoCongViec: number;
	soChuaLam: number;
	soDangLam: number;
	soDaXong: number;
	tiLeHoanThanh: number;
}

interface BoLocCongViec {
	keyword?: string;
	trangThai?: TrangThaiCongViec;
	nguoiDuocGiao?: string;
}

type FilterRule = {
	field: string | string[];
	operator?: string;
	values: (string | number)[];
	active?: boolean;
};

const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const DS_NGUOI_DUNG = ['anh.nguyen', 'binh.tran', 'chi.le', 'duong.pham', 'em.vo', 'giang.do'];

const DS_TAI_KHOAN = [
	{ username: 'anh.nguyen', passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' },
	{ username: 'binh.tran', passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f' },
	{ username: 'chi.le', passwordHash: 'daaad6e5604e8e17bd9f108d91e26afe6281dac8fda0091040a7a6d7bd9b43b5' },
	{ username: 'duong.pham', passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' },
	{ username: 'em.vo', passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' },
	{ username: 'giang.do', passwordHash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f' },
];

const taoDuLieuMau = (): CongViec[] => {
	const mucDo: MucDoUuTien[] = ['Thap', 'TrungBinh', 'Cao'];
	const trangThai: TrangThaiCongViec[] = ['ChuaLam', 'DangLam', 'DaXong'];
	const tenMau = [
		'Hoan thien giao dien dashboard',
		'Tich hop dang nhap OIDC',
		'Ve sinh code va tach component',
		'Cap nhat bo loc tim kiem',
		'Kiem thu API dang ky CLB',
		'Tao tai lieu huong dan su dung',
		'Toi uu trang danh sach',
		'Bo sung thong ke theo trang thai',
		'Kiem thu tren trinh duyet mobile',
		'Dong bo du lieu voi backend',
		'Ra soat quyen menu',
		'Xu ly bug hien thi icon',
		'Tao script import du lieu',
		'Thiet ke trang thong ke tong quan',
		'Ve sinh quy trinh deploy',
		'Dong bo avatar nguoi dung',
		'Triển khai tính năng tìm kiếm nhanh',
		'Hoan thien tai lieu API cong viec',
		'Cap nhat trang login module',
		'Kiem tra hieu nang table lon',
	];

	return tenMau.map((tenCongViec, index) => {
		const base = new Date();
		base.setDate(base.getDate() + (index % 14) - 4);

		const now = new Date();
		now.setDate(now.getDate() - ((index % 6) + 1));

		const id = `qlcv-mock-${index + 1}`;
		return {
			_id: id,
			id,
			tenCongViec,
			nguoiDuocGiao: DS_NGUOI_DUNG[index % DS_NGUOI_DUNG.length],
			mucDoUuTien: mucDo[index % mucDo.length],
			deadline: base.toISOString(),
			trangThai: trangThai[index % trangThai.length],
			moTa: `Mo ta cong viec #${index + 1}`,
			createdAt: now.toISOString(),
			updatedAt: now.toISOString(),
		};
	});
};

let currentUser: NguoiDungDangNhap | undefined;
let dsCongViec: CongViec[] = taoDuLieuMau();

const parseJsonIfNeeded = <T,>(value: unknown, defaultValue: T): T => {
	if (!value) return defaultValue;
	if (typeof value === 'string') {
		try {
			return JSON.parse(value) as T;
		} catch {
			return defaultValue;
		}
	}
	return value as T;
};

const getRawValue = (value: unknown): unknown => {
	if (Array.isArray(value)) return value[0];
	return value;
};

const getNestedValue = (record: Record<string, unknown>, field: string | string[]): unknown => {
	const path = Array.isArray(field) ? field : field.split('.');
	return path.reduce<unknown>((acc, key) => {
		if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
		return undefined;
	}, record);
};

const compareValue = (left: unknown, right: unknown): number => {
	if (left == null && right == null) return 0;
	if (left == null) return -1;
	if (right == null) return 1;

	if (typeof left === 'number' && typeof right === 'number') return left - right;

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

const applyCondition = (danhSach: CongViec[], condition?: Partial<CongViec> & BoLocCongViec): CongViec[] => {
	if (!condition) return danhSach;
	const keyword = condition.keyword?.toLowerCase().trim();

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

const applyFilterRules = (danhSach: CongViec[], filters: FilterRule[]): CongViec[] => {
	if (!filters.length) return danhSach;

	return filters
		.filter((item) => item.active !== false && item.values?.length)
		.reduce((state, rule) => {
			return state.filter((record) => {
				const recordValue = getNestedValue(record as unknown as Record<string, unknown>, rule.field);
				const base = String(recordValue ?? '').toLowerCase();
				const values = rule.values.map((item) => String(item).toLowerCase());
				const operator = String(rule.operator ?? '').toLowerCase();

				if (operator === 'contain') {
					return values.some((item) => base.includes(item));
				}

				return values.includes(base);
			});
		}, danhSach);
};

const applySort = (danhSach: CongViec[], sort?: Record<string, 1 | -1 | undefined>) => {
	if (!sort) return danhSach;
	const sortEntry = Object.entries(sort).find(([, value]) => value === 1 || value === -1);
	if (!sortEntry) return danhSach;

	const [field, direction] = sortEntry;
	const dir = direction === 1 ? 1 : -1;

	const sorted = [...danhSach];
	sorted.sort((left, right) => {
		const leftValue = getNestedValue(left as unknown as Record<string, unknown>, field);
		const rightValue = getNestedValue(right as unknown as Record<string, unknown>, field);
		return compareValue(leftValue, rightValue) * dir;
	});

	return sorted;
};

const getThongKe = (danhSach: CongViec[]): ThongKeCongViec => {
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

const getPageData = async (req: Request, res: Response) => {
	await wait();

	const page = Number(getRawValue(req.query.page) ?? 1) || 1;
	const limit = Number(getRawValue(req.query.limit) ?? 10) || 10;
	const condition = parseJsonIfNeeded<Partial<CongViec> & BoLocCongViec>(
		getRawValue(req.query.condition),
		{},
	);
	const filters = parseJsonIfNeeded<FilterRule[]>(getRawValue(req.query.filters), []);
	const sort = parseJsonIfNeeded<Record<string, 1 | -1 | undefined>>(getRawValue(req.query.sort), {});

	const daLoc = applyCondition(dsCongViec, condition);
	const daLocNangCao = applyFilterRules(daLoc, filters);
	const daSort = applySort(daLocNangCao, sort);
	const offset = (page - 1) * limit;

	res.send({
		data: {
			result: daSort.slice(offset, offset + limit),
			total: daSort.length,
		},
	});
};

const postDangNhap = async (req: Request, res: Response) => {
	await wait();
	const payload = req.body as Partial<NguoiDungDangNhap>;
	if (!payload.username || !payload.passwordHash || !payload.storageType) {
		res.status(400).send({ message: 'Thong tin dang nhap khong hop le' });
		return;
	}

	const matched = DS_TAI_KHOAN.find(
		(item) => item.username === payload.username && item.passwordHash === payload.passwordHash,
	);

	if (!matched) {
		res.status(401).send({ message: 'Sai ten dang nhap hoac mat khau' });
		return;
	}

	currentUser = {
		username: matched.username,
		passwordHash: matched.passwordHash,
		storageType: payload.storageType,
		loginAt: new Date().toISOString(),
	};

	res.send({ data: currentUser });
};

const postDangXuat = async (req: Request, res: Response) => {
	await wait();
	currentUser = undefined;
	res.send({ data: true });
};

const getMe = async (req: Request, res: Response) => {
	await wait();
	res.send({ data: currentUser });
};

const getMany = async (req: Request, res: Response) => {
	await wait();
	res.send({ data: dsCongViec });
};

const postCongViec = async (req: Request, res: Response) => {
	await wait();
	const payload = req.body as Partial<CongViec>;
	if (!payload.tenCongViec?.trim()) {
		res.status(400).send({ message: 'Ten cong viec la bat buoc' });
		return;
	}

	const id = `qlcv-mock-${Date.now()}`;
	const now = new Date().toISOString();
	const record: CongViec = {
		_id: id,
		id,
		tenCongViec: payload.tenCongViec.trim(),
		nguoiDuocGiao: payload.nguoiDuocGiao || DS_NGUOI_DUNG[0],
		mucDoUuTien: payload.mucDoUuTien || 'TrungBinh',
		deadline: payload.deadline || now,
		trangThai: payload.trangThai || 'ChuaLam',
		moTa: payload.moTa,
		createdAt: now,
		updatedAt: now,
	};

	dsCongViec = [record, ...dsCongViec];
	res.send({ data: record });
};

const putCongViec = async (req: Request, res: Response) => {
	await wait();
	const payload = req.body as Partial<CongViec>;
	const { id } = req.params;

	const index = dsCongViec.findIndex((item) => item.id === id || item._id === id);
	if (index === -1) {
		res.status(404).send({ message: 'Khong tim thay cong viec' });
		return;
	}

	const old = dsCongViec[index];
	const updated: CongViec = {
		...old,
		...payload,
		tenCongViec: payload.tenCongViec?.trim() || old.tenCongViec,
		updatedAt: new Date().toISOString(),
	};

	dsCongViec[index] = updated;
	res.send({ data: updated });
};

const deleteCongViec = async (req: Request, res: Response) => {
	await wait();
	const { id } = req.params;
	dsCongViec = dsCongViec.filter((item) => item.id !== id && item._id !== id);
	res.send({ data: true });
};

const getMyTasks = async (req: Request, res: Response) => {
	await wait();
	const usernameRaw = getRawValue(req.query.username);
	const username = typeof usernameRaw === 'string' ? usernameRaw : currentUser?.username;
	if (!username) {
		res.send({ data: [] });
		return;
	}

	res.send({ data: dsCongViec.filter((item) => item.nguoiDuocGiao === username) });
};

const getCalendar = async (req: Request, res: Response) => {
	await wait();
	const sorted = [...dsCongViec].sort((left, right) => Date.parse(left.deadline) - Date.parse(right.deadline));
	res.send({ data: sorted });
};

const getThongKeTongQuan = async (req: Request, res: Response) => {
	await wait();
	res.send({ data: getThongKe(dsCongViec) });
};

export default {
	'POST /api/cong-viec/auth/login': postDangNhap,
	'POST /api/cong-viec/auth/logout': postDangXuat,
	'GET /api/cong-viec/auth/me': getMe,
	'GET /api/cong-viec/page': getPageData,
	'GET /api/cong-viec/many': getMany,
	'POST /api/cong-viec': postCongViec,
	'PUT /api/cong-viec/:id': putCongViec,
	'DELETE /api/cong-viec/:id': deleteCongViec,
	'GET /api/cong-viec/my-tasks': getMyTasks,
	'GET /api/cong-viec/calendar': getCalendar,
	'GET /api/cong-viec/thong-ke/tong-quan': getThongKeTongQuan,
};

import { Request, Response } from 'express';

let soVanBangs: any[] = [
	{ _id: '1', id: '1', tenSo: 'Sổ văn bằng Cử nhân 2023', nam: 2023, soVaoSoHienTai: 6 },
	{ _id: '2', id: '2', tenSo: 'Sổ văn bằng Cử nhân 2024', nam: 2024, soVaoSoHienTai: 4 },
	{ _id: '3', id: '3', tenSo: 'Sổ văn bằng Thạc sĩ 2024', nam: 2024, soVaoSoHienTai: 3 },
];

let quyetDinhs: any[] = [
	{ _id: '101', id: '101', soSQ: 'QĐ-2023/001', ngayBanHanh: '2023-06-15', trichYeu: 'Công nhận tốt nghiệp đợt 1 năm 2023', soVanBangId: '1', soLuotTraCuu: 12 },
	{ _id: '102', id: '102', soSQ: 'QĐ-2023/002', ngayBanHanh: '2023-12-20', trichYeu: 'Công nhận tốt nghiệp đợt 2 năm 2023', soVanBangId: '1', soLuotTraCuu: 8 },
	{ _id: '103', id: '103', soSQ: 'QĐ-2024/001', ngayBanHanh: '2024-06-10', trichYeu: 'Công nhận tốt nghiệp đợt 1 năm 2024', soVanBangId: '2', soLuotTraCuu: 5 },
	{ _id: '104', id: '104', soSQ: 'QĐ-2024/002', ngayBanHanh: '2024-07-25', trichYeu: 'Công nhận tốt nghiệp Thạc sĩ đợt 1 năm 2024', soVanBangId: '3', soLuotTraCuu: 3 },
];

let cauHinhs: any[] = [
	{ _id: '201', id: '201', maTruong: 'nganh', tenTruong: 'Ngành đào tạo', kieuDuLieu: 'String' },
	{ _id: '202', id: '202', maTruong: 'xepLoai', tenTruong: 'Xếp loại tốt nghiệp', kieuDuLieu: 'String' },
	{ _id: '203', id: '203', maTruong: 'diemTB', tenTruong: 'Điểm trung bình', kieuDuLieu: 'Number' },
	{ _id: '204', id: '204', maTruong: 'ngayCap', tenTruong: 'Ngày cấp văn bằng', kieuDuLieu: 'Date' },
];

let thongTinVanBangs: any[] = [
	{ _id: '301', id: '301', soHieuVanBang: 'VB-2023-0001', soVaoSo: 1, maSinhVien: 'SV001', hoTen: 'Nguyễn Văn An', ngaySinh: '2001-03-15', quyetDinhId: '101', extraFields: { nganh: 'Công nghệ thông tin', xepLoai: 'Giỏi', diemTB: 3.45, ngayCap: '2023-07-01' } },
	{ _id: '302', id: '302', soHieuVanBang: 'VB-2023-0002', soVaoSo: 2, maSinhVien: 'SV002', hoTen: 'Trần Thị Bình', ngaySinh: '2001-08-22', quyetDinhId: '101', extraFields: { nganh: 'Quản trị kinh doanh', xepLoai: 'Xuất sắc', diemTB: 3.78, ngayCap: '2023-07-01' } },
	{ _id: '303', id: '303', soHieuVanBang: 'VB-2023-0003', soVaoSo: 3, maSinhVien: 'SV003', hoTen: 'Lê Hoàng Cường', ngaySinh: '2000-12-05', quyetDinhId: '101', extraFields: { nganh: 'Kế toán', xepLoai: 'Khá', diemTB: 3.12, ngayCap: '2023-07-01' } },
	{ _id: '304', id: '304', soHieuVanBang: 'VB-2023-0004', soVaoSo: 4, maSinhVien: 'SV004', hoTen: 'Phạm Minh Đức', ngaySinh: '2001-05-10', quyetDinhId: '102', extraFields: { nganh: 'Công nghệ thông tin', xepLoai: 'Giỏi', diemTB: 3.55, ngayCap: '2024-01-10' } },
	{ _id: '305', id: '305', soHieuVanBang: 'VB-2023-0005', soVaoSo: 5, maSinhVien: 'SV005', hoTen: 'Hoàng Thị Em', ngaySinh: '2001-01-28', quyetDinhId: '102', extraFields: { nganh: 'Ngôn ngữ Anh', xepLoai: 'Khá', diemTB: 3.05, ngayCap: '2024-01-10' } },
	{ _id: '306', id: '306', soHieuVanBang: 'VB-2024-0001', soVaoSo: 1, maSinhVien: 'SV006', hoTen: 'Võ Thanh Phong', ngaySinh: '2002-04-18', quyetDinhId: '103', extraFields: { nganh: 'Công nghệ thông tin', xepLoai: 'Xuất sắc', diemTB: 3.82, ngayCap: '2024-07-01' } },
	{ _id: '307', id: '307', soHieuVanBang: 'VB-2024-0002', soVaoSo: 2, maSinhVien: 'SV007', hoTen: 'Đặng Thùy Linh', ngaySinh: '2002-09-30', quyetDinhId: '103', extraFields: { nganh: 'Marketing', xepLoai: 'Giỏi', diemTB: 3.40, ngayCap: '2024-07-01' } },
	{ _id: '308', id: '308', soHieuVanBang: 'VB-2024-0003', soVaoSo: 3, maSinhVien: 'SV008', hoTen: 'Bùi Quốc Hùng', ngaySinh: '2002-07-14', quyetDinhId: '103', extraFields: { nganh: 'Kỹ thuật phần mềm', xepLoai: 'Khá', diemTB: 3.18, ngayCap: '2024-07-01' } },
	{ _id: '309', id: '309', soHieuVanBang: 'THS-2024-0001', soVaoSo: 1, maSinhVien: 'CH001', hoTen: 'Nguyễn Thị Hương', ngaySinh: '1998-11-20', quyetDinhId: '104', extraFields: { nganh: 'Khoa học máy tính', xepLoai: 'Giỏi', diemTB: 3.60, ngayCap: '2024-08-15' } },
	{ _id: '310', id: '310', soHieuVanBang: 'THS-2024-0002', soVaoSo: 2, maSinhVien: 'CH002', hoTen: 'Trịnh Văn Kiên', ngaySinh: '1999-02-08', quyetDinhId: '104', extraFields: { nganh: 'Quản trị kinh doanh', xepLoai: 'Khá', diemTB: 3.25, ngayCap: '2024-08-15' } },
];

const paginate = (data: any[], req: Request) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;
	const start = (page - 1) * limit;
	const end = start + limit;
	return {
		result: data.slice(start, end),
		total: data.length,
	};
};

export default {
	'GET /api/so-van-bang/page': (req: Request, res: Response) => {
		res.send({ data: paginate(soVanBangs, req) });
	},
	'GET /api/so-van-bang/many': (_req: Request, res: Response) => {
		res.send({ data: soVanBangs });
	},
	'POST /api/so-van-bang': (req: Request, res: Response) => {
		const newItem = { ...req.body, _id: Date.now().toString(), id: Date.now().toString(), soVaoSoHienTai: 1 };
		soVanBangs.push(newItem);
		res.send({ data: newItem });
	},
	'PUT /api/so-van-bang/:id': (req: Request, res: Response) => {
		const { id } = req.params;
		const index = soVanBangs.findIndex((i) => i.id === id || i._id === id);
		if (index !== -1) {
			soVanBangs[index] = { ...soVanBangs[index], ...req.body };
			res.send({ data: soVanBangs[index] });
		} else res.status(404).send({ message: 'Không tìm thấy' });
	},
	'DELETE /api/so-van-bang/:id': (req: Request, res: Response) => {
		soVanBangs = soVanBangs.filter((i) => i.id !== req.params.id && i._id !== req.params.id);
		res.send({ data: true });
	},

	'GET /api/quyet-dinh/page': (req: Request, res: Response) => {
		res.send({ data: paginate(quyetDinhs, req) });
	},
	'GET /api/quyet-dinh/many': (_req: Request, res: Response) => {
		res.send({ data: quyetDinhs });
	},
	'POST /api/quyet-dinh': (req: Request, res: Response) => {
		const newItem = { ...req.body, _id: Date.now().toString(), id: Date.now().toString(), soLuotTraCuu: 0 };
		quyetDinhs.push(newItem);
		res.send({ data: newItem });
	},
	'PUT /api/quyet-dinh/:id': (req: Request, res: Response) => {
		const { id } = req.params;
		const index = quyetDinhs.findIndex((i) => i.id === id || i._id === id);
		if (index !== -1) {
			quyetDinhs[index] = { ...quyetDinhs[index], ...req.body };
			res.send({ data: quyetDinhs[index] });
		} else res.status(404).send({ message: 'Không tìm thấy' });
	},
	'DELETE /api/quyet-dinh/:id': (req: Request, res: Response) => {
		quyetDinhs = quyetDinhs.filter((i) => i.id !== req.params.id && i._id !== req.params.id);
		res.send({ data: true });
	},

	'GET /api/cau-hinh/page': (req: Request, res: Response) => {
		res.send({ data: paginate(cauHinhs, req) });
	},
	'GET /api/cau-hinh/many': (_req: Request, res: Response) => {
		res.send({ data: cauHinhs });
	},
	'POST /api/cau-hinh': (req: Request, res: Response) => {
		const newItem = { ...req.body, _id: Date.now().toString(), id: Date.now().toString() };
		cauHinhs.push(newItem);
		res.send({ data: newItem });
	},
	'PUT /api/cau-hinh/:id': (req: Request, res: Response) => {
		const { id } = req.params;
		const index = cauHinhs.findIndex((i) => i.id === id || i._id === id);
		if (index !== -1) {
			cauHinhs[index] = { ...cauHinhs[index], ...req.body };
			res.send({ data: cauHinhs[index] });
		} else res.status(404).send({ message: 'Không tìm thấy' });
	},
	'DELETE /api/cau-hinh/:id': (req: Request, res: Response) => {
		cauHinhs = cauHinhs.filter((i) => i.id !== req.params.id && i._id !== req.params.id);
		res.send({ data: true });
	},

	'GET /api/thong-tin-van-bang/page': (req: Request, res: Response) => {
		res.send({ data: paginate(thongTinVanBangs, req) });
	},
	'GET /api/thong-tin-van-bang/many': (_req: Request, res: Response) => {
		res.send({ data: thongTinVanBangs });
	},
	'POST /api/thong-tin-van-bang': (req: Request, res: Response) => {
		const { quyetDinhId, ...data } = req.body;

		const qd = quyetDinhs.find((i) => i.id === quyetDinhId || i._id === quyetDinhId);
		if (!qd) return res.status(400).send({ message: 'Không tìm thấy quyết định' });

		const so = soVanBangs.find((s) => s.id === qd.soVanBangId || s._id === qd.soVanBangId);
		if (!so) return res.status(400).send({ message: 'Quyết định này thuộc về sổ không tồn tại' });

		const newRecord = {
			...data,
			_id: Date.now().toString(),
			id: Date.now().toString(),
			quyetDinhId: qd.id || qd._id,
			soVaoSo: so.soVaoSoHienTai,
		};

		so.soVaoSoHienTai += 1;
		thongTinVanBangs.push(newRecord);
		res.send({ data: newRecord });
	},
	'DELETE /api/thong-tin-van-bang/:id': (req: Request, res: Response) => {
		thongTinVanBangs = thongTinVanBangs.filter((i) => i.id !== req.params.id && i._id !== req.params.id);
		res.send({ data: true });
	},

	'GET /api/tra-cuu': (req: Request, res: Response) => {
		const query = req.query;
		const activeParams = Object.entries(query).filter(([_, v]) => v !== undefined && v !== '');

		if (activeParams.length < 2) {
			return res.status(400).send({ message: 'Yêu cầu nhập ít nhất 2 tham số để tra cứu' });
		}

		const filtered = thongTinVanBangs.filter((t) => {
			return activeParams.every(([key, value]) => {
				const val = (t[key] !== undefined ? t[key] : t.extraFields?.[key]) || '';
				return val.toString().toLowerCase().includes(value!.toString().toLowerCase());
			});
		});

		if (filtered.length > 0) {
			const countedQdIds = new Set<string>();
			filtered.forEach((item) => {
				const qdId = item.quyetDinhId;
				if (!countedQdIds.has(qdId)) {
					countedQdIds.add(qdId);
					const qd = quyetDinhs.find((q) => q.id === qdId || q._id === qdId);
					if (qd) qd.soLuotTraCuu = (qd.soLuotTraCuu || 0) + 1;
				}
			});
		}

		res.send({ data: filtered });
	},
};

import { Request, Response } from 'express';

type TLoaiHinh = 'Bien' | 'Nui' | 'ThanhPho';

type TDiemDen = {
  _id: string;
  ten: string;
  diaDiem: string;
  loaiHinh: TLoaiHinh;
  anhDaiDien?: string;
  rating: number;
  moTa: string;
  thoiGianThamQuan: number;
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
  giaDuKien?: number;
  createdAt: string;
  updatedAt: string;
};

type TLichTrinhNgay = {
  ngay: string;
  diemDenIds: string[];
  tongChiPhi: number;
  tongThoiGianDiChuyen: number;
};

type TPhanBoNganSach = {
  anUong: number;
  diChuyen: number;
  luuTru: number;
  khac: number;
};

type TLichTrinh = {
  _id: string;
  ten: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  ngay: TLichTrinhNgay[];
  tongNganSach: number;
  phanBo?: TPhanBoNganSach;
  createdAt: string;
  updatedAt: string;
};

type TFilter = {
  field?: string | string[];
  operator?: string;
  values?: Array<string | number | boolean>;
  active?: boolean;
};

const now = new Date().toISOString();

const diemDenDataSeed: TDiemDen[] = [
  {
    _id: 'dd-001',
    ten: 'Bãi biển Mỹ Khê',
    diaDiem: 'Đà Nẵng',
    loaiHinh: 'Bien',
    anhDaiDien: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    rating: 4.6,
    moTa: 'Bãi biển đẹp, cát trắng và nước trong xanh.',
    thoiGianThamQuan: 180,
    chiPhiAnUong: 300000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 250000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-002',
    ten: 'Phố cổ Hội An',
    diaDiem: 'Quảng Nam',
    loaiHinh: 'ThanhPho',
    anhDaiDien: 'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=800',
    rating: 4.7,
    moTa: 'Khám phá phố cổ về đêm và các quán cafe nhỏ.',
    thoiGianThamQuan: 240,
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 900000,
    chiPhiDiChuyen: 200000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-003',
    ten: 'Sa Pa',
    diaDiem: 'Lào Cai',
    loaiHinh: 'Nui',
    anhDaiDien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    rating: 4.5,
    moTa: 'Khí hậu mát mẻ, cảnh núi non và ruộng bậc thang.',
    thoiGianThamQuan: 300,
    chiPhiAnUong: 400000,
    chiPhiLuuTru: 1000000,
    chiPhiDiChuyen: 450000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-004',
    ten: 'Đà Lạt',
    diaDiem: 'Lâm Đồng',
    loaiHinh: 'Nui',
    anhDaiDien: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    rating: 4.4,
    moTa: 'Thành phố sương mù, hồ và vườn hoa.',
    thoiGianThamQuan: 240,
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 850000,
    chiPhiDiChuyen: 350000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-005',
    ten: 'Vịnh Hạ Long',
    diaDiem: 'Quảng Ninh',
    loaiHinh: 'Bien',
    anhDaiDien: 'https://images.unsplash.com/photo-1518684079-38b1f0c037c6?w=800',
    rating: 4.8,
    moTa: 'Đi thuyền tham vịnh với hang động và đảo đá.',
    thoiGianThamQuan: 360,
    chiPhiAnUong: 500000,
    chiPhiLuuTru: 1200000,
    chiPhiDiChuyen: 600000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-006',
    ten: 'Hà Nội',
    diaDiem: 'Hà Nội',
    loaiHinh: 'ThanhPho',
    anhDaiDien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    rating: 4.2,
    moTa: 'Phố cổ, hồ Gươm và ẩm thực đường phố.',
    thoiGianThamQuan: 240,
    chiPhiAnUong: 300000,
    chiPhiLuuTru: 900000,
    chiPhiDiChuyen: 200000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-007',
    ten: 'Ninh Bình',
    diaDiem: 'Ninh Bình',
    loaiHinh: 'Nui',
    anhDaiDien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    rating: 4.3,
    moTa: 'Tràng An, Tam Cốc và núi non trùng điệp.',
    thoiGianThamQuan: 300,
    chiPhiAnUong: 320000,
    chiPhiLuuTru: 750000,
    chiPhiDiChuyen: 250000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-008',
    ten: 'Phú Quốc',
    diaDiem: 'Kiên Giang',
    loaiHinh: 'Bien',
    anhDaiDien: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    rating: 4.7,
    moTa: 'Đảo ngọc với bãi biển đẹp và hoạt động biển.',
    thoiGianThamQuan: 360,
    chiPhiAnUong: 550000,
    chiPhiLuuTru: 1400000,
    chiPhiDiChuyen: 650000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-009',
    ten: 'Huế',
    diaDiem: 'Thừa Thiên Huế',
    loaiHinh: 'ThanhPho',
    anhDaiDien: 'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=800',
    rating: 4.1,
    moTa: 'Khám phá Đại Nội và ẩm thực Huế.',
    thoiGianThamQuan: 240,
    chiPhiAnUong: 280000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 220000,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'dd-010',
    ten: 'Bà Nà Hills',
    diaDiem: 'Đà Nẵng',
    loaiHinh: 'Nui',
    anhDaiDien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    rating: 4.4,
    moTa: 'Khu du lịch trên núi với Cầu Vàng.',
    thoiGianThamQuan: 240,
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 0,
    chiPhiDiChuyen: 200000,
    createdAt: now,
    updatedAt: now,
  },
];

const calcGiaDuKien = (record: TDiemDen): number => {
  const total =
    (record.chiPhiAnUong || 0) + (record.chiPhiLuuTru || 0) + (record.chiPhiDiChuyen || 0);
  return total;
};

let diemDenData: TDiemDen[] = diemDenDataSeed.map((item) => ({
  ...item,
  giaDuKien: item.giaDuKien ?? calcGiaDuKien(item),
}));

const findDiemDen = (id: string): TDiemDen | undefined => diemDenData.find((item) => item._id === id);

const calcNgaySummary = (diemDenIds: string[]) => {
  const diemDenList = diemDenIds
    .map((id) => findDiemDen(id))
    .filter(Boolean) as TDiemDen[];

  const tongChiPhi = diemDenList.reduce((sum, item) => sum + calcGiaDuKien(item), 0);
  const tongThoiGianDiChuyen = Math.max(0, diemDenIds.length - 1) * 45;

  return { tongChiPhi, tongThoiGianDiChuyen };
};

const buildNgay = (ngay: string, diemDenIds: string[]): TLichTrinhNgay => {
  const summary = calcNgaySummary(diemDenIds);
  return {
    ngay,
    diemDenIds,
    tongChiPhi: summary.tongChiPhi,
    tongThoiGianDiChuyen: summary.tongThoiGianDiChuyen,
  };
};

const calcTongNganSach = (ngay: TLichTrinhNgay[]): number =>
  ngay.reduce((sum, item) => sum + (item.tongChiPhi || 0), 0);

const buildLichTrinh = (payload: Partial<TLichTrinh>): TLichTrinh => {
  const id = payload._id || `lt-${Date.now()}`;
  const ngay = (payload.ngay || []).map((item) => buildNgay(item.ngay, item.diemDenIds || []));
  const tongNganSach = payload.tongNganSach || calcTongNganSach(ngay);

  return {
    _id: id,
    ten: payload.ten || 'Lịch trình mới',
    ngayBatDau: payload.ngayBatDau || now,
    ngayKetThuc: payload.ngayKetThuc || now,
    ngay,
    tongNganSach,
    phanBo: payload.phanBo,
    createdAt: payload.createdAt || now,
    updatedAt: new Date().toISOString(),
  };
};

let lichTrinhData: TLichTrinh[] = [
  buildLichTrinh({
    _id: 'lt-001',
    ten: 'Du lịch miền Trung 3 ngày',
    ngayBatDau: '2025-04-10T00:00:00.000Z',
    ngayKetThuc: '2025-04-12T00:00:00.000Z',
    ngay: [
      buildNgay('2025-04-10', ['dd-001', 'dd-010']),
      buildNgay('2025-04-11', ['dd-002', 'dd-009']),
      buildNgay('2025-04-12', ['dd-002']),
    ],
  }),
  buildLichTrinh({
    _id: 'lt-002',
    ten: 'Khám phá miền Bắc 4 ngày',
    ngayBatDau: '2025-05-05T00:00:00.000Z',
    ngayKetThuc: '2025-05-08T00:00:00.000Z',
    ngay: [
      buildNgay('2025-05-05', ['dd-006']),
      buildNgay('2025-05-06', ['dd-005']),
      buildNgay('2025-05-07', ['dd-007']),
      buildNgay('2025-05-08', ['dd-003']),
    ],
  }),
  buildLichTrinh({
    _id: 'lt-003',
    ten: 'Nghỉ dưỡng biển 2 ngày',
    ngayBatDau: '2025-06-15T00:00:00.000Z',
    ngayKetThuc: '2025-06-16T00:00:00.000Z',
    ngay: [
      buildNgay('2025-06-15', ['dd-008']),
      buildNgay('2025-06-16', ['dd-008', 'dd-001']),
    ],
  }),
];

const getFieldValue = (record: Record<string, any>, field?: string | string[]) => {
  if (!field) return undefined;
  if (Array.isArray(field)) {
    return field.reduce((acc: any, key) => (acc ? acc[key] : undefined), record);
  }
  return record[field];
};

const parseCondition = (condition: any) => {
  if (!condition) return {};
  if (typeof condition === 'string') {
    try {
      return JSON.parse(condition);
    } catch {
      return {};
    }
  }
  return condition;
};

const parseFilters = (filters: any): TFilter[] => {
  if (!filters) return [];
  if (typeof filters === 'string') {
    try {
      return JSON.parse(filters);
    } catch {
      return [];
    }
  }
  if (Array.isArray(filters)) return filters;
  return [];
};

const parseSort = (sort: any) => {
  if (!sort) return undefined;
  if (typeof sort === 'string') {
    try {
      return JSON.parse(sort);
    } catch {
      return undefined;
    }
  }
  return sort;
};

const applyConditionAny = <T extends Record<string, any>>(data: T[], rawCondition: any): T[] => {
  const condition = parseCondition(rawCondition);
  const keys = Object.keys(condition || {});
  if (!keys.length) return data;

  return data.filter((item) =>
    keys.every((key) => {
      const conditionValue = condition[key];
      if (conditionValue === undefined || conditionValue === null || conditionValue === '') return true;

      const itemValue = item[key];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }

      return itemValue === conditionValue;
    }),
  );
};

const applyFiltersAny = <T extends Record<string, any>>(data: T[], filters: TFilter[]): T[] => {
  if (!filters.length) return data;

  return data.filter((item) => {
    return filters.every((filterItem) => {
      if (filterItem.active === false) return true;

      const values = filterItem.values || [];
      if (!values.length) return true;

      const recordValue = getFieldValue(item, filterItem.field);
      const firstValue = values[0];

      if (filterItem.operator === 'contain') {
        return String(recordValue ?? '')
          .toLowerCase()
          .includes(String(firstValue ?? '').toLowerCase());
      }

      if (filterItem.operator === 'in') {
        return values.map((value) => String(value)).includes(String(recordValue ?? ''));
      }

      return true;
    });
  });
};

const applySortAny = <T extends Record<string, any>>(data: T[], rawSort: any): T[] => {
  const sort = parseSort(rawSort);
  if (!sort || typeof sort !== 'object') return data;

  const sortKeys = Object.keys(sort);
  if (!sortKeys.length) return data;

  const field = sortKeys[0];
  const direction = Number(sort[field]) || 1;

  return [...data].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA === valueB) return 0;
    if (valueA === undefined || valueA === null) return -1 * direction;
    if (valueB === undefined || valueB === null) return 1 * direction;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * direction;
    }

    if (valueA > valueB) return 1 * direction;
    return -1 * direction;
  });
};

const pagedResult = <T,>(data: T[], page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    result: data.slice(start, end),
    total: data.length,
    page,
    limit,
  };
};

const getDiemDenPage = (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const dataAfterCondition = applyConditionAny(diemDenData, req.query?.condition);
  const dataAfterFilter = applyFiltersAny(dataAfterCondition, parseFilters(req.query?.filters));
  const sorted = applySortAny(dataAfterFilter, req.query?.sort);

  return res.json({
    data: pagedResult(sorted, page, limit),
    success: true,
  });
};

const getDiemDenMany = (req: Request, res: Response) => {
  const dataAfterCondition = applyConditionAny(diemDenData, req.query?.condition);
  const sorted = applySortAny(dataAfterCondition, req.query?.sort);

  return res.json({
    data: sorted,
    success: true,
  });
};

const getDiemDenById = (req: Request, res: Response) => {
  const record = diemDenData.find((item) => item._id === req.params.id);
  if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy điểm đến' });
  return res.json({ data: record, success: true });
};

const createDiemDen = (req: Request, res: Response) => {
  const payload = req.body || {};
  const currentTime = new Date().toISOString();

  const newRecord: TDiemDen = {
    _id: `dd-${Date.now()}`,
    ten: payload.ten || '',
    diaDiem: payload.diaDiem || '',
    loaiHinh: payload.loaiHinh || 'Bien',
    anhDaiDien: payload.anhDaiDien || '',
    rating: Number(payload.rating || 0),
    moTa: payload.moTa || '',
    thoiGianThamQuan: Number(payload.thoiGianThamQuan || 0),
    chiPhiAnUong: Number(payload.chiPhiAnUong || 0),
    chiPhiLuuTru: Number(payload.chiPhiLuuTru || 0),
    chiPhiDiChuyen: Number(payload.chiPhiDiChuyen || 0),
    giaDuKien: Number(payload.giaDuKien || 0),
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  newRecord.giaDuKien = newRecord.giaDuKien || calcGiaDuKien(newRecord);
  diemDenData = [newRecord, ...diemDenData];

  return res.status(201).json({ data: newRecord, success: true });
};

const updateDiemDen = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updated: TDiemDen | undefined;

  diemDenData = diemDenData.map((item) => {
    if (item._id !== id) return item;
    const nextRecord: TDiemDen = {
      ...item,
      ...payload,
      rating: payload.rating !== undefined ? Number(payload.rating) : item.rating,
      thoiGianThamQuan:
        payload.thoiGianThamQuan !== undefined ? Number(payload.thoiGianThamQuan) : item.thoiGianThamQuan,
      chiPhiAnUong: payload.chiPhiAnUong !== undefined ? Number(payload.chiPhiAnUong) : item.chiPhiAnUong,
      chiPhiLuuTru: payload.chiPhiLuuTru !== undefined ? Number(payload.chiPhiLuuTru) : item.chiPhiLuuTru,
      chiPhiDiChuyen:
        payload.chiPhiDiChuyen !== undefined ? Number(payload.chiPhiDiChuyen) : item.chiPhiDiChuyen,
      updatedAt: new Date().toISOString(),
    };
    nextRecord.giaDuKien = Number(payload.giaDuKien || calcGiaDuKien(nextRecord));
    updated = nextRecord;
    return nextRecord;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy điểm đến' });
  return res.json({ data: updated, success: true });
};

const updateDiemDenMany = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  const update = req.body?.update || {};
  const nowTime = new Date().toISOString();

  diemDenData = diemDenData.map((item) => {
    if (!ids.includes(item._id)) return item;
    const nextRecord = { ...item, ...update, updatedAt: nowTime } as TDiemDen;
    nextRecord.giaDuKien = calcGiaDuKien(nextRecord);
    return nextRecord;
  });

  const updated = diemDenData.filter((item) => ids.includes(item._id));
  return res.json({ data: updated, success: true });
};

const deleteDiemDen = (req: Request, res: Response) => {
  const oldLength = diemDenData.length;
  diemDenData = diemDenData.filter((item) => item._id !== req.params.id);
  if (oldLength === diemDenData.length) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy điểm đến' });
  }
  return res.json({ data: true, success: true });
};

const deleteDiemDenMany = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  diemDenData = diemDenData.filter((item) => !ids.includes(item._id));
  return res.json({ data: true, success: true });
};

const getLichTrinhPage = (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const dataAfterCondition = applyConditionAny(lichTrinhData, req.query?.condition);
  const dataAfterFilter = applyFiltersAny(dataAfterCondition, parseFilters(req.query?.filters));
  const sorted = applySortAny(dataAfterFilter, req.query?.sort);

  return res.json({ data: pagedResult(sorted, page, limit), success: true });
};

const getLichTrinhMany = (req: Request, res: Response) => {
  const dataAfterCondition = applyConditionAny(lichTrinhData, req.query?.condition);
  const sorted = applySortAny(dataAfterCondition, req.query?.sort);

  return res.json({ data: sorted, success: true });
};

const getLichTrinhById = (req: Request, res: Response) => {
  const record = lichTrinhData.find((item) => item._id === req.params.id);
  if (!record) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  return res.json({ data: record, success: true });
};

const createLichTrinh = (req: Request, res: Response) => {
  const payload = req.body || {};
  const newRecord = buildLichTrinh(payload);

  lichTrinhData = [newRecord, ...lichTrinhData];
  return res.status(201).json({ data: newRecord, success: true });
};

const updateLichTrinh = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updated: TLichTrinh | undefined;

  lichTrinhData = lichTrinhData.map((item) => {
    if (item._id !== id) return item;
    const nextRecord = buildLichTrinh({
      ...item,
      ...payload,
      _id: id,
      createdAt: item.createdAt,
    });
    updated = nextRecord;
    return nextRecord;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  return res.json({ data: updated, success: true });
};

const deleteLichTrinh = (req: Request, res: Response) => {
  const oldLength = lichTrinhData.length;
  lichTrinhData = lichTrinhData.filter((item) => item._id !== req.params.id);
  if (oldLength === lichTrinhData.length) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  }
  return res.json({ data: true, success: true });
};

const sapXepDiemDen = (req: Request, res: Response) => {
  const { id } = req.params;
  const { ngay, diemDenIds } = req.body || {};
  if (!ngay || !Array.isArray(diemDenIds)) {
    return res.status(400).json({ success: false, message: 'Dữ liệu sắp xếp không hợp lệ' });
  }

  let updated: TLichTrinh | undefined;

  lichTrinhData = lichTrinhData.map((item) => {
    if (item._id !== id) return item;

    const ngayList = item.ngay.map((ngayItem) =>
      ngayItem.ngay === ngay ? buildNgay(ngayItem.ngay, diemDenIds) : ngayItem,
    );

    const nextRecord: TLichTrinh = {
      ...item,
      ngay: ngayList,
      tongNganSach: item.tongNganSach || calcTongNganSach(ngayList),
      updatedAt: new Date().toISOString(),
    };

    updated = nextRecord;
    return nextRecord;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  return res.json({ data: updated, success: true });
};

const calcPhanBo = (plan: TLichTrinh): TPhanBoNganSach => {
  const diemDenList = plan.ngay
    .flatMap((item) => item.diemDenIds)
    .map((id) => findDiemDen(id))
    .filter(Boolean) as TDiemDen[];

  return diemDenList.reduce(
    (acc, item) => {
      acc.anUong += item.chiPhiAnUong || 0;
      acc.diChuyen += item.chiPhiDiChuyen || 0;
      acc.luuTru += item.chiPhiLuuTru || 0;
      return acc;
    },
    { anUong: 0, diChuyen: 0, luuTru: 0, khac: 0 } as TPhanBoNganSach,
  );
};

const buildNganSachSummary = (plan: TLichTrinh) => {
  const phanBo = plan.phanBo || calcPhanBo(plan);
  const daSuDung = (phanBo.anUong || 0) + (phanBo.diChuyen || 0) + (phanBo.luuTru || 0) + (phanBo.khac || 0);
  const tongNganSach = plan.tongNganSach || daSuDung;
  const conLai = tongNganSach - daSuDung;

  return {
    tongNganSach,
    daSuDung,
    conLai,
    phanBo,
    vuotNganSach: daSuDung > tongNganSach,
  };
};

const getNganSach = (req: Request, res: Response) => {
  const plan = lichTrinhData.find((item) => item._id === req.params.id);
  if (!plan) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  return res.json({ data: buildNganSachSummary(plan), success: true });
};

const updateNganSach = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updated: TLichTrinh | undefined;

  lichTrinhData = lichTrinhData.map((item) => {
    if (item._id !== id) return item;
    const nextRecord: TLichTrinh = {
      ...item,
      tongNganSach:
        payload.tongNganSach !== undefined ? Number(payload.tongNganSach) : item.tongNganSach,
      phanBo: payload.phanBo || item.phanBo,
      updatedAt: new Date().toISOString(),
    };
    updated = nextRecord;
    return nextRecord;
  });

  if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
  return res.json({ data: buildNganSachSummary(updated), success: true });
};

const thongKeTongQuan = (req: Request, res: Response) => {
  const soLichTrinh = lichTrinhData.length;
  const doanhThu = lichTrinhData.reduce((sum, item) => sum + (item.tongNganSach || 0), 0);

  const chiTieuTheoHangMuc = lichTrinhData.reduce(
    (acc, plan) => {
      const phanBo = plan.phanBo || calcPhanBo(plan);
      acc.anUong += phanBo.anUong || 0;
      acc.diChuyen += phanBo.diChuyen || 0;
      acc.luuTru += phanBo.luuTru || 0;
      acc.khac += phanBo.khac || 0;
      return acc;
    },
    { anUong: 0, diChuyen: 0, luuTru: 0, khac: 0 } as TPhanBoNganSach,
  );

  const diemDenCount: Record<string, number> = {};
  lichTrinhData.forEach((plan) => {
    plan.ngay.forEach((day) => {
      day.diemDenIds.forEach((id) => {
        diemDenCount[id] = (diemDenCount[id] || 0) + 1;
      });
    });
  });

  const diemDenPhoBien = Object.keys(diemDenCount)
    .map((id) => ({
      diemDenId: id,
      ten: findDiemDen(id)?.ten || 'Không xác định',
      soLuotChon: diemDenCount[id],
    }))
    .sort((a, b) => b.soLuotChon - a.soLuotChon)
    .slice(0, 6);

  return res.json({
    data: {
      soLichTrinh,
      doanhThu,
      diemDenPhoBien,
      chiTieuTheoHangMuc,
    },
    success: true,
  });
};

const thongKeLichTrinhTheoThang = (req: Request, res: Response) => {
  const map: Record<string, { soLichTrinh: number; doanhThu: number }> = {};

  lichTrinhData.forEach((item) => {
    const thang = (item.ngayBatDau || '').slice(0, 7) || 'Khác';
    if (!map[thang]) map[thang] = { soLichTrinh: 0, doanhThu: 0 };
    map[thang].soLichTrinh += 1;
    map[thang].doanhThu += item.tongNganSach || 0;
  });

  const data = Object.keys(map)
    .sort()
    .map((thang) => ({
      thang,
      soLichTrinh: map[thang].soLichTrinh,
      doanhThu: map[thang].doanhThu,
    }));

  return res.json({ data, success: true });
};

const thongKeChiTieuTheoHangMuc = (req: Request, res: Response) => {
  const summary = lichTrinhData.reduce(
    (acc, plan) => {
      const phanBo = plan.phanBo || calcPhanBo(plan);
      acc.anUong += phanBo.anUong || 0;
      acc.diChuyen += phanBo.diChuyen || 0;
      acc.luuTru += phanBo.luuTru || 0;
      acc.khac += phanBo.khac || 0;
      return acc;
    },
    { anUong: 0, diChuyen: 0, luuTru: 0, khac: 0 } as TPhanBoNganSach,
  );

  return res.json({ data: summary, success: true });
};

const thongKeDiemDenPhoBien = (req: Request, res: Response) => {
  const diemDenCount: Record<string, number> = {};
  lichTrinhData.forEach((plan) => {
    plan.ngay.forEach((day) => {
      day.diemDenIds.forEach((id) => {
        diemDenCount[id] = (diemDenCount[id] || 0) + 1;
      });
    });
  });

  const data = Object.keys(diemDenCount)
    .map((id) => ({
      diemDenId: id,
      ten: findDiemDen(id)?.ten || 'Không xác định',
      soLuotChon: diemDenCount[id],
    }))
    .sort((a, b) => b.soLuotChon - a.soLuotChon);

  return res.json({ data, success: true });
};

export default {
  'GET /api/du-lich/diem-den/page': getDiemDenPage,
  'GET /api/du-lich/diem-den/many': getDiemDenMany,
  'GET /api/du-lich/diem-den/:id': getDiemDenById,
  'POST /api/du-lich/diem-den': createDiemDen,
  'PUT /api/du-lich/diem-den/:id': updateDiemDen,
  'PUT /api/du-lich/diem-den/many/ids': updateDiemDenMany,
  'DELETE /api/du-lich/diem-den/:id': deleteDiemDen,
  'DELETE /api/du-lich/diem-den/many/ids': deleteDiemDenMany,

  'GET /api/du-lich/lich-trinh/page': getLichTrinhPage,
  'GET /api/du-lich/lich-trinh/many': getLichTrinhMany,
  'GET /api/du-lich/lich-trinh/:id': getLichTrinhById,
  'POST /api/du-lich/lich-trinh': createLichTrinh,
  'PUT /api/du-lich/lich-trinh/:id': updateLichTrinh,
  'DELETE /api/du-lich/lich-trinh/:id': deleteLichTrinh,
  'PUT /api/du-lich/lich-trinh/:id/sap-xep': sapXepDiemDen,
  'GET /api/du-lich/lich-trinh/:id/ngan-sach': getNganSach,
  'PUT /api/du-lich/lich-trinh/:id/ngan-sach': updateNganSach,

  'GET /api/du-lich/thong-ke/tong-quan': thongKeTongQuan,
  'GET /api/du-lich/thong-ke/lich-trinh-theo-thang': thongKeLichTrinhTheoThang,
  'GET /api/du-lich/thong-ke/chi-tieu-theo-hang-muc': thongKeChiTieuTheoHangMuc,
  'GET /api/du-lich/thong-ke/diem-den-pho-bien': thongKeDiemDenPhoBien,
};

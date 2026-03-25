import { Request, Response } from 'express';

type TCauLacBo = {
  _id: string;
  anhDaiDien?: string;
  tenCLB: string;
  ngayThanhLap: string;
  moTa: string;
  chuNhiem: string;
  hoatDong: boolean;
  createdAt: string;
  updatedAt: string;
};

type THanhDong = 'Approved' | 'Rejected';

type TLichSuThaoTac = {
  hanhDong: THanhDong;
  thoiGian: string;
  nguoiThucHien: string;
  lyDo?: string;
};

type TDonDangKy = {
  _id: string;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: 'Nam' | 'Nu' | 'Khac';
  diaChi: string;
  soTruong: string;
  cauLacBoId: string;
  lyDoDangKy: string;
  trangThai: 'Pending' | 'Approved' | 'Rejected';
  ghiChu?: string;
  lichSu: TLichSuThaoTac[];
  ngayDangKy: string;
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
let cauLacBoData: TCauLacBo[] = [
  {
    _id: 'clb-001',
    anhDaiDien: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200',
    tenCLB: 'CLB Cong Nghe So',
    ngayThanhLap: '2019-09-10T00:00:00.000Z',
    moTa: '<p>CLB to chuc workshop ve lap trinh web, mobile va AI.</p>',
    chuNhiem: 'Nguyen Quang Huy',
    hoatDong: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'clb-002',
    anhDaiDien: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200',
    tenCLB: 'CLB Truyen Thong',
    ngayThanhLap: '2018-03-24T00:00:00.000Z',
    moTa: '<p>Phu trach su kien, media va noi dung truyen thong cho truong.</p>',
    chuNhiem: 'Tran Minh Thu',
    hoatDong: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'clb-003',
    anhDaiDien: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=200',
    tenCLB: 'CLB Tieng Anh',
    ngayThanhLap: '2020-11-05T00:00:00.000Z',
    moTa: '<p>Ren luyen ky nang giao tiep, thuyet trinh va tranh bien bang tieng Anh.</p>',
    chuNhiem: 'Le Hoang Nam',
    hoatDong: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'clb-004',
    anhDaiDien: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200',
    tenCLB: 'CLB Van Nghe',
    ngayThanhLap: '2017-01-15T00:00:00.000Z',
    moTa: '<p>Hoat dong am nhac, mua va to chuc cac chuong trinh van nghe.</p>',
    chuNhiem: 'Pham Gia Huy',
    hoatDong: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'clb-005',
    anhDaiDien: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200',
    tenCLB: 'CLB Tinh Nguyen',
    ngayThanhLap: '2016-08-20T00:00:00.000Z',
    moTa: '<p>Ket noi sinh vien tham gia cac hoat dong cong dong va tu thien.</p>',
    chuNhiem: 'Vo Nhat Anh',
    hoatDong: true,
    createdAt: now,
    updatedAt: now,
  },
];

const makeHistory = (hanhDong: THanhDong, lyDo?: string): TLichSuThaoTac => ({
  hanhDong,
  thoiGian: new Date().toISOString(),
  nguoiThucHien: 'Admin',
  lyDo,
});

const buildDon = (
  id: string,
  hoTen: string,
  email: string,
  sdt: string,
  gioiTinh: 'Nam' | 'Nu' | 'Khac',
  diaChi: string,
  soTruong: string,
  cauLacBoId: string,
  lyDoDangKy: string,
  trangThai: 'Pending' | 'Approved' | 'Rejected',
  ngayDangKy: string,
  ghiChu?: string,
): TDonDangKy => ({
  _id: id,
  hoTen,
  email,
  sdt,
  gioiTinh,
  diaChi,
  soTruong,
  cauLacBoId,
  lyDoDangKy,
  trangThai,
  ghiChu,
  lichSu: trangThai === 'Pending' ? [] : [makeHistory(trangThai as THanhDong, ghiChu)],
  ngayDangKy,
  createdAt: ngayDangKy,
  updatedAt: ngayDangKy,
});

let donDangKyData: TDonDangKy[] = [
  buildDon(
    'don-001',
    'Nguyen Hai Dang',
    'haidang01@gmail.com',
    '0912233445',
    'Nam',
    'Ha Noi',
    'Lap trinh Backend',
    'clb-001',
    'Muon hoc xay dung API va K8s',
    'Approved',
    '2025-03-01T08:00:00.000Z',
  ),
  buildDon(
    'don-002',
    'Tran Thu Ha',
    'thuhatran@gmail.com',
    '0988555123',
    'Nu',
    'Ha Noi',
    'MC su kien',
    'clb-002',
    'Yeu thich truyen thong va event',
    'Pending',
    '2025-03-02T08:00:00.000Z',
  ),
  buildDon(
    'don-003',
    'Le Minh Duc',
    'ducle@gmail.com',
    '0977666123',
    'Nam',
    'Hai Duong',
    'Thiet ke poster',
    'clb-002',
    'Muon tham gia team media',
    'Rejected',
    '2025-03-03T08:00:00.000Z',
    'Chua phu hop khung thoi gian',
  ),
  buildDon(
    'don-004',
    'Pham Quynh Anh',
    'quynhanh@gmail.com',
    '0966333444',
    'Nu',
    'Nam Dinh',
    'Tieng Anh giao tiep',
    'clb-003',
    'Can moi truong luyen noi tieng Anh',
    'Approved',
    '2025-03-04T08:00:00.000Z',
  ),
  buildDon(
    'don-005',
    'Vu Hoang Linh',
    'linhvu@gmail.com',
    '0911002200',
    'Nam',
    'Thai Binh',
    'Hat',
    'clb-004',
    'Muon tham gia doi van nghe',
    'Pending',
    '2025-03-05T08:00:00.000Z',
  ),
  buildDon(
    'don-006',
    'Do Thanh Tam',
    'tamdo@gmail.com',
    '0933444555',
    'Nu',
    'Bac Ninh',
    'To chuc chuong trinh',
    'clb-005',
    'Muon dong hanh cung cac su kien cong dong',
    'Approved',
    '2025-03-06T08:00:00.000Z',
  ),
  buildDon(
    'don-007',
    'Nguyen Tuan Kiet',
    'kietnguyen@gmail.com',
    '0977002200',
    'Nam',
    'Ha Noi',
    'Lap trinh Frontend',
    'clb-001',
    'Muon tham gia team React',
    'Pending',
    '2025-03-07T08:00:00.000Z',
  ),
  buildDon(
    'don-008',
    'Le Mai Huong',
    'huongle@gmail.com',
    '0944556677',
    'Nu',
    'Hai Phong',
    'Giao tiep',
    'clb-003',
    'Yeu thich giao luu quoc te',
    'Approved',
    '2025-03-08T08:00:00.000Z',
  ),
  buildDon(
    'don-009',
    'Bui Gia Bao',
    'baobui@gmail.com',
    '0919002200',
    'Nam',
    'Ninh Binh',
    'Quay dung video',
    'clb-002',
    'Muon hoc dung phim cho su kien',
    'Rejected',
    '2025-03-09T08:00:00.000Z',
    'Thong tin ho so chua day du',
  ),
  buildDon(
    'don-010',
    'Ngo Thu Trang',
    'trangngo@gmail.com',
    '0922888111',
    'Nu',
    'Ha Noi',
    'To chuc tro choi',
    'clb-005',
    'Muon tham gia hoat dong tinh nguyen',
    'Pending',
    '2025-03-10T08:00:00.000Z',
  ),
  buildDon(
    'don-011',
    'Phan Cong Minh',
    'minhphan@gmail.com',
    '0988777666',
    'Nam',
    'Nghe An',
    'Thuyet trinh',
    'clb-003',
    'Muon cai thien IELTS speaking',
    'Approved',
    '2025-03-11T08:00:00.000Z',
  ),
  buildDon(
    'don-012',
    'Tran Duc Long',
    'longtran@gmail.com',
    '0962555777',
    'Nam',
    'Thanh Hoa',
    'Nhiep anh',
    'clb-002',
    'Yeu thich chup anh su kien',
    'Pending',
    '2025-03-12T08:00:00.000Z',
  ),
  buildDon(
    'don-013',
    'Nguyen Hong Nhung',
    'nhungnguyen@gmail.com',
    '0912333666',
    'Nu',
    'Ha Noi',
    'To chuc workshop',
    'clb-001',
    'Muon ho tro workshop cong nghe',
    'Approved',
    '2025-03-13T08:00:00.000Z',
  ),
  buildDon(
    'don-014',
    'Dang Manh Quan',
    'quandang@gmail.com',
    '0912666999',
    'Nam',
    'Ha Nam',
    'Am thanh anh sang',
    'clb-004',
    'Muon ho tro ky thuat su kien',
    'Rejected',
    '2025-03-14T08:00:00.000Z',
    'CLB hien tam dung tiep nhan',
  ),
  buildDon(
    'don-015',
    'Do Thi Lan Anh',
    'lananhdo@gmail.com',
    '0944222333',
    'Nu',
    'Thai Nguyen',
    'To chuc team building',
    'clb-005',
    'Muon tham gia cong tac xa hoi',
    'Pending',
    '2025-03-15T08:00:00.000Z',
  ),
  buildDon(
    'don-016',
    'Nguyen Van Son',
    'sonnguyen@gmail.com',
    '0933111000',
    'Nam',
    'Quang Ninh',
    'Phat bieu truoc dam dong',
    'clb-003',
    'Muon luyen debate tieng Anh',
    'Approved',
    '2025-03-16T08:00:00.000Z',
  ),
  buildDon(
    'don-017',
    'Pham Thanh Truc',
    'trucpham@gmail.com',
    '0922111333',
    'Nu',
    'Bac Giang',
    'Noi dung social',
    'clb-002',
    'Muon hoc content marketing',
    'Pending',
    '2025-03-17T08:00:00.000Z',
  ),
  buildDon(
    'don-018',
    'Le Duc Anh',
    'anhle@gmail.com',
    '0909555444',
    'Nam',
    'Ha Noi',
    'Node.js',
    'clb-001',
    'Muon thuc chien du an backend',
    'Approved',
    '2025-03-18T08:00:00.000Z',
  ),
];

const getFieldValue = (record: Record<string, any>, field?: string | string[]) => {
  if (!field) return undefined;
  if (Array.isArray(field)) {
    return field.reduce((acc: any, key) => (acc ? acc[key] : undefined), record);
  }
  return record[field];
};

const normalizeBoolean = (value: any): boolean | undefined => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
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

const applyCondition = (data: TCauLacBo[], rawCondition: any): TCauLacBo[] => {
  const condition = parseCondition(rawCondition);
  const keys = Object.keys(condition || {});
  if (!keys.length) return data;

  return data.filter((item) => {
    return keys.every((key) => {
      const conditionValue = condition[key];
      if (conditionValue === undefined || conditionValue === null || conditionValue === '') return true;

      if (key === 'hoatDong') {
        const boolCond = normalizeBoolean(conditionValue);
        return boolCond === undefined ? true : item.hoatDong === boolCond;
      }

      const itemValue = (item as any)[key];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }
      return itemValue === conditionValue;
    });
  });
};

const applyFilters = (data: TCauLacBo[], filters: TFilter[]): TCauLacBo[] => {
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
        if (typeof recordValue === 'boolean') {
          return values.some((value) => normalizeBoolean(value) === recordValue);
        }

        return values.map((value) => String(value)).includes(String(recordValue ?? ''));
      }

      return true;
    });
  });
};

const applySort = (data: TCauLacBo[], rawSort: any): TCauLacBo[] => {
  const sort = parseSort(rawSort);
  if (!sort || typeof sort !== 'object') return data;

  const sortKeys = Object.keys(sort);
  if (!sortKeys.length) return data;

  const field = sortKeys[0];
  const direction = Number(sort[field]) || 1;

  return [...data].sort((a: any, b: any) => {
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

const applyConditionAny = <T extends Record<string, any>>(data: T[], rawCondition: any): T[] => {
  const condition = parseCondition(rawCondition);
  const keys = Object.keys(condition || {});
  if (!keys.length) return data;

  return data.filter((item) =>
    keys.every((key) => {
      const conditionValue = condition[key];
      if (conditionValue === undefined || conditionValue === null || conditionValue === '') return true;

      const itemValue = item[key];
      if (typeof itemValue === 'boolean') {
        const boolCond = normalizeBoolean(conditionValue);
        return boolCond === undefined ? true : itemValue === boolCond;
      }

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
        if (typeof recordValue === 'boolean') {
          return values.some((value) => normalizeBoolean(value) === recordValue);
        }
        return values.map((value) => String(value)).includes(String(recordValue ?? ''));
      }

      return true;
    });
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

const getPageData = (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const dataAfterCondition = applyCondition(cauLacBoData, req.query?.condition);
  const dataAfterFilter = applyFilters(dataAfterCondition, parseFilters(req.query?.filters));
  const sortedData = applySort(dataAfterFilter, req.query?.sort);

  const start = (page - 1) * limit;
  const end = start + limit;
  const result = sortedData.slice(start, end);

  res.json({
    data: {
      result,
      total: sortedData.length,
      page,
      limit,
    },
    success: true,
  });
};

const getMany = (req: Request, res: Response) => {
  const dataAfterCondition = applyCondition(cauLacBoData, req.query?.condition);
  const sortedData = applySort(dataAfterCondition, req.query?.sort);

  res.json({
    data: sortedData,
    success: true,
  });
};

const getById = (req: Request, res: Response) => {
  const record = cauLacBoData.find((item) => item._id === req.params.id);

  if (!record) {
    return res.status(404).json({
      message: 'Khong tim thay CLB',
      success: false,
    });
  }

  return res.json({ data: record, success: true });
};

const createOne = (req: Request, res: Response) => {
  const payload = req.body || {};
  const id = `clb-${Date.now()}`;
  const currentTime = new Date().toISOString();

  const newRecord: TCauLacBo = {
    _id: id,
    anhDaiDien: payload.anhDaiDien || '',
    tenCLB: payload.tenCLB || '',
    ngayThanhLap: payload.ngayThanhLap || currentTime,
    moTa: payload.moTa || '',
    chuNhiem: payload.chuNhiem || '',
    hoatDong: payload.hoatDong !== false,
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  cauLacBoData = [newRecord, ...cauLacBoData];

  return res.status(201).json({ data: newRecord, success: true });
};

const updateOne = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updatedRecord: TCauLacBo | undefined;

  cauLacBoData = cauLacBoData.map((item) => {
    if (item._id !== id) return item;

    const parsedHoatDong = normalizeBoolean(payload.hoatDong);
    const nextRecord: TCauLacBo = {
      ...item,
      ...payload,
      hoatDong: parsedHoatDong === undefined ? item.hoatDong : parsedHoatDong,
      updatedAt: new Date().toISOString(),
    };

    updatedRecord = nextRecord;

    return nextRecord;
  });

  if (!updatedRecord) {
    return res.status(404).json({ message: 'Khong tim thay CLB', success: false });
  }

  return res.json({ data: updatedRecord, success: true });
};

const updateMany = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  const update = req.body?.update || {};
  const nowTime = new Date().toISOString();

  cauLacBoData = cauLacBoData.map((item) => {
    if (!ids.includes(item._id)) return item;
    return {
      ...item,
      ...update,
      updatedAt: nowTime,
    };
  });

  const updated = cauLacBoData.filter((item) => ids.includes(item._id));
  return res.json({ data: updated, success: true });
};

const deleteOne = (req: Request, res: Response) => {
  const oldLength = cauLacBoData.length;
  cauLacBoData = cauLacBoData.filter((item) => item._id !== req.params.id);

  if (cauLacBoData.length === oldLength) {
    return res.status(404).json({ message: 'Khong tim thay CLB', success: false });
  }

  return res.json({ data: true, success: true });
};

const deleteMany = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  cauLacBoData = cauLacBoData.filter((item) => !ids.includes(item._id));

  return res.json({ data: true, success: true });
};

const getDonDangKyPage = (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const dataAfterCondition = applyConditionAny(donDangKyData, req.query?.condition);
  const dataAfterFilter = applyFiltersAny(dataAfterCondition, parseFilters(req.query?.filters));
  const sorted = applySortAny(dataAfterFilter, req.query?.sort);

  return res.json({ data: pagedResult(sorted, page, limit), success: true });
};

const createDonDangKy = (req: Request, res: Response) => {
  const payload = req.body || {};
  const nowTime = new Date().toISOString();
  const newRecord: TDonDangKy = {
    _id: `don-${Date.now()}`,
    hoTen: payload.hoTen || '',
    email: payload.email || '',
    sdt: payload.sdt || '',
    gioiTinh: payload.gioiTinh || 'Nam',
    diaChi: payload.diaChi || '',
    soTruong: payload.soTruong || '',
    cauLacBoId: payload.cauLacBoId || '',
    lyDoDangKy: payload.lyDoDangKy || '',
    trangThai: payload.trangThai || 'Pending',
    ghiChu: payload.ghiChu,
    lichSu: [],
    ngayDangKy: payload.ngayDangKy || nowTime,
    createdAt: nowTime,
    updatedAt: nowTime,
  };

  donDangKyData = [newRecord, ...donDangKyData];
  return res.status(201).json({ data: newRecord, success: true });
};

const updateDonDangKy = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body || {};
  let updated: TDonDangKy | undefined;

  donDangKyData = donDangKyData.map((item) => {
    if (item._id !== id) return item;

    const nextRecord: TDonDangKy = {
      ...item,
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    updated = nextRecord;
    return nextRecord;
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Khong tim thay don dang ky' });
  }
  return res.json({ data: updated, success: true });
};

const deleteDonDangKy = (req: Request, res: Response) => {
  const oldLength = donDangKyData.length;
  donDangKyData = donDangKyData.filter((item) => item._id !== req.params.id);
  if (oldLength === donDangKyData.length) {
    return res.status(404).json({ success: false, message: 'Khong tim thay don dang ky' });
  }
  return res.json({ data: true, success: true });
};

const duyetDonDangKy = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  const hanhDong: THanhDong = req.body?.hanhDong;
  const lyDo: string | undefined = req.body?.lyDo;
  if (!ids.length || !hanhDong) {
    return res.status(400).json({ success: false, message: 'Du lieu duyet khong hop le' });
  }

  const targetStatus = hanhDong === 'Approved' ? 'Approved' : 'Rejected';

  donDangKyData = donDangKyData.map((item) => {
    if (!ids.includes(item._id)) return item;

    return {
      ...item,
      trangThai: targetStatus,
      ghiChu: targetStatus === 'Rejected' ? lyDo || item.ghiChu || '' : undefined,
      lichSu: [...(item.lichSu || []), makeHistory(hanhDong, lyDo)],
      updatedAt: new Date().toISOString(),
    };
  });

  return res.json({
    data: donDangKyData.filter((item) => ids.includes(item._id)),
    success: true,
  });
};

const getLichSuDon = (req: Request, res: Response) => {
  const don = donDangKyData.find((item) => item._id === req.params.id);
  if (!don) {
    return res.status(404).json({ success: false, message: 'Khong tim thay don dang ky' });
  }
  return res.json({ data: don.lichSu || [], success: true });
};

const getThanhVienPage = (req: Request, res: Response) => {
  const page = Number(req.query?.page || 1);
  const limit = Number(req.query?.limit || 10);

  const approvedData = donDangKyData.filter((item) => item.trangThai === 'Approved');
  const dataAfterCondition = applyConditionAny(approvedData, req.query?.condition);
  const dataAfterFilter = applyFiltersAny(dataAfterCondition, parseFilters(req.query?.filters));
  const sorted = applySortAny(dataAfterFilter, req.query?.sort);

  return res.json({ data: pagedResult(sorted, page, limit), success: true });
};

const chuyenCLBThanhVien = (req: Request, res: Response) => {
  const ids: string[] = req.body?.ids || [];
  const cauLacBoIdMoi: string = req.body?.cauLacBoIdMoi;
  if (!ids.length || !cauLacBoIdMoi) {
    return res.status(400).json({ success: false, message: 'Du lieu chuyen CLB khong hop le' });
  }

  donDangKyData = donDangKyData.map((item) => {
    if (!ids.includes(item._id) || item.trangThai !== 'Approved') return item;
    return {
      ...item,
      cauLacBoId: cauLacBoIdMoi,
      updatedAt: new Date().toISOString(),
    };
  });

  return res.json({ data: true, success: true });
};

const thongKeTongQuan = (req: Request, res: Response) => {
  const pending = donDangKyData.filter((item) => item.trangThai === 'Pending').length;
  const approved = donDangKyData.filter((item) => item.trangThai === 'Approved').length;
  const rejected = donDangKyData.filter((item) => item.trangThai === 'Rejected').length;

  return res.json({
    data: {
      tongCLB: cauLacBoData.length,
      pending,
      approved,
      rejected,
    },
    success: true,
  });
};

const thongKeDonTheoCLB = (req: Request, res: Response) => {
  const data = cauLacBoData.map((clb) => {
    const donTheoCLB = donDangKyData.filter((don) => don.cauLacBoId === clb._id);
    return {
      cauLacBoId: clb._id,
      tenCLB: clb.tenCLB,
      pending: donTheoCLB.filter((item) => item.trangThai === 'Pending').length,
      approved: donTheoCLB.filter((item) => item.trangThai === 'Approved').length,
      rejected: donTheoCLB.filter((item) => item.trangThai === 'Rejected').length,
    };
  });

  return res.json({ data, success: true });
};

export default {
  'GET /api/cau-lac-bo/page': getPageData,
  'GET /api/cau-lac-bo/many': getMany,
  'GET /api/cau-lac-bo/:id': getById,
  'POST /api/cau-lac-bo': createOne,
  'PUT /api/cau-lac-bo/:id': updateOne,
  'PUT /api/cau-lac-bo/many/ids': updateMany,
  'DELETE /api/cau-lac-bo/:id': deleteOne,
  'DELETE /api/cau-lac-bo/many/ids': deleteMany,

  'GET /api/don-dang-ky/page': getDonDangKyPage,
  'POST /api/don-dang-ky': createDonDangKy,
  'PUT /api/don-dang-ky/:id': updateDonDangKy,
  'DELETE /api/don-dang-ky/:id': deleteDonDangKy,
  'PUT /api/don-dang-ky/duyet': duyetDonDangKy,
  'GET /api/don-dang-ky/:id/lich-su': getLichSuDon,

  'GET /api/thanh-vien/page': getThanhVienPage,
  'PUT /api/thanh-vien/chuyen-clb': chuyenCLBThanhVien,

  'GET /api/thong-ke/tong-quan': thongKeTongQuan,
  'GET /api/thong-ke/don-theo-clb': thongKeDonTheoCLB,
};

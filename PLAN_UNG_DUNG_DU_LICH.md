# Plan: Ung dung lap ke hoach du lich

## Tong quan

Xay dung module **Ung dung du lich** gom 4 nhom chuc nang: Kham pha diem den, Lich trinh, Ngan sach, va Admin (Quan ly diem den + Thong ke). Tuan thu kien truc UmiJS hien co (useInitModel, TableBase, mock API).

---

## 1. Cau truc thu muc

```
src/
├── pages/KeHoachDuLich/
│   ├── typing.d.ts                          # Interfaces chung
│   ├── KhamPha/
│   │   ├── index.tsx                        # Trang kham pha diem den (Card grid + filter)
│   │   └── FilterBar.tsx                    # Bo loc/sap xep
│   ├── LichTrinh/
│   │   ├── index.tsx                        # Trang lap lich trinh theo ngay
│   │   ├── DayColumn.tsx                    # Cot tung ngay, sap xep diem den
│   │   └── AddDiemDenDrawer.tsx             # Chon diem den tu danh sach
│   ├── NganSach/
│   │   └── index.tsx                        # Trang quan ly ngan sach + bieu do
│   └── Admin/
│       ├── DiemDen/
│       │   ├── index.tsx                    # Trang quan ly diem den (TableBase)
│       │   └── FormDiemDen.tsx              # Form them/sua diem den
│       └── ThongKe/
│           └── index.tsx                    # Trang thong ke (cards + charts)
│
├── models/kehoachdulich/
│   ├── diemDen.ts                           # useInitModel<DiemDen>('api/du-lich/diem-den')
│   ├── lichTrinh.ts                         # useInitModel<LichTrinh>('api/du-lich/lich-trinh') + sapXep
│   ├── nganSach.ts                          # Tinh toan ngan sach tu lich trinh
│   └── thongKe.ts                           # Lay so lieu thong ke
│
mock/
└── KeHoachDuLich/
    └── KeHoachDuLich.ts                     # Mock APIs cho diem den, lich trinh, ngan sach, thong ke
│
config/
└── routes.ts                                # Them routes moi
```

---

## 2. Interfaces (`typing.d.ts`)

```typescript
export type LoaiHinh = 'Bien' | 'Nui' | 'ThanhPho';

export interface DiemDen {
  _id?: string;
  id: string;
  ten: string;
  diaDiem: string;
  loaiHinh: LoaiHinh;
  anhDaiDien?: string;        // URL anh
  rating: number;             // 1-5
  moTa: string;               // Text/HTML
  thoiGianThamQuan: number;   // minutes
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
  giaDuKien?: number;         // tong chi phi
}

export interface LichTrinhNgay {
  ngay: string;               // ISO date
  diemDenIds: string[];       // Thu tu diem den trong ngay
  tongChiPhi: number;
  tongThoiGianDiChuyen: number; // minutes
}

export interface LichTrinh {
  _id?: string;
  id: string;
  ten: string;
  ngayBatDau: string;         // ISO date
  ngayKetThuc: string;        // ISO date
  ngay: LichTrinhNgay[];
  tongNganSach: number;
}

export interface PhanBoNganSach {
  anUong: number;
  diChuyen: number;
  luuTru: number;
  khac?: number;
}

export interface NganSachSummary {
  tongNganSach: number;
  daSuDung: number;
  conLai: number;
  phanBo: PhanBoNganSach;
  vuotNganSach: boolean;
}

export interface ThongKeTheoThang {
  thang: string;              // YYYY-MM
  soLichTrinh: number;
  doanhThu: number;
}

export interface DiemDenPhoBien {
  diemDenId: string;
  ten: string;
  soLuotChon: number;
}

export interface ThongKeTongQuan {
  soLichTrinh: number;
  doanhThu: number;
  diemDenPhoBien: DiemDenPhoBien[];
  chiTieuTheoHangMuc: PhanBoNganSach;
}
```

---

## 3. Mock API (`mock/KeHoachDuLich/KeHoachDuLich.ts`)

### Endpoints:

| Method | URL | Mo ta |
|--------|-----|------|
| GET | `/api/du-lich/diem-den/page` | Danh sach diem den (filter, sort) |
| GET | `/api/du-lich/diem-den/many` | Tat ca diem den (cho Select) |
| POST | `/api/du-lich/diem-den` | Them diem den |
| PUT | `/api/du-lich/diem-den/:id` | Sua diem den |
| DELETE | `/api/du-lich/diem-den/:id` | Xoa diem den |
| GET | `/api/du-lich/lich-trinh/page` | Danh sach lich trinh |
| GET | `/api/du-lich/lich-trinh/:id` | Chi tiet lich trinh |
| POST | `/api/du-lich/lich-trinh` | Tao lich trinh |
| PUT | `/api/du-lich/lich-trinh/:id` | Cap nhat lich trinh |
| DELETE | `/api/du-lich/lich-trinh/:id` | Xoa lich trinh |
| PUT | `/api/du-lich/lich-trinh/:id/sap-xep` | Cap nhat thu tu diem den (body: { ngay, diemDenIds }) |
| GET | `/api/du-lich/lich-trinh/:id/ngan-sach` | Tong hop ngan sach |
| PUT | `/api/du-lich/lich-trinh/:id/ngan-sach` | Cap nhat tong ngan sach/phan bo |
| GET | `/api/du-lich/thong-ke/tong-quan` | So lich trinh, doanh thu, diem den pho bien |
| GET | `/api/du-lich/thong-ke/lich-trinh-theo-thang` | Lich trinh theo thang |
| GET | `/api/du-lich/thong-ke/chi-tieu-theo-hang-muc` | Chi tieu theo hang muc |
| GET | `/api/du-lich/thong-ke/diem-den-pho-bien` | Top diem den pho bien |

**Mock data:** 10-12 diem den mau, 3-5 lich trinh mau, du lieu thong ke duoc tinh tu lich trinh.

---

## 4. Models

### `models/kehoachdulich/diemDen.ts`

```typescript
// Simple wrapper dung useInitModel
export default () => useInitModel<DiemDen>('api/du-lich/diem-den', undefined, undefined, '');
```

### `models/kehoachdulich/lichTrinh.ts`

```typescript
// useInitModel + custom methods: sapXepDiemDen, tinhNganSach
export default () => {
  const initModel = useInitModel<LichTrinh>('api/du-lich/lich-trinh', undefined, undefined, '');
  // Them state & methods cho sap xep va tinh toan
  return { ...initModel, sapXepDiemDen, tinhNganSach };
};
```

### `models/kehoachdulich/nganSach.ts`

```typescript
// Tinh toan ngan sach tu lich trinh, tai su dung cho trang NganSach
```

### `models/kehoachdulich/thongKe.ts`

```typescript
// Wrapper goi API thong ke
```

---

## 5. Chi tiet tung trang

### 5.1. Kham pha diem den (`KhamPha/index.tsx`)

- Hien thi card grid: anh, ten, dia diem, rating, tag loai hinh.
- Bo loc/bo sap xep: loai hinh, gia du kien, rating.
- Hanh dong: xem chi tiet, them vao lich trinh.

**FilterBar.tsx:**

- Select loai hinh
- Slider khoang gia
- Rate filter
- Sort by rating/gia

### 5.2. Tao lich trinh (`LichTrinh/index.tsx`)

- Chon khoang ngay cho lich trinh.
- Tung ngay la mot cot (DayColumn) chua danh sach diem den.
- Ho tro them/xoa/sap xep diem den theo thu tu.
- Tong hop nhanh: tong chi phi, tong thoi gian di chuyen.

**DayColumn.tsx:**

- Hien thi danh sach diem den trong ngay
- Nut len/xuong hoac drag-drop de sap xep

**AddDiemDenDrawer.tsx:**

- Tim kiem/chon diem den tu danh sach
- Them vao ngay duoc chon

### 5.3. Quan ly ngan sach (`NganSach/index.tsx`)

- Hien thi tong ngan sach, da su dung, con lai.
- Bieu do phan bo theo hang muc (an uong, di chuyen, luu tru, khac).
- Canh bao vuot ngan sach bang Alert/Tag ro rang.
- Cho phep cap nhat tong ngan sach/phan bo (neu can).

### 5.4. Admin - Quan ly diem den (`Admin/DiemDen/index.tsx`)

**Columns:**

| Cot | dataIndex | width | filterType | sortable |
|-----|-----------|-------|------------|----------|
| Anh | anhDaiDien | 100 | - | - |
| Ten | ten | 200 | string | ✓ |
| Dia diem | diaDiem | 200 | string | ✓ |
| Loai hinh | loaiHinh | 140 | select | - |
| Rating | rating | 120 | number | ✓ |
| Chi phi du kien | giaDuKien | 160 | number | ✓ |
| Thao tac | - | 200 | - | - |

**FormDiemDen.tsx:**

- Upload anh dai dien
- Input: ten, dia diem
- Select: loai hinh
- Rate: rating
- Input number: thoi gian tham quan, chi phi an uong, luu tru, di chuyen
- Textarea/Editor: mo ta

### 5.5. Admin - Thong ke (`Admin/ThongKe/index.tsx`)

- Cards tong quan: so lich trinh, doanh thu.
- Chart 1: so lich trinh theo thang (column chart).
- Chart 2: chi tieu theo hang muc (pie/donut).
- Chart 3: top diem den pho bien (bar chart).

---

## 6. Routes (`config/routes.ts`)

```typescript
{
  path: '/du-lich',
  name: 'Ung dung du lich',
  icon: 'CompassOutlined',
  routes: [
    {
      name: 'Kham pha',
      path: '/du-lich/kham-pha',
      component: './KeHoachDuLich/KhamPha',
    },
    {
      name: 'Lich trinh',
      path: '/du-lich/lich-trinh',
      component: './KeHoachDuLich/LichTrinh',
    },
    {
      name: 'Ngan sach',
      path: '/du-lich/ngan-sach',
      component: './KeHoachDuLich/NganSach',
    },
    {
      name: 'Admin - Diem den',
      path: '/du-lich/admin/diem-den',
      component: './KeHoachDuLich/Admin/DiemDen',
    },
    {
      name: 'Admin - Thong ke',
      path: '/du-lich/admin/thong-ke',
      component: './KeHoachDuLich/Admin/ThongKe',
    },
  ],
}
```

---

## 7. Thu tu trien khai

| Buoc | Noi dung | Files |
|------|----------|-------|
| 1 | Tao interfaces (`typing.d.ts`) | `src/pages/KeHoachDuLich/typing.d.ts` |
| 2 | Tao mock API va data mau | `mock/KeHoachDuLich/KeHoachDuLich.ts` |
| 3 | Tao models (4 files) | `src/models/kehoachdulich/*.ts` |
| 4 | Them routes | `config/routes.ts` |
| 5 | Trang Kham pha + FilterBar | `src/pages/KeHoachDuLich/KhamPha/*` |
| 6 | Trang Lich trinh + Drawer/DayColumn | `src/pages/KeHoachDuLich/LichTrinh/*` |
| 7 | Trang Ngan sach | `src/pages/KeHoachDuLich/NganSach/*` |
| 8 | Trang Admin Diem den + Form | `src/pages/KeHoachDuLich/Admin/DiemDen/*` |
| 9 | Trang Admin Thong ke | `src/pages/KeHoachDuLich/Admin/ThongKe/*` |

---

## 8. Nguyen tac ky thuat

- **Tai su dung:** TableBase, useInitModel, chart components
- **Antd components:** Card, Form, Modal, Drawer, Select, DatePicker, Rate, Slider, Upload, Table, Alert, Statistic, Tag, Row, Col, Button, Space
- **Khong dung:** Tailwind CSS, Antd List
- **Filter/Sort:** Dung `filterType` va `sortable` tren IColumn
- **State lien ket:** Cap nhat lich trinh -> tu dong cap nhat ngan sach va thong ke
- **Trai nghiem:** Uu tien thao tac nhanh (them/xoa/sap xep) va hien thi ro rang

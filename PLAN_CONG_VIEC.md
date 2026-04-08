# Plan: Ung dung quan ly cong viec nhom

## Tong quan

Xay dung module **Quan ly Cong viec Nhom** gom 6 nhom chuc nang: Dang nhap/Dang xuat, Phan quyen theo vai tro, Quan ly danh sach cong viec, Bo loc + Tim kiem, Cong viec cua toi + Calendar, va Thong ke. Tuan thu kien truc UmiJS hien co (useInitModel, TableBase, mock API, localStorage/sessionStorage).

Phan quyen theo README:
- Vai tro `admin`: xem duoc Danh sach cong viec va Thong ke.
- Vai tro `nhanvien`: chi xem duoc Lich cong viec va Cong viec cua toi.

---

## 1. Cau truc thu muc

```text
src/
├── pages/QuanLyCongViec/
│   ├── typing.d.ts                          # Interfaces chung
│   ├── DangNhap/
│   │   └── index.tsx                        # Dang nhap/dang xuat + hien thi nguoi dung hien tai
│   ├── DanhSach/
│   │   ├── index.tsx                        # Danh sach cong viec (Table + CRUD, chi admin)
│   │   ├── CongViecFormModal.tsx            # Form them/sua cong viec
│   │   └── BoLocCongViec.tsx                # Loc theo trang thai/nguoi duoc giao + tim kiem
│   ├── CongViecCuaToi/
│   │   └── index.tsx                        # Trang cho nhan vien xem cong viec duoc giao
│   ├── components/
│   │   └── MyTaskPanel.tsx                  # Component cong viec cua nguoi dung hien tai (tai su dung)
│   ├── Lich/
│   │   └── index.tsx                        # Hien thi cong viec tren calendar (react-big-calendar)
│   └── ThongKe/
│       └── index.tsx                        # Tong so cong viec, so da hoan thanh, ti le hoan thanh (chi admin)
│
├── models/quanlycongviec/
│   ├── auth.ts                              # Login/logout + role + luu session/local + hash password
│   ├── congViec.ts                          # useInitModel<CongViec>('api/cong-viec') + CRUD + my-tasks
│   ├── lich.ts                              # Mapping cong viec -> calendar events
│   └── thongKe.ts                           # Tong hop so lieu thong ke
│
├── services/QuanLyCongViec/
│   ├── auth.ts                              # API dang nhap/dang xuat/mock wrapper + role
│   └── congViec.ts                          # API danh sach/chi tiet/them/sua/xoa/loc
│
├── utils/
│   └── authHash.ts                          # SHA-256 helper: hash password truoc khi luu
│
├── access.ts                                # Bo sung helper phan quyen cho module cong viec
│
mock/
└── QuanLyCongViec/
    └── QuanLyCongViec.ts                    # Mock APIs cho auth, role, cong viec, thong ke, calendar
│
config/
└── routes.ts                                # Them routes moi + khai bao access theo vai tro
```

---

## 2. Interfaces (`typing.d.ts`)

```typescript
export type MucDoUuTien = 'Thap' | 'TrungBinh' | 'Cao';
export type TrangThaiCongViec = 'ChuaLam' | 'DangLam' | 'DaXong';
export type KieuLuuDangNhap = 'localStorage' | 'sessionStorage';
export type VaiTroNguoiDung = 'admin' | 'nhanvien';

export interface NguoiDungDangNhap {
  username: string;
  passwordHash: string;         // Bat buoc hash truoc khi luu
  role: VaiTroNguoiDung;
  storageType: KieuLuuDangNhap;
  loginAt: string;              // ISO datetime
}

export interface CongViec {
  _id?: string;
  id: string;
  tenCongViec: string;
  nguoiDuocGiao: string;
  mucDoUuTien: MucDoUuTien;
  deadline: string;             // ISO date
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
```

---

## 3. Mock API (`mock/QuanLyCongViec/QuanLyCongViec.ts`)

### Endpoints:

| Method | URL | Mo ta |
|--------|-----|------|
| POST | `/api/cong-viec/auth/login` | Dang nhap (nhan username + passwordHash, tra ve role) |
| POST | `/api/cong-viec/auth/logout` | Dang xuat |
| GET | `/api/cong-viec/auth/me` | Lay nguoi dung hien tai |
| GET | `/api/cong-viec/page` | Danh sach cong viec (ho tro filter + search) |
| GET | `/api/cong-viec/many` | Tat ca cong viec |
| POST | `/api/cong-viec` | Them cong viec |
| PUT | `/api/cong-viec/:id` | Sua cong viec |
| DELETE | `/api/cong-viec/:id` | Xoa cong viec |
| GET | `/api/cong-viec/my-tasks` | Cong viec theo nguoi dung hien tai |
| GET | `/api/cong-viec/calendar` | Du lieu calendar theo deadline |
| GET | `/api/cong-viec/thong-ke/tong-quan` | Tong so cong viec + so da hoan thanh |

**Mock data:**
- 1 tai khoan admin mac dinh: `admin` / `admin123` (luu dang passwordHash)
- 4-6 tai khoan nhan vien mau
- 15-25 cong viec voi du muc do uu tien/trang thai/deadline
- du lieu thong ke tinh tu danh sach cong viec

---

## 4. Models

### `models/quanlycongviec/auth.ts`

```typescript
// Quan ly dang nhap/dang xuat, luu localStorage/sessionStorage
// Bat buoc hash password (SHA-256) truoc khi luu vao localStorage
// Luu role va expose helper phan quyen: isAdmin, isNhanVien
```

### `models/quanlycongviec/congViec.ts`

```typescript
// useInitModel + custom methods: locTheoTrangThai, locTheoNguoiDuocGiao, timTheoTuKhoa
// Them methods cho my-tasks va cap nhat nhanh trang thai
export default () => {
  const initModel = useInitModel<CongViec>('api/cong-viec', undefined, undefined, '');
  return { ...initModel, locTheoTrangThai, locTheoNguoiDuocGiao, timTheoTuKhoa, getMyTasksModel };
};
```

### `models/quanlycongviec/lich.ts`

```typescript
// Mapping danh sach cong viec sang event model cho react-big-calendar
```

### `models/quanlycongviec/thongKe.ts`

```typescript
// Tong hop tong so cong viec, so da xong, ti le hoan thanh
```

---

## 5. Chi tiet tung trang

### 5.1. Dang nhap / Dang xuat (`DangNhap/index.tsx`)

- Form: username + password + lua chon storage type (local/session).
- Hash password bang SHA-256 truoc khi ghi vao storage.
- Khong luu plain text password trong bat ky key nao.
- Hien thi nguoi dung dang dang nhap + role hien tai.
- Co tai khoan admin de test phan quyen:
  - Username: `admin`
  - Password: `admin123`
- Nut dang xuat de xoa session dang nhap.

### 5.2. Danh sach cong viec (`DanhSach/index.tsx`) - chi `admin`

- Hien thi table cong viec voi cac cot: ten, nguoi duoc giao, uu tien, deadline, trang thai, thao tac.
- Hanh dong CRUD: them, sua, xoa.
- Luu danh sach vao localStorage de khoi phuc sau reload.

**CongViecFormModal.tsx:**

- Input: ten cong viec
- Select: nguoi duoc giao
- Select: muc do uu tien
- DatePicker: deadline
- Select: trang thai
- Textarea: mo ta

### 5.3. Bo loc va tim kiem (`BoLocCongViec.tsx`)

- Loc theo trang thai.
- Loc theo nguoi duoc giao.
- Tim kiem theo keyword trong ten cong viec.
- Co nut reset bo loc.

### 5.4. Cong viec cua toi (`CongViecCuaToi/index.tsx` + `MyTaskPanel.tsx`) - cho `nhanvien`

- Hien thi cac cong viec duoc giao cho nguoi dung hien tai.
- Ho tro cap nhat nhanh trang thai (Dang lam / Da xong).
- Day la man hinh nhan vien duoc phep xem ben canh Lich.

### 5.5. Calendar cong viec (`Lich/index.tsx`) - cho `admin` va `nhanvien`

- Dung `react-big-calendar` de hien thi cong viec theo deadline.
- Event title: ten cong viec + nguoi duoc giao.
- Mau sac event theo trang thai hoac muc do uu tien.

### 5.6. Thong ke (`ThongKe/index.tsx`) - chi `admin`

- Card 1: Tong so cong viec.
- Card 2: So cong viec da hoan thanh.
- Card 3: Ti le hoan thanh.
- Bieu do (neu can): phan bo theo trang thai.

### 5.7. Phan quyen truy cap

- `admin` duoc xem: Danh sach cong viec, Thong ke, Lich.
- `nhanvien` chi duoc xem: Lich, Cong viec cua toi.
- `nhanvien` khong duoc xem: Danh sach cong viec, Thong ke.
- Neu truy cap URL khong dung quyen: redirect ve trang hop le (vi du: `/cong-viec/lich`).

---

## 6. Luu tru va bao mat

- Key de xuat:
  - `qlcv_current_user`
  - `qlcv_task_list`
  - `qlcv_auth_users`
- `qlcv_current_user` phai chua `username`, `role`, `storageType`, `loginAt`, `passwordHash`.
- Chi luu `passwordHash`, tuyet doi khong luu password dang plain text.
- Hash password bang SHA-256 (Web Crypto API hoac `crypto-js`).
- Khi dang xuat, xoa key dang nhap cua phien hien tai.

---

## 7. Routes (`config/routes.ts`)

```typescript
{
  path: '/cong-viec',
  name: 'Quan ly cong viec',
  icon: 'ProfileOutlined',
  routes: [
    {
      name: 'Dang nhap',
      path: '/cong-viec/dang-nhap',
      component: './QuanLyCongViec/DangNhap',
    },
    {
      name: 'Danh sach',
      path: '/cong-viec/danh-sach',
      component: './QuanLyCongViec/DanhSach',
      access: 'qlcvAdmin',
    },
    {
      name: 'Cong viec cua toi',
      path: '/cong-viec/cua-toi',
      component: './QuanLyCongViec/CongViecCuaToi',
      access: 'qlcvNhanVien',
    },
    {
      name: 'Lich',
      path: '/cong-viec/lich',
      component: './QuanLyCongViec/Lich',
      access: 'qlcvNhanVienOrAdmin',
    },
    {
      name: 'Thong ke',
      path: '/cong-viec/thong-ke',
      component: './QuanLyCongViec/ThongKe',
      access: 'qlcvAdmin',
    },
  ],
}
```

Ghi chu: Neu khong dung access plugin thi can guard trong page/layout de chan route trai quyen.

---

## 8. Thu tu trien khai

| Buoc | Noi dung | Files |
|------|----------|-------|
| 1 | Tao interfaces (`typing.d.ts`) + bo sung role | `src/pages/QuanLyCongViec/typing.d.ts` |
| 2 | Tao helper hash mat khau | `src/utils/authHash.ts` |
| 3 | Tao mock API + du lieu mau (co tai khoan admin) | `mock/QuanLyCongViec/QuanLyCongViec.ts` |
| 4 | Tao services auth + cong viec | `src/services/QuanLyCongViec/*.ts` |
| 5 | Tao models (auth, congViec, lich, thongKe) | `src/models/quanlycongviec/*.ts` |
| 6 | Bo sung access helper cho qlcvAdmin/qlcvNhanVien | `src/access.ts` |
| 7 | Them routes co phan quyen | `config/routes.ts` |
| 8 | Trang DangNhap | `src/pages/QuanLyCongViec/DangNhap/index.tsx` |
| 9 | Trang DanhSach + Form + BoLoc (chi admin) | `src/pages/QuanLyCongViec/DanhSach/*` |
| 10 | Trang CongViecCuaToi (nhan vien) | `src/pages/QuanLyCongViec/CongViecCuaToi/index.tsx` |
| 11 | Trang Lich (admin + nhan vien) | `src/pages/QuanLyCongViec/Lich/index.tsx` |
| 12 | Trang ThongKe (chi admin) | `src/pages/QuanLyCongViec/ThongKe/index.tsx` |
| 13 | Kiem thu luu tru, hash password, CRUD, filter, calendar, thong ke, phan quyen | Toan module |

---

## 9. Nguyen tac ky thuat

- **Tai su dung:** useInitModel, TableBase, components chart co san.
- **Antd components:** Form, Input, Select, DatePicker, Modal, Table, Tag, Card, Statistic, Button, Space, Alert.
- **Calendar:** react-big-calendar + date-fns/dayjs localizer.
- **Bao mat toi thieu:** Hash password truoc khi luu storage, khong plain text.
- **Dong bo du lieu:** CRUD cong viec -> cap nhat table, my-tasks, calendar, thong ke va localStorage.
- **Validation:** Ten cong viec bat buoc, deadline hop le, trang thai/uu tien dung enum.
- **RBAC:** Route va UI duoc gioi han theo role `admin`/`nhanvien`.
- **Trai nghiem:** Uu tien thao tac nhanh, bo loc ro rang, du lieu khoi phuc dung sau refresh.

# Plan: Hệ thống Quản lý Câu lạc bộ & Đăng ký tham gia

## Tổng quan

Xây dựng module **Quản lý CLB** gồm 4 chức năng chính: Danh sách CLB, Đơn đăng ký, Quản lý thành viên, Báo cáo thống kê. Tuân thủ kiến trúc UmiJS hiện có (useInitModel, TableBase, mock API).

---

## 1. Cấu trúc thư mục

```
src/
├── pages/QuanLyCauLacBo/
│   ├── typing.d.ts                          # Interfaces chung
│   ├── DanhSachCLB/
│   │   ├── index.tsx                        # Trang danh sách CLB (TableBase)
│   │   └── FormCLB.tsx                      # Form thêm/sửa CLB (UploadFile, TinyEditor)
│   ├── DonDangKy/
│   │   ├── index.tsx                        # Trang quản lý đơn đăng ký (TableBase + rowSelection)
│   │   ├── FormDonDangKy.tsx                # Form thêm/sửa/xem chi tiết đơn
│   │   ├── ModalDuyet.tsx                   # Modal duyệt/từ chối (nhập lý do khi reject)
│   │   └── ModalLichSu.tsx                  # Modal xem lịch sử thao tác
│   ├── ThanhVien/
│   │   ├── index.tsx                        # Trang quản lý thành viên theo CLB
│   │   └── ModalChuyenCLB.tsx               # Modal chuyển CLB cho 1/nhiều thành viên
│   └── ThongKe/
│       └── index.tsx                        # Trang báo cáo: cards, ColumnChart, xuất XLSX
│
├── models/quanlycaulacbo/
│   ├── cauLacBo.ts                          # useInitModel<CauLacBo>('api/cau-lac-bo')
│   ├── donDangKy.ts                         # useInitModel<DonDangKy>('api/don-dang-ky') + custom state
│   └── thanhVien.ts                         # Custom model (lọc approved, chuyển CLB)
│
mock/
└── QuanLyCauLacBo/
    └── QuanLyCauLacBo.ts                    # Mock APIs cho CLB, đơn đăng ký, thành viên, thống kê
│
config/
└── routes.ts                                # Thêm routes mới
```

---

## 2. Interfaces (`typing.d.ts`)

```typescript
export interface CauLacBo {
  _id?: string;
  id: string;
  anhDaiDien?: string;        // URL ảnh
  tenCLB: string;
  ngayThanhLap: string;       // ISO date
  moTa: string;               // HTML content (TinyEditor)
  chuNhiem: string;           // Text
  hoatDong: boolean;          // true/false
}

export interface DonDangKy {
  _id?: string;
  id: string;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: 'Nam' | 'Nữ' | 'Khác';
  diaChi: string;
  soTruong: string;
  cauLacBoId: string;         // FK → CauLacBo
  lyDoDangKy: string;
  trangThai: 'Pending' | 'Approved' | 'Rejected';
  ghiChu?: string;            // Lý do từ chối
  lichSu: LichSuThaoTac[];   // Lịch sử duyệt/từ chối
  ngayDangKy: string;
}

export interface LichSuThaoTac {
  hanhDong: 'Approved' | 'Rejected';
  thoiGian: string;           // ISO datetime
  nguoiThucHien: string;      // "Admin"
  lyDo?: string;              // Lý do từ chối
}

export interface ThanhVien extends Omit<DonDangKy, 'trangThai' | 'lichSu'> {
  // Thành viên = đơn đăng ký đã Approved
}
```

---

## 3. Mock API (`mock/QuanLyCauLacBo/QuanLyCauLacBo.ts`)

### Endpoints:

| Method | URL | Mô tả |
|--------|-----|--------|
| GET | `/api/cau-lac-bo/page` | Danh sách CLB (phân trang) |
| GET | `/api/cau-lac-bo/many` | Tất cả CLB (cho Select dropdown) |
| POST | `/api/cau-lac-bo` | Thêm CLB |
| PUT | `/api/cau-lac-bo/:id` | Sửa CLB |
| DELETE | `/api/cau-lac-bo/:id` | Xóa CLB |
| GET | `/api/don-dang-ky/page` | Danh sách đơn (phân trang) |
| POST | `/api/don-dang-ky` | Thêm đơn |
| PUT | `/api/don-dang-ky/:id` | Sửa đơn |
| DELETE | `/api/don-dang-ky/:id` | Xóa đơn |
| PUT | `/api/don-dang-ky/duyet` | Duyệt nhiều đơn (body: { ids, hanhDong, lyDo? }) |
| GET | `/api/don-dang-ky/:id/lich-su` | Lịch sử thao tác 1 đơn |
| GET | `/api/thanh-vien/page` | DS thành viên (Approved, filter theo cauLacBoId) |
| PUT | `/api/thanh-vien/chuyen-clb` | Chuyển CLB (body: { ids, cauLacBoIdMoi }) |
| GET | `/api/thong-ke/tong-quan` | Số CLB, đơn Pending/Approved/Rejected |
| GET | `/api/thong-ke/don-theo-clb` | Đơn đăng ký theo từng CLB (cho ColumnChart) |

**Mock data:** 5 CLB mẫu, 15-20 đơn đăng ký với đủ 3 trạng thái.

---

## 4. Models

### `models/quanlycaulacbo/cauLacBo.ts`

```typescript
// Simple wrapper dùng useInitModel
export default () => useInitModel<CauLacBo>('api/cau-lac-bo', undefined, undefined, '');
```

### `models/quanlycaulacbo/donDangKy.ts`

```typescript
// useInitModel + custom methods: duyetNhieu, tuChoiNhieu, getLichSu
export default () => {
  const initModel = useInitModel<DonDangKy>('api/don-dang-ky', undefined, undefined, '');
  // Thêm state & methods cho duyệt hàng loạt, lịch sử
  return { ...initModel, duyetNhieu, tuChoiNhieu, getLichSu };
};
```

### `models/quanlycaulacbo/thanhVien.ts`

```typescript
// Custom model: getModel lọc approved, chuyenCLB method
```

---

## 5. Chi tiết từng trang

### 5.1. Danh sách CLB (`DanhSachCLB/index.tsx`)

**Columns:**
| Cột | dataIndex | width | filterType | sortable |
|-----|-----------|-------|------------|----------|
| Ảnh đại diện | anhDaiDien | 100 | - | - |
| Tên CLB | tenCLB | 200 | string | ✓ |
| Ngày thành lập | ngayThanhLap | 150 | - | ✓ |
| Mô tả | moTa | 300 | - | - |
| Chủ nhiệm | chuNhiem | 150 | string | - |
| Hoạt động | hoatDong | 100 | select (Có/Không) | - |
| Thao tác | - | 200 | - | - |

**Thao tác:** Chỉnh sửa (handleEdit), Xóa (Popconfirm + deleteModel), Xem thành viên (navigate đến ThanhVien?cauLacBoId=xxx)

**FormCLB.tsx:**

- Upload ảnh đại diện (component Upload của Antd)
- Input: Tên CLB, Chủ nhiệm
- DatePicker: Ngày thành lập
- TinyEditor: Mô tả (HTML)
- Switch: Hoạt động

### 5.2. Đơn đăng ký (`DonDangKy/index.tsx`)

**Columns:**
| Cột | dataIndex | width | filterType |
|-----|-----------|-------|------------|
| Họ tên | hoTen | 150 | string |
| Email | email | 200 | string |
| SĐT | sdt | 120 | - |
| Giới tính | gioiTinh | 100 | select |
| Câu lạc bộ | cauLacBoId | 200 | customselect (Select CLB) |
| Trạng thái | trangThai | 120 | select (Pending/Approved/Rejected) |
| Thao tác | - | 250 | - |

**TableBase props:**

- `rowSelection={true}` → checkbox chọn nhiều
- `otherButtons` → render "Duyệt xx đơn" / "Từ chối xx đơn" khi có selectedIds

**Thao tác cột:**

- Xem chi tiết (handleView) → FormDonDangKy ở mode isView
- Chỉnh sửa (handleEdit)
- Xóa (deleteModel)
- Duyệt (1 đơn) → confirm modal
- Từ chối (1 đơn) → ModalDuyet bắt buộc nhập lý do
- Xem lịch sử → ModalLichSu

**Duyệt/Từ chối hàng loạt:**

- Khi `selectedIds.length > 0`, hiển thị 2 nút trên header:
  - "Duyệt {n} đơn đã chọn" → Modal confirm → gọi API duyệt nhiều
  - "Từ chối {n} đơn đã chọn" → ModalDuyet (bắt buộc lý do) → gọi API từ chối nhiều

**ModalDuyet.tsx:**

- Props: visible, onCancel, onOk, type ('Approved'|'Rejected'), count (số đơn)
- Khi Rejected: Form.Item lý do (required)
- Khi Approved: Confirm text "Xác nhận duyệt {n} đơn?"

**ModalLichSu.tsx:**

- Modal hiển thị Timeline (Antd Timeline) với các mục lịch sử
- Format: "Admin đã {Approved/Rejected} vào lúc {thời gian} với lý do: {lyDo}"

**Lưu lịch sử:** Khi duyệt/từ chối → mock API push vào mảng `lichSu` của đơn đăng ký.

### 5.3. Quản lý thành viên (`ThanhVien/index.tsx`)

**Giao diện:**

- Select CLB ở trên (lấy từ model cauLacBo.getAllModel)
- TableBase hiển thị thành viên (đơn đăng ký Approved) theo CLB đã chọn

**Columns:** Họ tên, Email, SĐT, Giới tính, Địa chỉ, Sở trường, Ngày đăng ký

**Chức năng:**

- `rowSelection={true}` → chọn 1/nhiều thành viên
- Nút "Chuyển CLB cho {n} thành viên" → ModalChuyenCLB

**ModalChuyenCLB.tsx:**

- Hiển thị: "Chuyển {n} thành viên sang CLB khác"
- Select chọn CLB đích (loại bỏ CLB hiện tại)
- Confirm → gọi API chuyển CLB

### 5.4. Báo cáo thống kê (`ThongKe/index.tsx`)

**Phần 1: Cards thống kê (Row + Col + Card)**

- Số CLB (tổng)
- Đơn Pending (màu vàng)
- Đơn Approved (màu xanh)
- Đơn Rejected (màu đỏ)

**Phần 2: ColumnChart (react-apexcharts)**

- Dùng component `ColumnChart` từ `@/components/Chart/ColumnChart`
- xAxis: Tên các CLB
- yAxis: 3 series → [Pending[], Approved[], Rejected[]]
- yLabel: ['Pending', 'Approved', 'Rejected']
- colors: ['#faad14', '#52c41a', '#ff4d4f']
- formatY: (val) => val.toString()

**Phần 3: Xuất XLSX**

- Select chọn CLB
- Nút "Xuất danh sách thành viên"
- Dùng thư viện `xlsx` (đã có trong package.json)
- Export các cột: Họ tên, Email, SĐT, Giới tính, Địa chỉ, Sở trường, Ngày đăng ký
- Tên file: `ThanhVien_{TenCLB}.xlsx`

---

## 6. Routes (`config/routes.ts`)

```typescript
{
  path: '/quan-ly-cau-lac-bo',
  name: 'Quản lý CLB',
  icon: 'TeamOutlined',
  routes: [
    {
      name: 'Danh sách CLB',
      path: '/quan-ly-cau-lac-bo/danh-sach',
      component: './QuanLyCauLacBo/DanhSachCLB',
    },
    {
      name: 'Đơn đăng ký',
      path: '/quan-ly-cau-lac-bo/don-dang-ky',
      component: './QuanLyCauLacBo/DonDangKy',
    },
    {
      name: 'Quản lý thành viên',
      path: '/quan-ly-cau-lac-bo/thanh-vien',
      component: './QuanLyCauLacBo/ThanhVien',
    },
    {
      name: 'Thống kê',
      path: '/quan-ly-cau-lac-bo/thong-ke',
      component: './QuanLyCauLacBo/ThongKe',
    },
  ],
}
```

---

## 7. Thứ tự triển khai

| Bước | Nội dung | Files |
|------|----------|-------|
| 1 | Tạo interfaces (`typing.d.ts`) | `src/pages/QuanLyCauLacBo/typing.d.ts` |
| 2 | Tạo mock API với data mẫu | `mock/QuanLyCauLacBo/QuanLyCauLacBo.ts` |
| 3 | Tạo models (3 files) | `src/models/quanlycaulacbo/*.ts` |
| 4 | Thêm routes | `config/routes.ts` |
| 5 | Trang Danh sách CLB + FormCLB | `src/pages/QuanLyCauLacBo/DanhSachCLB/*` |
| 6 | Trang Đơn đăng ký + Form + Modals | `src/pages/QuanLyCauLacBo/DonDangKy/*` |
| 7 | Trang Quản lý thành viên + ModalChuyenCLB | `src/pages/QuanLyCauLacBo/ThanhVien/*` |
| 8 | Trang Thống kê + ColumnChart + xuất XLSX | `src/pages/QuanLyCauLacBo/ThongKe/*` |

---

## 8. Nguyên tắc kỹ thuật

- **Tái sử dụng:** TableBase, useInitModel, ColumnChart, IColumn
- **Antd components:** Table, Form, Modal, Drawer, Select, DatePicker, Switch, Upload, Timeline, Card, Row, Col, Popconfirm, Tag, Button, Space
- **Không dùng:** Tailwind CSS, Antd List
- **Search/Sort:** Dùng `filterType` và `sortable` trên IColumn
- **State liên kết:** Khi duyệt đơn → thành viên tự động xuất hiện trong trang Thành viên; thống kê tự động cập nhật
- **rowSelection:** Dùng prop `rowSelection` của TableBase + `selectedIds` từ model

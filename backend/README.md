# Backend Quản Lý Ngân Hàng Câu Hỏi

Đây là backend Express + TypeScript. Hệ thống sử dụng **JSON files** để lưu trữ dữ liệu (không cần cài đặt Database).

## Yêu cầu hệ thống
- Node.js bản 24 LTS
- Yarn package manager

## Hướng dẫn cài đặt và chạy

1. **Cài đặt thư viện:**
   Mở terminal trong thư mục `backend` và chạy lệnh:
   ```bash
   yarn install
   ```

2. **Chạy server (môi trường dev):**
   ```bash
   yarn dev
   ```
   Server sẽ khởi động tại địa chỉ: `http://localhost:8080`

## Danh sách API Endpoints

Tất cả các API đều có đường dẫn gốc là `/api/quan-ly-ngan-hang-cau-hoi`.

| Chức năng | Method + Endpoint | Mô tả |

Dữ liệu mẫu (`khoiKienThuc`, `monHoc`, `cauHoi`, `cauTrucDeThi`, `deThi`) nằm sẵn trong thư mục `src/data/*.json`. Mọi thay đổi qua API (Thêm, Sửa, Xóa) sẽ được ghi trực tiếp vào các file JSON này.

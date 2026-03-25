# Đề bài: Quản lý Câu lạc bộ và Đăng ký tham gia

Xây dựng hệ thống quản lý câu lạc bộ và đăng ký tham gia, kèm chức năng báo cáo thống kê nâng cao.

## 1. Danh sách câu lạc bộ

### Bảng câu lạc bộ

Các cột cần có:

- Ảnh đại diện
- Tên câu lạc bộ
- Ngày thành lập
- Mô tả (HTML)
- Chủ nhiệm CLB (nhập text)
- Hoạt động (Có/Không)
- Thao tác: Chỉnh sửa, Xóa, Xem danh sách thành viên

### Chức năng

- Thêm mới/Chỉnh sửa/Xóa CLB
- Xem danh sách thành viên trong CLB
- Tìm kiếm, sort trực tiếp trên Table

## 2. Quản lý đơn đăng ký thành viên

### Bảng đơn đăng ký

Các cột cần có:

- Họ tên
- Email
- SĐT
- Giới tính
- Địa chỉ
- Sở trường
- Câu lạc bộ (chọn từ danh mục)
- Lý do đăng ký
- Trạng thái (Pending, Approved, Rejected)
- Ghi chú (lý do từ chối)
- Thao tác: Xem chi tiết/Chỉnh sửa/Xóa

### Chức năng

- Thêm mới/Xem chi tiết/Chỉnh sửa/Xóa đơn đăng ký
- Duyệt/Từ chối đơn với xác nhận qua modal
- Khi từ chối, bắt buộc nhập lý do từ chối
- Duyệt/Từ chối nhiều đơn cùng lúc
- Gợi ý triển khai duyệt hàng loạt:
  - Dùng `rowSelection` của Table để hiển thị cột checkbox
  - Lưu các dòng được chọn (`rowSelected`) vào state
  - Hiển thị nút hành động theo số lượng chọn, ví dụ: "Duyệt xx đơn đã chọn", "Không duyệt xx đơn đã chọn"
- Lưu lịch sử thao tác duyệt/từ chối
- Có chức năng xem lại lịch sử thao tác

Ví dụ lịch sử:

- Admin đã Rejected vào lúc 17h ngày 09/04/2025, lý do: ...

## 3. Quản lý thành viên câu lạc bộ

### Danh sách thành viên theo từng CLB

- Bảng thành viên tương tự bảng đơn đăng ký (Họ tên, Email, SĐT...)
- Chỉ hiển thị thành viên có trạng thái Approved

### Chuyển CLB cho thành viên

- Cho phép đổi CLB cho 1 hoặc nhiều thành viên cùng lúc
- Khi đổi CLB, hiển thị modal gồm:
  - Số lượng thành viên được chuyển
  - CLB đích (chọn từ danh sách CLB)

## 4. Báo cáo và thống kê

- Thống kê tổng quan:
  - Số CLB
  - Số đơn đăng ký theo trạng thái: Pending, Approved, Rejected
- ColumnChart số đơn đăng ký theo từng CLB:
  - xAxis: tên CLB
  - yAxis: 3 cột tương ứng 3 trạng thái
- Xuất danh sách thành viên (Approved) theo từng CLB ra file XLSX
  - Gợi ý thư viện: https://www.npmjs.com/package/xlsx

## Yêu cầu kỹ thuật

- Sử dụng project base Umi
- Khai báo và thống nhất interface trong toàn bộ project
- Có models
- Tách components, form và tái sử dụng components
- Sử dụng control/component của Antd/Project:
  - Table
  - UploadFile
  - TinyEditor
  - ColumnChart
- Cho phép tìm kiếm, sort trực tiếp trên column của Table
- Không dùng Tailwind CSS
- Không dùng List (Antd)


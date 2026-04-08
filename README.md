# Đề Bài: Ứng dụng Quản lý Công việc Nhóm

## 1. Mục tiêu

Xây dựng ứng dụng giúp nhóm theo dõi, phân công và quản lý tiến độ công việc hằng ngày.

## 2. Yêu cầu chức năng

### 2.1. Đăng nhập / Đăng xuất

- Cho phép người dùng nhập tên để đăng nhập.
- Lưu thông tin người dùng vào `localStorage` hoặc `sessionStorage`.
- Khi lưu thông tin đăng nhập vào `localStorage`, mật khẩu phải được hash trước khi lưu (không lưu mật khẩu dạng plain text).
- Hiển thị tên người dùng hiện tại sau khi đăng nhập.
- Hỗ trợ đăng xuất và xóa trạng thái đăng nhập.
- Có sẵn 1 tài khoản quản trị để kiểm tra phân quyền:
	- Username: `admin`
	- Password: `admin123`

### 2.2. Quản lý danh sách công việc

Mỗi công việc cần có các thông tin sau:

- Tên công việc
- Người được giao
- Mức độ ưu tiên: `Thấp` / `Trung bình` / `Cao`
- Thời hạn hoàn thành (Deadline)
- Trạng thái: `Chưa làm` / `Đang làm` / `Đã xong`

Các thao tác bắt buộc:

- Thêm công việc mới (qua form nhập liệu)
- Chỉnh sửa công việc
- Xóa công việc
- Lưu danh sách công việc vào `localStorage`

### 2.3. Bộ lọc và tìm kiếm

- Lọc công việc theo trạng thái.
- Lọc công việc theo người được giao.
- Tìm kiếm công việc theo từ khóa trong tên công việc.

### 2.4. Phân công công việc

- Mỗi người dùng có thể được phân công các công việc khác nhau.
- Hiển thị danh sách công việc đang được giao cho người dùng hiện tại.

### 2.5. Hiển thị lịch công việc

- Hiển thị các công việc trên lịch theo thời hạn hoàn thành.
- Gợi ý thư viện: `react-big-calendar`.

### 2.6. Thống kê

- Tổng số công việc.
- Số công việc đã hoàn thành.

### 2.7. Phân quyền truy cập

- Vai trò `admin`:
	- Được xem màn hình **Danh sách công việc**.
	- Được xem màn hình **Thống kê**.

- Vai trò `nhân viên`:
	- Chỉ được xem màn hình **Lịch công việc**.
	- Chỉ được xem mục **Công việc của tôi**.
	- Không được xem **Danh sách công việc** và **Thống kê**.

## 3. Tiêu chí hoàn thành

- Đáp ứng đầy đủ các chức năng bắt buộc nêu trên.
- Dữ liệu được lưu và khôi phục đúng từ `localStorage`/`sessionStorage`.
- Giao diện rõ ràng, dễ sử dụng, thuận tiện theo dõi tiến độ nhóm.
- Phân quyền đúng theo vai trò: `admin` và `nhân viên`.
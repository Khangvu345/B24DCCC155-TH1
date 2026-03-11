# This is our pracetice 03 in PTIT
Đề bài: Xây dựng ứng dụng giúp khách hàng đặt lịch hẹn cho dịch vụ (cắt tóc, spa, khám bệnh, sửa chữa, v.v.) và quản lý lịch hẹn theo nhân viên, thời gian, trạng thái.

Chức năng chính:

1. Quản lý nhân viên & dịch vụ

- Thêm/Sửa/Xóa nhân viên, mỗi nhân viên chỉ phục vụ số khách giới hạn/ngày

- Mỗi nhân viên có lịch làm việc riêng (Ví dụ: 9h-17h thứ 6)

- Quản lý danh sách dịch vụ (Mỗi dịch vụ có giá, thời gian thực hiện)

2. Quản lý lịch hẹn:

- Đặt lịch hẹn (Chọn ngày, giờ, nhân viên phục vụ)

- Kiểm tra lịch trùng (Không cho đặt trùng lịch đã có)

- Cập nhật trạng thái lịch hẹn (Chờ duyệt/Xác nhận/Hoàn thành/Hủy)

3. Đánh giá dịch vụ & nhân viên

- Sau khi hoàn thành lịch hẹn, khách hàng có thể đánh giá

- Hiển thị đánh giá trung bình của từng nhân viên

- Nhân viên có thể phản hồi lại đánh giá

4. Thống kê & báo cáo

- Thống kê số lượng lịch hẹn theo ngày/tháng

- Thống kê doanh thu theo dịch vụ & nhân viên

Yêu cầu về kỹ thuật:

Sử dụng project base umi, sử dụng model, tách components, tái sử dụng components, clean code...
Chia menu, submenu rõ ràng, giao diện trực quan dễ sử dụng
Có thể sử dụng thêm các components sẵn có trong project: Table, Chart, TinyEditor, MyDatepicker...
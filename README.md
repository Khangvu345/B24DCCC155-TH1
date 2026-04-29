# This is our pracetice 08 in PTIT
##  Mục tiêu

Xây dựng một ứng dụng Blog cá nhân nơi người dùng có thể viết bài, quản lý nội dung và đọc các bài viết.

---

##  Chức năng chính

###  1. Trang chủ
- **Hiển thị danh sách bài viết** dưới dạng thẻ (Card) với:
  - Ảnh đại diện
  - Tiêu đề
  - Tóm tắt nội dung
  - Ngày đăng
  - Tác giả
  - Các thẻ tag
- **Phân trang (Pagination)**  hiển thị 9 bài mỗi trang
- **Lọc theo thẻ**  nhấn vào tag để lọc bài viết
- **Tìm kiếm** bài viết theo từ khóa (debounce 300ms)

###  2. Trang chi tiết bài viết
- **Hiển thị toàn bộ nội dung** bài viết (render Markdown)
- **Thông tin bài viết:**
  - Tác giả
  - Ngày đăng
  - Danh sách thẻ
- **Số lượt xem (view count)** tự động tăng mỗi lần truy cập
- **Bài viết liên quan** (cùng thẻ, trừ bài đang xem)
- **Nút quay lại** danh sách

###  3. Trang giới thiệu
- **Thông tin tác giả:**
  - Ảnh đại diện
  - Tên
  - Tiểu sử
  - Kỹ năng
  - Liên kết mạng xã hội

###  4. Quản lý bài viết
- **Bảng danh sách** hiển thị: Tiêu đề, Trạng thái, Thẻ, Lượt xem, Ngày tạo
- **Tìm kiếm** theo tiêu đề
- **Lọc** theo trạng thái (Nháp / Đã đăng)
- **Thêm bài viết mới:** Form với các trường
  - Tiêu đề
  - Slug
  - Nội dung
  - Ảnh đại diện (URL)
  - Thẻ
  - Trạng thái
- **Sửa bài viết:** Form điền sẵn thông tin cũ
- **Xóa bài viết:** Popconfirm xác nhận trước khi xóa

###  5. Quản lý thẻ
- **Danh sách thẻ** với tên và số bài viết đang sử dụng
- **Thêm / Sửa / Xóa thẻ** (inline hoặc Modal)

---


/**
 * Interface cho Đánh Giá dịch vụ / nhân viên
 */
export interface IDanhGia {
    id: string;
    lichHenId: string;          // FK → LichHen (bắt buộc trangThai = 'hoanThanh')
    nhanVienId: string;         // Denormalized từ lichHen — dùng để tính điểm TB nhanh
    soSao: number;              // 1–5
    nhanXet?: string;           // Nhận xét của khách hàng
    thoiGianTao: string;        // ISO timestamp
    phanHoi?: string;           // Nhân viên phản hồi
    thoiGianPhanHoi?: string;   // ISO timestamp khi phản hồi
}
/**
 * Interface cho Nhân Viên
 */
export interface INhanVien {
    id: string;
    ten: string;                // Họ tên
    soDienThoai: string;        // SĐT liên hệ
    chuyenMon: string;          // Chuyên môn (VD: "Tóc nữ", "Spa")
    soKhachToiDa: number;       // Số khách tối đa phục vụ / ngày
    moTa?: string;
}
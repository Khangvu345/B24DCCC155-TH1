/**
 * Trạng thái lịch hẹn
 * Chờ duyệt → Xác nhận → Hoàn thành / Hủy
 */
export type TrangThaiLichHen = 'choDuyet' | 'xacNhan' | 'hoanThanh' | 'huy';

export const TRANG_THAI_LICH_HEN_VALUES: TrangThaiLichHen[] = [
    'choDuyet',
    'xacNhan',
    'hoanThanh',
    'huy',
];

/**
 * Interface cho Lịch Hẹn
 */
export interface ILichHen {
    id: string;
    khachHangId: string;        // Tên hoặc SĐT khách hàng
    nhanVienId: string;         // FK → NhanVien
    dichVuId: string;           // FK → DichVu
    ngay: string;               // 'YYYY-MM-DD'
    gioDat: string;             // 'HH:mm' — giờ bắt đầu
    trangThai: TrangThaiLichHen;
    ghiChu?: string;
    thoiGianTao: string;        // ISO timestamp
}
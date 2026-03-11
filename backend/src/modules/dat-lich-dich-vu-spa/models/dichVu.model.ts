/**
 * Interface cho Dịch Vụ
 */
export interface IDichVu {
    id: string;
    ten: string;            // Tên dịch vụ
    gia: number;            // Giá (VND)
    thoiGianPhut: number;  // Thời gian thực hiện (phút) — dùng để kiểm tra trùng lịch
    moTa?: string;
}
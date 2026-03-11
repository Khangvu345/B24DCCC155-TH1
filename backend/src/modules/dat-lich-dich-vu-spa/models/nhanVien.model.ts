export type VaiTroNhanVien = 'quan_ly' | 'nhan_vien' | 'le_tan';

export interface INhanVien {
    id: string;
    hoTen: string;
    email: string;
    password?: string; // Tùy chọn để có thể ẩn khi trả về client
    vaiTro: VaiTroNhanVien;
    soDienThoai?: string;
}
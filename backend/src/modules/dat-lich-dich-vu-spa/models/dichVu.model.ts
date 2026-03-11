export interface IDichVu {
    id: string;
    tenDichVu: string;
    giaTien: number;
    thoiGianThucHien: number; // Đơn vị: Phút
    moTa?: string;
    hinhAnh?: string; // URL hinh anh minh hoa
}
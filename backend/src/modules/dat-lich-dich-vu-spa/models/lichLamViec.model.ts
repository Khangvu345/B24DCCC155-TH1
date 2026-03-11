/**
 * Các ngày trong tuần (0 = Chủ nhật, 1 = Thứ 2, ..., 6 = Thứ 7)
 */
export type ThuTrongTuan = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Interface cho Lịch Làm Việc của nhân viên
 * Mỗi bản ghi = một ca làm việc trong tuần
 * VD: Thứ 6, 9h–17h
 */
export interface ILichLamViec {
    id: string;
    nhanVienId: string;     // FK → NhanVien
    thu: ThuTrongTuan;      // 0=CN, 1=T2, 2=T3, 3=T4, 4=T5, 5=T6, 6=T7
    gioVao: string;         // 'HH:mm' — giờ bắt đầu ca
    gioRa: string;          // 'HH:mm' — giờ kết thúc ca
}
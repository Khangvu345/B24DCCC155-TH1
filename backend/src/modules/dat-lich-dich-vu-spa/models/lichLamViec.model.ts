export type CaLamViec = 'sang' | 'chieu' | 'toi';
export type TrangThaiLich = 'co_san' | 'da_dat' | 'nghi';

export interface ILichLamViec {
    id: string;
    nhanVienId: string;
    ngayLam: string; // ISO Date YYYY-MM-DD
    caLamViec: CaLamViec;
    trangThai: TrangThaiLich;
}
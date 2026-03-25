declare namespace QuanLyCauLacBo {
  type TGioiTinh = 'Nam' | 'Nu' | 'Khac';
  type TTrangThai = 'Pending' | 'Approved' | 'Rejected';

  interface ICauLacBo {
    _id?: string;
    anhDaiDien?: string;
    tenCLB: string;
    ngayThanhLap: string;
    moTa: string;
    chuNhiem: string;
    hoatDong: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  interface ILichSuThaoTac {
    hanhDong: 'Approved' | 'Rejected';
    thoiGian: string;
    nguoiThucHien: string;
    lyDo?: string;
  }

  interface IDonDangKy {
    _id?: string;
    hoTen: string;
    email: string;
    sdt: string;
    gioiTinh: TGioiTinh;
    diaChi: string;
    soTruong: string;
    cauLacBoId: string;
    lyDoDangKy: string;
    trangThai: TTrangThai;
    ghiChu?: string;
    lichSu: ILichSuThaoTac[];
    ngayDangKy: string;
    createdAt?: string;
    updatedAt?: string;
  }

  type IThanhVien = Omit<IDonDangKy, 'trangThai' | 'lichSu'>;

  interface IThongKeTongQuan {
    tongCLB: number;
    pending: number;
    approved: number;
    rejected: number;
  }

  interface IThongKeDonTheoCLB {
    cauLacBoId: string;
    tenCLB: string;
    pending: number;
    approved: number;
    rejected: number;
  }
}

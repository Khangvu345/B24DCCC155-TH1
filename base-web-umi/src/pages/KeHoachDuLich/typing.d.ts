declare namespace KeHoachDuLich {
  type TLoaiHinh = 'Bien' | 'Nui' | 'ThanhPho';

  interface IDiemDen {
    _id?: string;
    ten: string;
    diaDiem: string;
    loaiHinh: TLoaiHinh;
    anhDaiDien?: string;
    rating: number;
    moTa: string;
    thoiGianThamQuan: number;
    chiPhiAnUong: number;
    chiPhiLuuTru: number;
    chiPhiDiChuyen: number;
    giaDuKien?: number;
    createdAt?: string;
    updatedAt?: string;
  }

  interface ILichTrinhNgay {
    ngay: string;
    diemDenIds: string[];
    tongChiPhi: number;
    tongThoiGianDiChuyen: number;
  }

  interface ILichTrinh {
    _id?: string;
    ten: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    ngay: ILichTrinhNgay[];
    tongNganSach: number;
    phanBo?: IPhanBoNganSach;
    createdAt?: string;
    updatedAt?: string;
  }

  interface IPhanBoNganSach {
    anUong: number;
    diChuyen: number;
    luuTru: number;
    khac?: number;
  }

  interface INganSachSummary {
    tongNganSach: number;
    daSuDung: number;
    conLai: number;
    phanBo: IPhanBoNganSach;
    vuotNganSach: boolean;
  }

  interface IThongKeTheoThang {
    thang: string;
    soLichTrinh: number;
    doanhThu: number;
  }

  interface IDiemDenPhoBien {
    diemDenId: string;
    ten: string;
    soLuotChon: number;
  }

  interface IThongKeTongQuan {
    soLichTrinh: number;
    doanhThu: number;
    diemDenPhoBien: IDiemDenPhoBien[];
    chiTieuTheoHangMuc: IPhanBoNganSach;
  }
}

import { MucDo } from './cauHoi.model';

/**
 * Một yêu cầu trong cấu trúc đề thi
 * VD: 2 câu Dễ từ khối Tổng quan
 */
export interface IYeuCau {
    khoiKienThucId: string;
    mucDo: MucDo;
    soCau: number;
}

/**
 * Cấu trúc đề thi — lưu riêng để tái sử dụng
 */
export interface ICauTrucDeThi {
    id: string;
    ten: string;              // Tên cấu trúc (VD: "Đề giữa kỳ CS101")
    monHocId: string;         // FK -> MonHoc
    danhSachYeuCau: IYeuCau[];
}

/**
 * Đề thi đã tạo
 */
export interface IDeThi {
    id: string;
    tieuDe: string;
    monHocId: string;          // FK -> MonHoc
    cauTrucDeThiId: string;    // FK -> CauTrucDeThi
    danhSachCauHoi: string[];  // Array ID câu hỏi
    ngayTao: string;           // ISO timestamp
}

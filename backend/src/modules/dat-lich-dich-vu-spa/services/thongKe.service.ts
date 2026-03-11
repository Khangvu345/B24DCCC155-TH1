import { readJsonFile } from '../../../config/database';
import { ILichHen } from '../models/lichHen.model';
import { IDanhGia } from '../models/danhGia.model';
import { IDichVu } from '../models/dichVu.model';

const LICH_HEN_FILE = 'dat-lich-dich-vu-spa/lichHen.json';
const DANH_GIA_FILE = 'dat-lich-dich-vu-spa/danhGia.json';
const DICH_VU_FILE = 'dat-lich-dich-vu-spa/dichVu.json';

export class ThongKeService {
    /**
     * Thống kê lịch hẹn theo ngày (YYYY-MM-DD) hoặc tháng (YYYY-MM)
     */
    static thongKeLichHen(tuNgay?: string, denNgay?: string): {
        tongLichHen: number;
        theoTrangThai: Record<string, number>;
        theoNgay: Record<string, number>;
    } {
        let data = readJsonFile<ILichHen>(LICH_HEN_FILE);

        if (tuNgay) data = data.filter((d) => d.ngay >= tuNgay);
        if (denNgay) data = data.filter((d) => d.ngay <= denNgay);

        // Thống kê theo trạng thái
        const theoTrangThai: Record<string, number> = {
            choDuyet: 0,
            xacNhan: 0,
            hoanThanh: 0,
            huy: 0,
        };
        data.forEach((d) => { theoTrangThai[d.trangThai] = (theoTrangThai[d.trangThai] ?? 0) + 1; });

        // Thống kê theo ngày
        const theoNgay: Record<string, number> = {};
        data.forEach((d) => { theoNgay[d.ngay] = (theoNgay[d.ngay] ?? 0) + 1; });

        return { tongLichHen: data.length, theoTrangThai, theoNgay };
    }

    /**
     * Thống kê doanh thu theo dịch vụ và nhân viên
     * Chỉ tính lịch hẹn đã hoàn thành
     */
    static thongKeDoanhThu(tuNgay?: string, denNgay?: string): {
        tongDoanhThu: number;
        theoDichVu: Record<string, { ten: string; soLuong: number; doanhThu: number }>;
        theoNhanVien: Record<string, { soLuong: number; doanhThu: number }>;
    } {
        let lichHen = readJsonFile<ILichHen>(LICH_HEN_FILE).filter(
            (d) => d.trangThai === 'hoanThanh',
        );

        if (tuNgay) lichHen = lichHen.filter((d) => d.ngay >= tuNgay);
        if (denNgay) lichHen = lichHen.filter((d) => d.ngay <= denNgay);

        const dichVuMap: Record<string, IDichVu> = {};
        readJsonFile<IDichVu>(DICH_VU_FILE).forEach((dv) => { dichVuMap[dv.id] = dv; });

        const theoDichVu: Record<string, { ten: string; soLuong: number; doanhThu: number }> = {};
        const theoNhanVien: Record<string, { soLuong: number; doanhThu: number }> = {};
        let tongDoanhThu = 0;

        lichHen.forEach((lh) => {
            const dv = dichVuMap[lh.dichVuId];
            const gia = dv?.gia ?? 0;

            // Theo dịch vụ
            if (!theoDichVu[lh.dichVuId]) {
                theoDichVu[lh.dichVuId] = { ten: dv?.ten ?? lh.dichVuId, soLuong: 0, doanhThu: 0 };
            }
            theoDichVu[lh.dichVuId].soLuong += 1;
            theoDichVu[lh.dichVuId].doanhThu += gia;

            // Theo nhân viên
            if (!theoNhanVien[lh.nhanVienId]) {
                theoNhanVien[lh.nhanVienId] = { soLuong: 0, doanhThu: 0 };
            }
            theoNhanVien[lh.nhanVienId].soLuong += 1;
            theoNhanVien[lh.nhanVienId].doanhThu += gia;

            tongDoanhThu += gia;
        });

        return { tongDoanhThu, theoDichVu, theoNhanVien };
    }

    /**
     * Thống kê tổng quan dashboard
     */
    static tongQuan(): {
        tongLichHen: number;
        lichHenHomNay: number;
        doanhThuThang: number;
        diemTBToanHeThong: number;
    } {
        const homNay = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const thangNay = new Date().toISOString().slice(0, 7); // YYYY-MM

        const tatCaLichHen = readJsonFile<ILichHen>(LICH_HEN_FILE);
        const lichHenHomNay = tatCaLichHen.filter((d) => d.ngay === homNay).length;

        const { tongDoanhThu: doanhThuThang } = ThongKeService.thongKeDoanhThu(
            `${thangNay}-01`,
            `${thangNay}-31`,
        );

        const allDanhGia = readJsonFile<IDanhGia>(DANH_GIA_FILE);
        const diemTBToanHeThong =
            allDanhGia.length === 0
                ? 0
                : Math.round((allDanhGia.reduce((a, d) => a + d.soSao, 0) / allDanhGia.length) * 10) / 10;

        return {
            tongLichHen: tatCaLichHen.length,
            lichHenHomNay,
            doanhThuThang,
            diemTBToanHeThong,
        };
    }
}
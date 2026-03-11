import { ILichHen, TrangThaiLichHen } from '../models/lichHen.model';
import { DichVuService } from './dichVu.service';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId, getCurrentTimestamp } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'dat-lich-dich-vu-spa/lichHen.json';

// ─── State machine transitions ────────────────────────────────────────────────
const VALID_TRANSITIONS: Record<TrangThaiLichHen, TrangThaiLichHen[]> = {
    choDuyet: ['xacNhan', 'huy'],
    xacNhan: ['hoanThanh', 'huy'],
    hoanThanh: [],
    huy: [],
};

// ─── Helper: convert "HH:mm" → tổng số phút từ 00:00 ─────────────────────────
function toMinutes(hhmm: string): number {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
}

// ─── Filter type ─────────────────────────────────────────────────────────────
interface LichHenFilter {
    nhanVienId?: string;
    ngay?: string;
    trangThai?: TrangThaiLichHen;
    khachHangId?: string;
}

export class LichHenService {
    // ── Đọc tất cả, hỗ trợ filter ──────────────────────────────────────────
    static getAll(filter: LichHenFilter = {}): ILichHen[] {
        let data = readJsonFile<ILichHen>(FILE_NAME);

        if (filter.nhanVienId) {
            data = data.filter((d) => d.nhanVienId === filter.nhanVienId);
        }
        if (filter.ngay) {
            data = data.filter((d) => d.ngay === filter.ngay);
        }
        if (filter.trangThai) {
            data = data.filter((d) => d.trangThai === filter.trangThai);
        }
        if (filter.khachHangId) {
            data = data.filter((d) => d.khachHangId === filter.khachHangId);
        }

        return data;
    }

    // ── Lấy theo ID ────────────────────────────────────────────────────────
    static getById(id: string): ILichHen {
        const data = readJsonFile<ILichHen>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy lịch hẹn với id: ${id}`, 404);
        }
        return item;
    }

    // ── Tạo mới ────────────────────────────────────────────────────────────
    static create(body: Omit<ILichHen, 'id' | 'trangThai' | 'thoiGianTao'>): ILichHen {
        // Validate dịch vụ tồn tại + lấy thoiGianPhut
        const dichVu = DichVuService.getById(body.dichVuId);

        // Kiểm tra trùng lịch
        LichHenService._kiemTraTrung(
            body.nhanVienId,
            body.ngay,
            body.gioDat,
            dichVu.thoiGianPhut,
        );

        const data = readJsonFile<ILichHen>(FILE_NAME);
        const newItem: ILichHen = {
            id: generateId(),
            ...body,
            trangThai: 'choDuyet',
            thoiGianTao: getCurrentTimestamp(),
        };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    // ── Cập nhật thông tin ─────────────────────────────────────────────────
    static update(
        id: string,
        body: Partial<Omit<ILichHen, 'id' | 'trangThai' | 'thoiGianTao'>>,
    ): ILichHen {
        const data = readJsonFile<ILichHen>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy lịch hẹn với id: ${id}`, 404);
        }

        const current = data[index];

        // Nếu thay đổi giờ/ngày/nhânViên/dịchVụ → kiểm tra trùng lại
        const ngay = body.ngay ?? current.ngay;
        const gioDat = body.gioDat ?? current.gioDat;
        const nhanVienId = body.nhanVienId ?? current.nhanVienId;
        const dichVuId = body.dichVuId ?? current.dichVuId;

        const dichVu = DichVuService.getById(dichVuId);
        LichHenService._kiemTraTrung(nhanVienId, ngay, gioDat, dichVu.thoiGianPhut, id);

        data[index] = { ...current, ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    // ── Xóa (chỉ khi đã hủy) ───────────────────────────────────────────────
    static delete(id: string): void {
        const data = readJsonFile<ILichHen>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy lịch hẹn với id: ${id}`, 404);
        }
        if (data[index].trangThai !== 'huy') {
            throw new AppError(
                'Chỉ có thể xóa lịch hẹn ở trạng thái "Đã hủy"',
                400,
            );
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }

    // ── Đổi trạng thái ─────────────────────────────────────────────────────
    static doiTrangThai(id: string, trangThaiMoi: TrangThaiLichHen): ILichHen {
        const data = readJsonFile<ILichHen>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy lịch hẹn với id: ${id}`, 404);
        }

        const current = data[index];
        LichHenService._isValidTransition(current.trangThai, trangThaiMoi);

        data[index] = { ...current, trangThai: trangThaiMoi };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    // ════════════════════════════════════════════════════════════════════════
    // Private helpers
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Kiểm tra trùng lịch theo công thức overlap khoảng thời gian:
     * Hai khoảng [A,B) và [C,D) overlap khi A < D && C < B
     *
     * @param boQuaId  ID lịch hẹn cần bỏ qua (dùng khi update)
     */
    private static _kiemTraTrung(
        nhanVienId: string,
        ngay: string,
        gioDatMoi: string,
        thoiGianPhutMoi: number,
        boQuaId?: string,
    ): void {
        const tatCa = readJsonFile<ILichHen>(FILE_NAME);

        const lichCung = tatCa.filter(
            (lh) =>
                lh.nhanVienId === nhanVienId &&
                lh.ngay === ngay &&
                lh.trangThai !== 'huy' &&   // lịch đã hủy không chiếm chỗ
                lh.id !== boQuaId,           // bỏ qua chính nó khi update
        );

        const C = toMinutes(gioDatMoi);
        const D = C + thoiGianPhutMoi; // khoảng mới: [C, D)

        for (const lh of lichCung) {
            const dichVu = DichVuService.getById(lh.dichVuId);
            const A = toMinutes(lh.gioDat);
            const B = A + dichVu.thoiGianPhut; // khoảng cũ: [A, B)

            if (A < D && C < B) {
                throw new AppError(
                    `Nhân viên đã có lịch hẹn từ ${lh.gioDat} (${dichVu.thoiGianPhut} phút). Vui lòng chọn khung giờ khác.`,
                    400,
                );
            }
        }
    }

    /**
     * Validate chuyển trạng thái theo state machine
     */
    private static _isValidTransition(
        hienTai: TrangThaiLichHen,
        tiepTheo: TrangThaiLichHen,
    ): void {
        const allowed = VALID_TRANSITIONS[hienTai];
        if (!allowed.includes(tiepTheo)) {
            throw new AppError(
                `Không thể chuyển từ trạng thái "${hienTai}" sang "${tiepTheo}"`,
                400,
            );
        }
    }
}
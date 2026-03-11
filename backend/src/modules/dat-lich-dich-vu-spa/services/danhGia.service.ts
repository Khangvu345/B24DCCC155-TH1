import { IDanhGia } from '../models/danhGia.model';
import { LichHenService } from './lichHen.service';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId, getCurrentTimestamp } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'dat-lich-dich-vu-spa/danhGia.json';

export class DanhGiaService {
    // ── Lấy tất cả, hỗ trợ filter theo nhanVienId ──────────────────────────
    static getAll(nhanVienId?: string): IDanhGia[] {
        let data = readJsonFile<IDanhGia>(FILE_NAME);
        if (nhanVienId) {
            data = data.filter((d) => d.nhanVienId === nhanVienId);
        }
        return data;
    }

    // ── Lấy theo ID ────────────────────────────────────────────────────────
    static getById(id: string): IDanhGia {
        const data = readJsonFile<IDanhGia>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy đánh giá với id: ${id}`, 404);
        }
        return item;
    }

    // ── Tạo đánh giá mới ───────────────────────────────────────────────────
    static create(body: { lichHenId: string; soSao: number; nhanXet?: string }): IDanhGia {
        // 1. Lịch hẹn phải tồn tại
        const lichHen = LichHenService.getById(body.lichHenId);

        // 2. Lịch hẹn phải ở trạng thái 'hoanThanh'
        if (lichHen.trangThai !== 'hoanThanh') {
            throw new AppError(
                'Chỉ có thể đánh giá lịch hẹn đã hoàn thành',
                400,
            );
        }

        // 3. Mỗi lịch hẹn chỉ được đánh giá một lần
        const data = readJsonFile<IDanhGia>(FILE_NAME);
        const existing = data.find((d) => d.lichHenId === body.lichHenId);
        if (existing) {
            throw new AppError('Lịch hẹn này đã được đánh giá trước đó', 400);
        }

        const newItem: IDanhGia = {
            id: generateId(),
            lichHenId: body.lichHenId,
            nhanVienId: lichHen.nhanVienId, // denormalize để tính TB nhanh
            soSao: body.soSao,
            nhanXet: body.nhanXet,
            thoiGianTao: getCurrentTimestamp(),
        };

        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    // ── Nhân viên phản hồi đánh giá ────────────────────────────────────────
    static phanHoi(id: string, phanHoi: string): IDanhGia {
        const data = readJsonFile<IDanhGia>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy đánh giá với id: ${id}`, 404);
        }
        data[index] = {
            ...data[index],
            phanHoi,
            thoiGianPhanHoi: getCurrentTimestamp(),
        };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    // ── Tính điểm trung bình của nhân viên ─────────────────────────────────
    static diemTrungBinh(nhanVienId: string): {
        nhanVienId: string;
        diemTB: number;
        tongDanhGia: number;
    } {
        const data = readJsonFile<IDanhGia>(FILE_NAME).filter(
            (d) => d.nhanVienId === nhanVienId,
        );

        if (data.length === 0) {
            return { nhanVienId, diemTB: 0, tongDanhGia: 0 };
        }

        const tong = data.reduce((acc, d) => acc + d.soSao, 0);
        const diemTB = Math.round((tong / data.length) * 10) / 10; // 1 chữ số thập phân

        return { nhanVienId, diemTB, tongDanhGia: data.length };
    }
}
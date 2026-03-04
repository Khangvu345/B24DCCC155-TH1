import { ICauTrucDeThi, IDeThi } from '../models/deThi.model';
import { ICauHoi } from '../models/cauHoi.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId, getCurrentTimestamp } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const CAU_TRUC_FILE = 'cauTrucDeThi.json';
const DE_THI_FILE = 'deThi.json';
const CAU_HOI_FILE = 'cauHoi.json';

// ========================
// CauTrucDeThi Service
// ========================

export class CauTrucDeThiService {
    static getAll(): ICauTrucDeThi[] {
        return readJsonFile<ICauTrucDeThi>(CAU_TRUC_FILE);
    }

    static getById(id: string): ICauTrucDeThi {
        const data = readJsonFile<ICauTrucDeThi>(CAU_TRUC_FILE);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy cấu trúc đề thi với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<ICauTrucDeThi, 'id'>): ICauTrucDeThi {
        const data = readJsonFile<ICauTrucDeThi>(CAU_TRUC_FILE);
        const newItem: ICauTrucDeThi = {
            id: generateId(),
            ...body,
        };
        data.push(newItem);
        writeJsonFile(CAU_TRUC_FILE, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<ICauTrucDeThi, 'id'>>): ICauTrucDeThi {
        const data = readJsonFile<ICauTrucDeThi>(CAU_TRUC_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy cấu trúc đề thi với id: ${id}`, 404);
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(CAU_TRUC_FILE, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<ICauTrucDeThi>(CAU_TRUC_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy cấu trúc đề thi với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(CAU_TRUC_FILE, data);
    }
}

// ========================
// DeThi Service
// ========================

export class DeThiService {
    static getAll(): IDeThi[] {
        return readJsonFile<IDeThi>(DE_THI_FILE);
    }

    static getById(id: string): IDeThi & { cauHoiChiTiet: ICauHoi[] } {
        const data = readJsonFile<IDeThi>(DE_THI_FILE);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy đề thi với id: ${id}`, 404);
        }

        // Kèm chi tiết câu hỏi
        const allCauHoi = readJsonFile<ICauHoi>(CAU_HOI_FILE);
        const cauHoiChiTiet = item.danhSachCauHoi
            .map((chId) => allCauHoi.find((ch) => ch.id === chId))
            .filter(Boolean) as ICauHoi[];

        return { ...item, cauHoiChiTiet };
    }

    /**
     * Tạo đề thi tự động từ cấu trúc
     * Random câu hỏi theo từng yêu cầu (khối KT + mức độ + số câu)
     * Trả lỗi 400 nếu không đủ câu hỏi
     */
    static taoTuDong(body: { tieuDe: string; cauTrucDeThiId: string }): IDeThi {
        // 1. Lấy cấu trúc đề
        const cauTruc = CauTrucDeThiService.getById(body.cauTrucDeThiId);

        // 2. Lấy tất cả câu hỏi của môn học
        const allCauHoi = readJsonFile<ICauHoi>(CAU_HOI_FILE);
        const cauHoiMonHoc = allCauHoi.filter((ch) => ch.monHocId === cauTruc.monHocId);

        // 3. Random câu theo từng yêu cầu
        const danhSachCauHoi: string[] = [];
        const errors: string[] = [];

        for (const yeuCau of cauTruc.danhSachYeuCau) {
            // Lọc câu hỏi phù hợp (chưa được chọn)
            const cauPhuHop = cauHoiMonHoc.filter(
                (ch) =>
                    ch.khoiKienThucId === yeuCau.khoiKienThucId &&
                    ch.mucDo === yeuCau.mucDo &&
                    !danhSachCauHoi.includes(ch.id)
            );

            if (cauPhuHop.length < yeuCau.soCau) {
                errors.push(
                    `Thiếu câu hỏi: cần ${yeuCau.soCau} câu [khối KT: ${yeuCau.khoiKienThucId}, mức độ: ${yeuCau.mucDo}], chỉ có ${cauPhuHop.length} câu`
                );
                continue;
            }

            // Shuffle và lấy số câu cần thiết
            const shuffled = cauPhuHop.sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, yeuCau.soCau);
            danhSachCauHoi.push(...selected.map((ch) => ch.id));
        }

        // 4. Nếu có lỗi (thiếu câu) -> báo lỗi
        if (errors.length > 0) {
            throw new AppError(
                `Không thể tạo đề thi. ${errors.join('. ')}`,
                400
            );
        }

        // 5. Tạo đề thi
        const deThiData = readJsonFile<IDeThi>(DE_THI_FILE);
        const newDeThi: IDeThi = {
            id: generateId(),
            tieuDe: body.tieuDe,
            monHocId: cauTruc.monHocId,
            cauTrucDeThiId: body.cauTrucDeThiId,
            danhSachCauHoi,
            ngayTao: getCurrentTimestamp(),
        };

        deThiData.push(newDeThi);
        writeJsonFile(DE_THI_FILE, deThiData);
        return newDeThi;
    }

    static update(id: string, body: { tieuDe?: string }): IDeThi {
        const data = readJsonFile<IDeThi>(DE_THI_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy đề thi với id: ${id}`, 404);
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(DE_THI_FILE, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<IDeThi>(DE_THI_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy đề thi với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(DE_THI_FILE, data);
    }
}

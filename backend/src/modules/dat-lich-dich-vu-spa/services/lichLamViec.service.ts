import { ILichLamViec } from '../models/lichLamViec.model';
import { NhanVienService } from './nhanVien.service';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'dat-lich-dich-vu-spa/lichLamViec.json';

export class LichLamViecService {
    static getAll(nhanVienId?: string): ILichLamViec[] {
        let data = readJsonFile<ILichLamViec>(FILE_NAME);
        if (nhanVienId) {
            data = data.filter((d) => d.nhanVienId === nhanVienId);
        }
        return data;
    }

    static getById(id: string): ILichLamViec {
        const data = readJsonFile<ILichLamViec>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy lịch làm việc với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<ILichLamViec, 'id'>): ILichLamViec {
        // Nhân viên phải tồn tại
        NhanVienService.getById(body.nhanVienId);

        const data = readJsonFile<ILichLamViec>(FILE_NAME);
        // Kiểm tra trùng ca: cùng nhanVienId + cùng thứ
        const existing = data.find(
            (d) => d.nhanVienId === body.nhanVienId && d.thu === body.thu,
        );
        if (existing) {
            throw new AppError(
                `Nhân viên đã có lịch làm việc vào thứ ${body.thu} rồi`,
                400,
            );
        }
        const newItem: ILichLamViec = { id: generateId(), ...body };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<ILichLamViec, 'id'>>): ILichLamViec {
        const data = readJsonFile<ILichLamViec>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy lịch làm việc với id: ${id}`, 404);
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<ILichLamViec>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy lịch làm việc với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }

    /**
     * Lấy lịch làm việc trong tuần của một nhân viên (dạng map theo thứ)
     */
    static getLichTuan(nhanVienId: string): ILichLamViec[] {
        NhanVienService.getById(nhanVienId);
        return readJsonFile<ILichLamViec>(FILE_NAME)
            .filter((d) => d.nhanVienId === nhanVienId)
            .sort((a, b) => a.thu - b.thu);
    }
}

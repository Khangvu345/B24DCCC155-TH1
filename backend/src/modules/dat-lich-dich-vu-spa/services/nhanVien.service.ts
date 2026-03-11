import { INhanVien } from '../models/nhanVien.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'dat-lich-dich-vu-spa/nhanVien.json';

export class NhanVienService {
    static getAll(): INhanVien[] {
        return readJsonFile<INhanVien>(FILE_NAME);
    }

    static getById(id: string): INhanVien {
        const data = readJsonFile<INhanVien>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<INhanVien, 'id'>): INhanVien {
        const data = readJsonFile<INhanVien>(FILE_NAME);
        // Kiểm tra trùng SĐT
        const existing = data.find((d) => d.soDienThoai === body.soDienThoai);
        if (existing) {
            throw new AppError(`Số điện thoại "${body.soDienThoai}" đã tồn tại`, 400);
        }
        const newItem: INhanVien = { id: generateId(), ...body };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<INhanVien, 'id'>>): INhanVien {
        const data = readJsonFile<INhanVien>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }
        // Kiểm tra trùng SĐT nếu đổi
        if (body.soDienThoai && body.soDienThoai !== data[index].soDienThoai) {
            const existing = data.find((d) => d.soDienThoai === body.soDienThoai);
            if (existing) {
                throw new AppError(`Số điện thoại "${body.soDienThoai}" đã tồn tại`, 400);
            }
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<INhanVien>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }
}
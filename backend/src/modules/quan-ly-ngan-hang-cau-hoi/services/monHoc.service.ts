import { IMonHoc } from '../models/monHoc.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'monHoc.json';

export class MonHocService {
    static getAll(): IMonHoc[] {
        return readJsonFile<IMonHoc>(FILE_NAME);
    }

    static getById(id: string): IMonHoc {
        const data = readJsonFile<IMonHoc>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy môn học với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<IMonHoc, 'id'>): IMonHoc {
        const data = readJsonFile<IMonHoc>(FILE_NAME);

        // Kiểm tra trùng mã môn học
        const existing = data.find((d) => d.maMonHoc === body.maMonHoc);
        if (existing) {
            throw new AppError(`Mã môn học "${body.maMonHoc}" đã tồn tại`, 400);
        }

        const newItem: IMonHoc = {
            id: generateId(),
            ...body,
        };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<IMonHoc, 'id'>>): IMonHoc {
        const data = readJsonFile<IMonHoc>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy môn học với id: ${id}`, 404);
        }

        // Kiểm tra trùng mã nếu đổi mã
        if (body.maMonHoc && body.maMonHoc !== data[index].maMonHoc) {
            const existing = data.find((d) => d.maMonHoc === body.maMonHoc);
            if (existing) {
                throw new AppError(`Mã môn học "${body.maMonHoc}" đã tồn tại`, 400);
            }
        }

        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<IMonHoc>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy môn học với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }
}

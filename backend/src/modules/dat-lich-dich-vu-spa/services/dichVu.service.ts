import { IDichVu } from '../models/dichVu.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'dichVu.json';

export class DichVuService {
    static getAll(): IDichVu[] {
        return readJsonFile<IDichVu>(FILE_NAME);
    }

    static getById(id: string): IDichVu {
        const data = readJsonFile<IDichVu>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy dịch vụ với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<IDichVu, 'id'>): IDichVu {
        const data = readJsonFile<IDichVu>(FILE_NAME);

        const existing = data.find((d) => d.tenDichVu === body.tenDichVu);
        if (existing) {
            throw new AppError(`Dịch vụ có tên "${body.tenDichVu}" đã tồn tại`, 400);
        }

        const newItem: IDichVu = {
            id: generateId(),
            ...body,
        };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<IDichVu, 'id'>>): IDichVu {
        const data = readJsonFile<IDichVu>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy dịch vụ với id: ${id}`, 404);
        }

        if (body.tenDichVu && body.tenDichVu !== data[index].tenDichVu) {
            const existing = data.find((d) => d.tenDichVu === body.tenDichVu);
            if (existing) {
                throw new AppError(`Dịch vụ có tên "${body.tenDichVu}" đã tồn tại`, 400);
            }
        }

        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<IDichVu>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy dịch vụ với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }
}
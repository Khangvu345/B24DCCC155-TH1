import { IKhoiKienThuc } from '../models/khoiKienThuc.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'khoiKienThuc.json';

export class KhoiKienThucService {
    static getAll(): IKhoiKienThuc[] {
        return readJsonFile<IKhoiKienThuc>(FILE_NAME);
    }

    static getById(id: string): IKhoiKienThuc {
        const data = readJsonFile<IKhoiKienThuc>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy khối kiến thức với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: { ten: string }): IKhoiKienThuc {
        const data = readJsonFile<IKhoiKienThuc>(FILE_NAME);
        const newItem: IKhoiKienThuc = {
            id: generateId(),
            ten: body.ten,
        };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: { ten: string }): IKhoiKienThuc {
        const data = readJsonFile<IKhoiKienThuc>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy khối kiến thức với id: ${id}`, 404);
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<IKhoiKienThuc>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy khối kiến thức với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }
}

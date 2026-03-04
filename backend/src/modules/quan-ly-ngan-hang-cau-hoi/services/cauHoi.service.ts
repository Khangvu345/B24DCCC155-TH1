import { ICauHoi, MucDo } from '../models/cauHoi.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';

const FILE_NAME = 'cauHoi.json';

interface CauHoiFilter {
    monHocId?: string;
    mucDo?: MucDo;
    khoiKienThucId?: string;
}

export class CauHoiService {
    /**
     * Lấy danh sách, hỗ trợ filter theo monHocId, mucDo, khoiKienThucId
     */
    static getAll(filter: CauHoiFilter = {}): ICauHoi[] {
        let data = readJsonFile<ICauHoi>(FILE_NAME);

        if (filter.monHocId) {
            data = data.filter((d) => d.monHocId === filter.monHocId);
        }
        if (filter.mucDo) {
            data = data.filter((d) => d.mucDo === filter.mucDo);
        }
        if (filter.khoiKienThucId) {
            data = data.filter((d) => d.khoiKienThucId === filter.khoiKienThucId);
        }

        return data;
    }

    static getById(id: string): ICauHoi {
        const data = readJsonFile<ICauHoi>(FILE_NAME);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy câu hỏi với id: ${id}`, 404);
        }
        return item;
    }

    static create(body: Omit<ICauHoi, 'id'>): ICauHoi {
        const data = readJsonFile<ICauHoi>(FILE_NAME);
        const newItem: ICauHoi = {
            id: generateId(),
            ...body,
        };
        data.push(newItem);
        writeJsonFile(FILE_NAME, data);
        return newItem;
    }

    static update(id: string, body: Partial<Omit<ICauHoi, 'id'>>): ICauHoi {
        const data = readJsonFile<ICauHoi>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy câu hỏi với id: ${id}`, 404);
        }
        data[index] = { ...data[index], ...body };
        writeJsonFile(FILE_NAME, data);
        return data[index];
    }

    static delete(id: string): void {
        const data = readJsonFile<ICauHoi>(FILE_NAME);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy câu hỏi với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(FILE_NAME, data);
    }
}

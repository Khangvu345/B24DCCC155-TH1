import { INhanVien } from '../models/nhanVien.model';
import { ILichLamViec } from '../models/lichLamViec.model';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { AppError } from '../../../middlewares/errorHandler';
import jwt from 'jsonwebtoken';

const NV_FILE = 'nhanVien.json';
const LICH_FILE = 'lichLamViec.json';

const JWT_SECRET = process.env.JWT_SECRET || 'dat_lich_spa_secret_key_123';

export class NhanVienService {
    static getAll(): Omit<INhanVien, 'password'>[] {
        const data = readJsonFile<INhanVien>(NV_FILE);
        return data.map(nv => {
            const { password, ...rest } = nv;
            return rest;
        });
    }

    static getById(id: string): Omit<INhanVien, 'password'> {
        const data = readJsonFile<INhanVien>(NV_FILE);
        const item = data.find((d) => d.id === id);
        if (!item) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }
        const { password, ...rest } = item;
        return rest;
    }

    static create(body: Omit<INhanVien, 'id'>): Omit<INhanVien, 'password'> {
        const data = readJsonFile<INhanVien>(NV_FILE);

        const existing = data.find((d) => d.email === body.email);
        if (existing) {
            throw new AppError(`Email "${body.email}" đã tồn tại`, 400);
        }

        const newItem: INhanVien = {
            id: generateId(),
            ...body,
        };
        data.push(newItem);
        writeJsonFile(NV_FILE, data);
        
        const { password, ...rest } = newItem;
        return rest;
    }

    static update(id: string, body: Partial<Omit<INhanVien, 'id'>>): Omit<INhanVien, 'password'> {
        const data = readJsonFile<INhanVien>(NV_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }

        if (body.email && body.email !== data[index].email) {
            const existing = data.find((d) => d.email === body.email);
            if (existing) {
                throw new AppError(`Email "${body.email}" đã tồn tại`, 400);
            }
        }

        data[index] = { ...data[index], ...body };
        writeJsonFile(NV_FILE, data);
        
        const { password, ...rest } = data[index];
        return rest;
    }

    static delete(id: string): void {
        const data = readJsonFile<INhanVien>(NV_FILE);
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
            throw new AppError(`Không tìm thấy nhân viên với id: ${id}`, 404);
        }
        data.splice(index, 1);
        writeJsonFile(NV_FILE, data);

        // Optional: Xóa các lịch làm việc của nhân viên này
        let lichData = readJsonFile<ILichLamViec>(LICH_FILE);
        lichData = lichData.filter(l => l.nhanVienId !== id);
        writeJsonFile(LICH_FILE, lichData);
    }

    static login(email: string, passwordString: string): { token: string; user: Omit<INhanVien, 'password'> } {
        const data = readJsonFile<INhanVien>(NV_FILE);
        const user = data.find(u => u.email === email && u.password === passwordString);
        
        if (!user) {
            throw new AppError('Email hoặc mật khẩu không chính xác', 401);
        }

        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ id: user.id, vaiTro: user.vaiTro }, JWT_SECRET, { expiresIn: '1d' });
        
        return { token, user: userWithoutPassword };
    }
}
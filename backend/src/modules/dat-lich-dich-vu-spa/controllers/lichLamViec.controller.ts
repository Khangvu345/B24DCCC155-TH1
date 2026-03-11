import { Request, Response, NextFunction } from 'express';
import { NhanVienService } from '../services/nhanVien.service';
import { readJsonFile, writeJsonFile } from '../../../config/database';
import { generateId } from '../../../utils/helpers';
import { ILichLamViec } from '../models/lichLamViec.model';

const LICH_FILE = 'lichLamViec.json';

export class LichLamViecController {
    static getByNhanVienId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            // Kiểm tra nhân viên có tồn tại không
            NhanVienService.getById(id);
            
            const data = readJsonFile<ILichLamViec>(LICH_FILE);
            const lsLich = data.filter(l => l.nhanVienId === id);
            res.json({ success: true, data: lsLich });
        } catch (error) {
            next(error);
        }
    }

    static updateForNhanVien(req: Request, res: Response, next: NextFunction) {
        try {
            // Kiểm tra nhân viên có tồn tại không
            const nvId = req.params.id as string;
            NhanVienService.getById(nvId);

            const inputLich: Omit<ILichLamViec, 'id' | 'nhanVienId'>[] = req.body.lichLamViec;
            if (!Array.isArray(inputLich)) {
                return res.status(400).json({ success: false, message: 'lichLamViec phải là một mảng' });
            }

            let data = readJsonFile<ILichLamViec>(LICH_FILE);
            
            // Xóa lịch cũ của nhân viên này
            data = data.filter(l => l.nhanVienId !== nvId);

            // Thêm lịch mới
            const newLichList: ILichLamViec[] = inputLich.map(l => ({
                id: generateId(),
                nhanVienId: nvId,
                ngayLam: l.ngayLam,
                caLamViec: l.caLamViec,
                trangThai: l.trangThai || 'co_san'
            }));

            data.push(...newLichList);
            writeJsonFile(LICH_FILE, data);

            res.json({ success: true, message: 'Cập nhật lịch làm việc thành công', data: newLichList });
        } catch (error) {
            next(error);
        }
    }
}

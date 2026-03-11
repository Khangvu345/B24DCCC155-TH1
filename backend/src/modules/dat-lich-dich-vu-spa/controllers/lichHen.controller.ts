import { Request, Response, NextFunction } from 'express';
import { LichHenService } from '../services/lichHen.service';
import { TrangThaiLichHen } from '../models/lichHen.model';

export class LichHenController {
    static getAll(req: Request, res: Response, next: NextFunction): void {
        try {
            const { nhanVienId, ngay, trangThai, khachHangId } = req.query;
            const data = LichHenService.getAll({
                nhanVienId: nhanVienId as string | undefined,
                ngay: ngay as string | undefined,
                trangThai: trangThai as TrangThaiLichHen | undefined,
                khachHangId: khachHangId as string | undefined,
            });
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = LichHenService.getById(req.params['id'] as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = LichHenService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = LichHenService.update(req.params['id'] as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            LichHenService.delete(req.params['id'] as string);
            res.json({ success: true, message: 'Xóa lịch hẹn thành công' });
        } catch (error) {
            next(error);
        }
    }

    static doiTrangThai(req: Request, res: Response, next: NextFunction): void {
        try {
            const { trangThai } = req.body as { trangThai: TrangThaiLichHen };
            const data = LichHenService.doiTrangThai(req.params['id'] as string, trangThai);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }
}
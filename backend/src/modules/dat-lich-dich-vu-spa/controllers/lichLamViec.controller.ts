import { Request, Response, NextFunction } from 'express';
import { LichLamViecService } from '../services/lichLamViec.service';

export class LichLamViecController {
    static getAll(req: Request, res: Response, next: NextFunction): void {
        try {
            const { nhanVienId } = req.query;
            res.json({ success: true, data: LichLamViecService.getAll(nhanVienId as string | undefined) });
        } catch (error) { next(error); }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: LichLamViecService.getById(req.params['id'] as string) });
        } catch (error) { next(error); }
    }

    static getLichTuan(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: LichLamViecService.getLichTuan(req.params['nhanVienId'] as string) });
        } catch (error) { next(error); }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            res.status(201).json({ success: true, data: LichLamViecService.create(req.body) });
        } catch (error) { next(error); }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: LichLamViecService.update(req.params['id'] as string, req.body) });
        } catch (error) { next(error); }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            LichLamViecService.delete(req.params['id'] as string);
            res.json({ success: true, message: 'Xóa lịch làm việc thành công' });
        } catch (error) { next(error); }
    }
}

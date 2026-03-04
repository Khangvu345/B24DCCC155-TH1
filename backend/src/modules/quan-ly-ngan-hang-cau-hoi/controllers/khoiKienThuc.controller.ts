import { Request, Response, NextFunction } from 'express';
import { KhoiKienThucService } from '../services/khoiKienThuc.service';

export class KhoiKienThucController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            const data = KhoiKienThucService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = KhoiKienThucService.getById(req.params.id as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = KhoiKienThucService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = KhoiKienThucService.update(req.params.id as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            KhoiKienThucService.delete(req.params.id as string);
            res.json({ success: true, message: 'Xoá thành công' });
        } catch (error) {
            next(error);
        }
    }
}

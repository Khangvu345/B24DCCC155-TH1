import { Request, Response, NextFunction } from 'express';
import { DichVuService } from '../services/dichVu.service';

export class DichVuController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: DichVuService.getAll() });
        } catch (error) { next(error); }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: DichVuService.getById(req.params['id'] as string) });
        } catch (error) { next(error); }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            res.status(201).json({ success: true, data: DichVuService.create(req.body) });
        } catch (error) { next(error); }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: DichVuService.update(req.params['id'] as string, req.body) });
        } catch (error) { next(error); }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            DichVuService.delete(req.params['id'] as string);
            res.json({ success: true, message: 'Xóa dịch vụ thành công' });
        } catch (error) { next(error); }
    }
}
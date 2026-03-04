import { Request, Response, NextFunction } from 'express';
import { MonHocService } from '../services/monHoc.service';

export class MonHocController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            const data = MonHocService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = MonHocService.getById(req.params.id as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = MonHocService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = MonHocService.update(req.params.id as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            MonHocService.delete(req.params.id as string);
            res.json({ success: true, message: 'Xoá thành công' });
        } catch (error) {
            next(error);
        }
    }
}

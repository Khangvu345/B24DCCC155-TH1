import { Request, Response, NextFunction } from 'express';
import { NhanVienService } from '../services/nhanVien.service';

export class NhanVienController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: NhanVienService.getAll() });
        } catch (error) { next(error); }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: NhanVienService.getById(req.params['id'] as string) });
        } catch (error) { next(error); }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            res.status(201).json({ success: true, data: NhanVienService.create(req.body) });
        } catch (error) { next(error); }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: NhanVienService.update(req.params['id'] as string, req.body) });
        } catch (error) { next(error); }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            NhanVienService.delete(req.params['id'] as string);
            res.json({ success: true, message: 'Xóa nhân viên thành công' });
        } catch (error) { next(error); }
    }
}
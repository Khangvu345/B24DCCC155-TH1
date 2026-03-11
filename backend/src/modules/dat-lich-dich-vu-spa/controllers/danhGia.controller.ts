import { Request, Response, NextFunction } from 'express';
import { DanhGiaService } from '../services/danhGia.service';

export class DanhGiaController {
    static getAll(req: Request, res: Response, next: NextFunction): void {
        try {
            const { nhanVienId } = req.query;
            const data = DanhGiaService.getAll(nhanVienId as string | undefined);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DanhGiaService.getById(req.params['id'] as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DanhGiaService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static phanHoi(req: Request, res: Response, next: NextFunction): void {
        try {
            const { phanHoi } = req.body as { phanHoi: string };
            const data = DanhGiaService.phanHoi(req.params['id'] as string, phanHoi);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static diemTrungBinh(req: Request, res: Response, next: NextFunction): void {
        try {
            const result = DanhGiaService.diemTrungBinh(req.params['nhanVienId'] as string);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }
}
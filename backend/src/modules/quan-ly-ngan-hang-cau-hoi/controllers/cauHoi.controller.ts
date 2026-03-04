import { Request, Response, NextFunction } from 'express';
import { CauHoiService } from '../services/cauHoi.service';
import { MucDo } from '../models/cauHoi.model';

export class CauHoiController {
    static getAll(req: Request, res: Response, next: NextFunction): void {
        try {
            const filter = {
                monHocId: req.query.monHocId as string | undefined,
                mucDo: req.query.mucDo as MucDo | undefined,
                khoiKienThucId: req.query.khoiKienThucId as string | undefined,
            };
            const data = CauHoiService.getAll(filter);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauHoiService.getById(req.params.id as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauHoiService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauHoiService.update(req.params.id as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            CauHoiService.delete(req.params.id as string);
            res.json({ success: true, message: 'Xoá thành công' });
        } catch (error) {
            next(error);
        }
    }
}

import { Request, Response, NextFunction } from 'express';
import { DichVuService } from '../services/dichVu.service';
import { dichVuSchema, dichVuUpdateSchema } from '../validations/dichVu.validation';

export class DichVuController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = DichVuService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = DichVuService.getById(id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = dichVuSchema.parse(req.body);
            const data = DichVuService.create(validatedData);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const validatedData = dichVuUpdateSchema.parse(req.body);
            const data = DichVuService.update(id, validatedData);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            DichVuService.delete(id);
            res.json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            next(error);
        }
    }
}
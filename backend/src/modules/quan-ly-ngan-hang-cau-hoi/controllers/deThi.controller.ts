import { Request, Response, NextFunction } from 'express';
import { CauTrucDeThiService, DeThiService } from '../services/deThi.service';

// ========================
// CauTrucDeThi Controller
// ========================

export class CauTrucDeThiController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauTrucDeThiService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauTrucDeThiService.getById(req.params.id as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauTrucDeThiService.create(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = CauTrucDeThiService.update(req.params.id as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            CauTrucDeThiService.delete(req.params.id as string);
            res.json({ success: true, message: 'Xoá thành công' });
        } catch (error) {
            next(error);
        }
    }
}

// ========================
// DeThi Controller
// ========================

export class DeThiController {
    static getAll(_req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DeThiService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DeThiService.getById(req.params.id as string);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Tạo đề thi tự động từ cấu trúc
     */
    static taoTuDong(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DeThiService.taoTuDong(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        try {
            const data = DeThiService.update(req.params.id as string, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction): void {
        try {
            DeThiService.delete(req.params.id as string);
            res.json({ success: true, message: 'Xoá thành công' });
        } catch (error) {
            next(error);
        }
    }
}

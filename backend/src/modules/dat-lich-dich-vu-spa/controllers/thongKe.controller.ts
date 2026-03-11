import { Request, Response, NextFunction } from 'express';
import { ThongKeService } from '../services/thongKe.service';

export class ThongKeController {
    static getDoanhThu(req: Request, res: Response, next: NextFunction) {
        try {
            const data = ThongKeService.getDoanhThu();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getThongKeLichHen(req: Request, res: Response, next: NextFunction) {
        try {
            const data = ThongKeService.getThongKeLichHen();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }
}
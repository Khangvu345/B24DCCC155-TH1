import { Request, Response, NextFunction } from 'express';
import { ThongKeService } from '../services/thongKe.service';

export class ThongKeController {
    static tongQuan(_req: Request, res: Response, next: NextFunction): void {
        try {
            res.json({ success: true, data: ThongKeService.tongQuan() });
        } catch (error) { next(error); }
    }

    static thongKeLichHen(req: Request, res: Response, next: NextFunction): void {
        try {
            const { tuNgay, denNgay } = req.query;
            const data = ThongKeService.thongKeLichHen(
                tuNgay as string | undefined,
                denNgay as string | undefined,
            );
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }

    static thongKeDoanhThu(req: Request, res: Response, next: NextFunction): void {
        try {
            const { tuNgay, denNgay } = req.query;
            const data = ThongKeService.thongKeDoanhThu(
                tuNgay as string | undefined,
                denNgay as string | undefined,
            );
            res.json({ success: true, data });
        } catch (error) { next(error); }
    }
}
import { Router } from 'express';
import { ThongKeController } from '../controllers/thongKe.controller';

const router = Router();

router.get('/doanh-thu', ThongKeController.getDoanhThu);
router.get('/lich-hen', ThongKeController.getThongKeLichHen);

export default router;
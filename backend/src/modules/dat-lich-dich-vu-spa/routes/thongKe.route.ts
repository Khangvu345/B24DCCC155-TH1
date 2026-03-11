import { Router } from 'express';
import { ThongKeController } from '../controllers/thongKe.controller';

const router = Router();

router.get('/tong-quan', ThongKeController.tongQuan);
router.get('/lich-hen', ThongKeController.thongKeLichHen);
router.get('/doanh-thu', ThongKeController.thongKeDoanhThu);

export default router;
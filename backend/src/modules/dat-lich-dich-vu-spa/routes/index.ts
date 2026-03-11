import { Router } from 'express';
import lichHenRouter from './lichHen.route';
import danhGiaRouter from './danhGia.route';
import nhanVienRouter from './nhanVien.route';
import dichVuRouter from './dichVu.route';
import lichLamViecRouter from './lichLamViec.route';
import thongKeRouter from './thongKe.route';

const router = Router();

router.use('/nhan-vien', nhanVienRouter);
router.use('/dich-vu', dichVuRouter);
router.use('/lich-lam-viec', lichLamViecRouter);
router.use('/lich-hen', lichHenRouter);
router.use('/danh-gia', danhGiaRouter);
router.use('/thong-ke', thongKeRouter);

export default router;
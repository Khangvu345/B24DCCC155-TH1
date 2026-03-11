import { Router } from 'express';
import nhanVienRoutes from './nhanVien.route';
import dichVuRoutes from './dichVu.route';
import thongKeRoutes from './thongKe.route';

const router = Router();

router.use('/nhan-vien', nhanVienRoutes);
router.use('/dich-vu', dichVuRoutes);
// Lịch làm việc đã được nhúng trong /nhan-vien/:id/lich-lam-viec
router.use('/thong-ke', thongKeRoutes);

export default router;
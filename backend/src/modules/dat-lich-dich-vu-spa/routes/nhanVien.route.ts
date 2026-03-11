import { Router } from 'express';
import { NhanVienController } from '../controllers/nhanVien.controller';
import { LichLamViecController } from '../controllers/lichLamViec.controller';

const router = Router();

router.get('/', NhanVienController.getAll);
router.get('/:id', NhanVienController.getById);
router.post('/', NhanVienController.create);
router.put('/:id', NhanVienController.update);
router.delete('/:id', NhanVienController.delete);
router.post('/login', NhanVienController.login);

// Phần lịch làm việc của nhân viên
router.get('/:id/lich-lam-viec', LichLamViecController.getByNhanVienId);
router.put('/:id/lich-lam-viec', LichLamViecController.updateForNhanVien);

export default router;
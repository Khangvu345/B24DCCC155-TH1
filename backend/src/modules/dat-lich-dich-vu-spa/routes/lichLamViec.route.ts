import { Router } from 'express';
import { LichLamViecController } from '../controllers/lichLamViec.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createLichLamViecSchema, updateLichLamViecSchema } from '../validations/lichLamViec.validation';

const router = Router();

// Route tĩnh đặt TRƯỚC /:id để tránh nhầm param
router.get('/nhan-vien/:nhanVienId', LichLamViecController.getLichTuan);

router.get('/', LichLamViecController.getAll);
router.get('/:id', LichLamViecController.getById);
router.post('/', validateRequest(createLichLamViecSchema), LichLamViecController.create);
router.put('/:id', validateRequest(updateLichLamViecSchema), LichLamViecController.update);
router.delete('/:id', LichLamViecController.delete);

export default router;

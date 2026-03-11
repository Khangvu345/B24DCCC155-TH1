import { Router } from 'express';
import { NhanVienController } from '../controllers/nhanVien.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createNhanVienSchema, updateNhanVienSchema } from '../validations/nhanVien.validation';

const router = Router();

router.get('/', NhanVienController.getAll);
router.get('/:id', NhanVienController.getById);
router.post('/', validateRequest(createNhanVienSchema), NhanVienController.create);
router.put('/:id', validateRequest(updateNhanVienSchema), NhanVienController.update);
router.delete('/:id', NhanVienController.delete);

export default router;
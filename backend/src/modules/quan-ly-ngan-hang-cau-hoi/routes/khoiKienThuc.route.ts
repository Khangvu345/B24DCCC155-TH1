import { Router } from 'express';
import { KhoiKienThucController } from '../controllers/khoiKienThuc.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
    createKhoiKienThucSchema,
    updateKhoiKienThucSchema,
} from '../validations/khoiKienThuc.validation';

const router = Router();

router.get('/', KhoiKienThucController.getAll);
router.get('/:id', KhoiKienThucController.getById);
router.post('/', validateRequest(createKhoiKienThucSchema), KhoiKienThucController.create);
router.put('/:id', validateRequest(updateKhoiKienThucSchema), KhoiKienThucController.update);
router.delete('/:id', KhoiKienThucController.delete);

export default router;

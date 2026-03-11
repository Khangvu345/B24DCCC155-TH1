import { Router } from 'express';
import { LichHenController } from '../controllers/lichHen.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
    createLichHenSchema,
    updateLichHenSchema,
    doiTrangThaiSchema,
} from '../validations/lichHen.validation';

const router = Router();

router.get('/', LichHenController.getAll);
router.get('/:id', LichHenController.getById);
router.post('/', validateRequest(createLichHenSchema), LichHenController.create);
router.put('/:id', validateRequest(updateLichHenSchema), LichHenController.update);
router.delete('/:id', LichHenController.delete);
router.patch('/:id/trang-thai', validateRequest(doiTrangThaiSchema), LichHenController.doiTrangThai);

export default router;
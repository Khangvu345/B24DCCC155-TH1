import { Router } from 'express';
import { CauHoiController } from '../controllers/cauHoi.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
    createCauHoiSchema,
    updateCauHoiSchema,
} from '../validations/cauHoi.validation';

const router = Router();

router.get('/', CauHoiController.getAll);
router.get('/:id', CauHoiController.getById);
router.post('/', validateRequest(createCauHoiSchema), CauHoiController.create);
router.put('/:id', validateRequest(updateCauHoiSchema), CauHoiController.update);
router.delete('/:id', CauHoiController.delete);

export default router;

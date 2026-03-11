import { Router } from 'express';
import { DichVuController } from '../controllers/dichVu.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createDichVuSchema, updateDichVuSchema } from '../validations/dichVu.validation';

const router = Router();

router.get('/', DichVuController.getAll);
router.get('/:id', DichVuController.getById);
router.post('/', validateRequest(createDichVuSchema), DichVuController.create);
router.put('/:id', validateRequest(updateDichVuSchema), DichVuController.update);
router.delete('/:id', DichVuController.delete);

export default router;
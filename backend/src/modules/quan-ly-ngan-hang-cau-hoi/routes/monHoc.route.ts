import { Router } from 'express';
import { MonHocController } from '../controllers/monHoc.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
    createMonHocSchema,
    updateMonHocSchema,
} from '../validations/monHoc.validation';

const router = Router();

router.get('/', MonHocController.getAll);
router.get('/:id', MonHocController.getById);
router.post('/', validateRequest(createMonHocSchema), MonHocController.create);
router.put('/:id', validateRequest(updateMonHocSchema), MonHocController.update);
router.delete('/:id', MonHocController.delete);

export default router;

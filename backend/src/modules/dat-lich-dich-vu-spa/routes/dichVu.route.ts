import { Router } from 'express';
import { DichVuController } from '../controllers/dichVu.controller';

const router = Router();

router.get('/', DichVuController.getAll);
router.get('/:id', DichVuController.getById);
router.post('/', DichVuController.create);
router.put('/:id', DichVuController.update);
router.delete('/:id', DichVuController.delete);

export default router;
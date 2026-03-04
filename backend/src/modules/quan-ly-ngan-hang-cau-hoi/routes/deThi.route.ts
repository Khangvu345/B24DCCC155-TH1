import { Router } from 'express';
import { CauTrucDeThiController, DeThiController } from '../controllers/deThi.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
    createCauTrucDeThiSchema,
    updateCauTrucDeThiSchema,
    taoDeThiTuDongSchema,
    updateDeThiSchema,
} from '../validations/deThi.validation';

const cauTrucRouter = Router();
const deThiRouter = Router();

// ===== Cấu trúc đề thi =====
cauTrucRouter.get('/', CauTrucDeThiController.getAll);
cauTrucRouter.get('/:id', CauTrucDeThiController.getById);
cauTrucRouter.post('/', validateRequest(createCauTrucDeThiSchema), CauTrucDeThiController.create);
cauTrucRouter.put('/:id', validateRequest(updateCauTrucDeThiSchema), CauTrucDeThiController.update);
cauTrucRouter.delete('/:id', CauTrucDeThiController.delete);

// ===== Đề thi =====
deThiRouter.get('/', DeThiController.getAll);
deThiRouter.get('/:id', DeThiController.getById);
deThiRouter.post('/tao-tu-dong', validateRequest(taoDeThiTuDongSchema), DeThiController.taoTuDong);
deThiRouter.put('/:id', validateRequest(updateDeThiSchema), DeThiController.update);
deThiRouter.delete('/:id', DeThiController.delete);

export { cauTrucRouter, deThiRouter };

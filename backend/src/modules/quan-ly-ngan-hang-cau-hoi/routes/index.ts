import { Router } from 'express';
import khoiKienThucRouter from './khoiKienThuc.route';
import monHocRouter from './monHoc.route';
import cauHoiRouter from './cauHoi.route';
import { cauTrucRouter, deThiRouter } from './deThi.route';

const router = Router();

router.use('/khoi-kien-thuc', khoiKienThucRouter);
router.use('/mon-hoc', monHocRouter);
router.use('/cau-hoi', cauHoiRouter);
router.use('/cau-truc-de-thi', cauTrucRouter);
router.use('/de-thi', deThiRouter);

export default router;

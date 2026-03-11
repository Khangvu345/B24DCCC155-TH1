import { Router } from 'express';
import lichHenRouter from './lichHen.route';
import danhGiaRouter from './danhGia.route';

const router = Router();

router.use('/lich-hen', lichHenRouter);
router.use('/danh-gia', danhGiaRouter);

export default router;
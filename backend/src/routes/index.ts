import { Router } from 'express';
import quanLyNganHangCauHoiRouter from '../modules/quan-ly-ngan-hang-cau-hoi/routes';
import datLichDichVuSpaRouter from '../modules/dat-lich-dich-vu-spa/routes';

export const rootRouter = Router();

// Mount module routes
rootRouter.use('/quan-ly-ngan-hang-cau-hoi', quanLyNganHangCauHoiRouter);
rootRouter.use('/dat-lich-dich-vu-spa', datLichDichVuSpaRouter);

// Health check
rootRouter.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Server đang hoạt động', timestamp: new Date().toISOString() });
});

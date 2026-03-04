import { Router } from 'express';
import quanLyNganHangCauHoiRouter from '../modules/quan-ly-ngan-hang-cau-hoi/routes';

export const rootRouter = Router();

// Mount module routes
rootRouter.use('/quan-ly-ngan-hang-cau-hoi', quanLyNganHangCauHoiRouter);

// Health check
rootRouter.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Server đang hoạt động', timestamp: new Date().toISOString() });
});

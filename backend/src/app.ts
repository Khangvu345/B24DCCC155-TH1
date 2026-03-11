import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { rootRouter } from './routes';

const app = express();

// CORS - cho phép FE từ port khác truy cập
app.use(cors());

// Parse JSON body
app.use(express.json());

// Root route - hiển thị danh sách API endpoints
app.get('/', (_req, res) => {
    res.json({
        message: 'Backend Đặt Lịch Dịch Vụ Spa',
        endpoints: {
            health: '/api/health',
            khoiKienThuc: '/api/quan-ly-ngan-hang-cau-hoi/khoi-kien-thuc',
            monHoc: '/api/quan-ly-ngan-hang-cau-hoi/mon-hoc',
            cauHoi: '/api/quan-ly-ngan-hang-cau-hoi/cau-hoi',
            cauTrucDeThi: '/api/quan-ly-ngan-hang-cau-hoi/cau-truc-de-thi',
            deThi: '/api/quan-ly-ngan-hang-cau-hoi/de-thi',
            lichHen: '/api/dat-lich-dich-vu-spa/lich-hen',
            danhGia: '/api/dat-lich-dich-vu-spa/danh-gia',
        },
    });
});

// Mount routes
app.use('/api', rootRouter);

// Centralized error handler (phải đặt sau routes)
app.use(errorHandler);

export default app;

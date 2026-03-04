import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(` Server đang chạy tại http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/quan-ly-ngan-hang-cau-hoi`);
});

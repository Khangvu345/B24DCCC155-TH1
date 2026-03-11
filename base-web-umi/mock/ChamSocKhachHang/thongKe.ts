import { Request, Response } from "express";
import { danhSachLichHen } from './lichHen';
import { danhSachDichVu } from './dichVu';
import { danhSachNhanVien } from './nhanVien';

export default {
    'GET /api/thong-ke/lich-hen-theo-ngay': (req: Request, res: Response) => {
        const countsByDate: Record<string, number> = {};
        danhSachLichHen.forEach(lh => {
            const date = new Date(lh.thoiGian).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            countsByDate[date] = (countsByDate[date] || 0) + 1;
        });
        
        const xAxis = Object.keys(countsByDate).sort();
        const yAxis = [xAxis.map(date => countsByDate[date])];

        res.send({
            data: { xAxis, yAxis },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    },
    'GET /api/thong-ke/doanh-thu-dich-vu': (req: Request, res: Response) => {
        const revenueByService: Record<string, number> = {};
        
        // Khởi tạo các dịch vụ với doanh thu 0
        danhSachDichVu.forEach(dv => {
            revenueByService[dv.tenDichVu] = 0;
        });

        danhSachLichHen.forEach(lh => {
            // Trong mock data, idDichVu chính là tên dịch vụ
            const dv = danhSachDichVu.find(d => d.tenDichVu === lh.idDichVu || d._id === lh.idDichVu);
            if (dv && lh.trangThai === 'Hoàn thành') { // Chỉ tính lịch đã hoàn thành
                const ten = dv.tenDichVu;
                revenueByService[ten] = (revenueByService[ten] || 0) + (dv.gia || 0);
            }
        });

        const xAxis = Object.keys(revenueByService);
        const yAxis = [xAxis.map(k => revenueByService[k])];

        res.send({
            data: { xAxis, yAxis },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    },
    'GET /api/thong-ke/doanh-thu-nhan-vien': (req: Request, res: Response) => {
        const revenueByStaff: Record<string, number> = {};

        // Khởi tạo nhân viên với doanh thu 0
        danhSachNhanVien.forEach(nv => {
            revenueByStaff[nv.tenNhanVien] = 0;
        });

        danhSachLichHen.forEach(lh => {
            const nv = danhSachNhanVien.find(n => n.tenNhanVien === lh.idNhanVien || n._id === lh.idNhanVien);
            const dv = danhSachDichVu.find(d => d.tenDichVu === lh.idDichVu || d._id === lh.idDichVu);
            
            if (nv && dv && lh.trangThai === 'Hoàn thành') { // Chỉ tính lịch đã hoàn thành
                const ten = nv.tenNhanVien;
                revenueByStaff[ten] = (revenueByStaff[ten] || 0) + (dv.gia || 0);
            }
        });

        const xAxis = Object.keys(revenueByStaff);
        const yAxis = [xAxis.map(k => revenueByStaff[k])];

        res.send({
            data: { xAxis, yAxis },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    }
}

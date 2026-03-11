import { Request, Response } from "express";

export default {
    'GET /api/thong-ke/lich-hen-theo-ngay': (req: Request, res: Response) => {
        // Mock data 7 ngày gần nhất
        res.send({
            data: {
                xAxis: ['01/03', '02/03', '03/03', '04/03', '05/03', '06/03', '07/03'],
                yAxis: [[5, 8, 3, 10, 15, 7, 12]],
            },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    },
    'GET /api/thong-ke/doanh-thu-dich-vu': (req: Request, res: Response) => {
        res.send({
            data: {
                xAxis: ['Cắt tóc', 'Gội đầu', 'Massage', 'Làm móng', 'Chăm sóc da'],
                yAxis: [[1500000, 800000, 2500000, 1200000, 3000000]],
            },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    },
    'GET /api/thong-ke/doanh-thu-nhan-vien': (req: Request, res: Response) => {
        res.send({
            data: {
                xAxis: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'],
                yAxis: [[5000000, 7500000, 4200000, 6800000]],
            },
            errorCode: 'SUCCESS',
            info: 'OK'
        });
    }
}

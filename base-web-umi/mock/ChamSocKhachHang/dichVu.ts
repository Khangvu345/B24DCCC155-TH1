import { Request, Response } from "express";

export let danhSachDichVu = [
  { _id: '1', tenDichVu: 'Cắt tóc nam', gia: 50000, thoiGian: 30 },
  { _id: '2', tenDichVu: 'Gội đầu massage', gia: 100000, thoiGian: 45 },
  { _id: '3', tenDichVu: 'Nhuộm tóc', gia: 300000, thoiGian: 120 },
];

export default {
    'GET /api/dich-vu': (req: Request, res: Response) => {
        res.send({
            data: {
                result:danhSachDichVu,
                total:danhSachDichVu.length,
                success:true
            },
            errorCode: 'SUCCESS',
            info: 'Lấy danh sách dịch vụ thành công'
        });
    },
    'POST /api/dich-vu': (req: Request, res: Response) => {
        const newData = {
            _id: (danhSachDichVu.length + 1).toString(),
            ...req.body
        }
        danhSachDichVu.push(newData);
        res.send({
            data: {
                result:danhSachDichVu,
                total:danhSachDichVu.length,
                success:true
            },
            errorCode: 'SUCCESS',
            info: 'Thêm dịch vụ thành công'
        });
    },
    'PUT /api/dich-vu/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachDichVu.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            res.send({
                data: {
                    result: null,
                    total: 0,
                    success: false
                },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy dịch vụ'
            });
        } else {
            danhSachDichVu[index] = {
                ...danhSachDichVu[index],
                ...req.body
            };
            res.send({
                data: {
                    result: danhSachDichVu[index],
                    total: danhSachDichVu.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Cập nhật dịch vụ thành công'
            });
        }
    },
    'DELETE /api/dich-vu/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachDichVu.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            res.send({
                data: {
                    result: null,
                    total: 0,
                    success: false
                },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy dịch vụ'
            });
        } else {
            danhSachDichVu.splice(index, 1);
            res.send({
                data: {
                    result: danhSachDichVu,
                    total: danhSachDichVu.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Xóa dịch vụ thành công'
            });
        }
    }
}
import { Request, Response } from "express";

let danhSachNhanVien = [
  { 
    _id: '1', 
    tenNhanVien: 'Nguyễn Văn A', 
    gioiHanKhach: 10, 
    danhGiaTrungBinh: 4.5,
    lichLamViec: [
      { thu: 'Thứ 2', tuGio: '09:00', denGio: '17:00' },
      { thu: 'Thứ 3', tuGio: '09:00', denGio: '17:00' },
    ] 
  },
  { 
    _id: '2', 
    tenNhanVien: 'Trần Thị B', 
    gioiHanKhach: 15, 
    danhGiaTrungBinh: 5.0,
    lichLamViec: [
      { thu: 'Thứ 6', tuGio: '09:00', denGio: '17:00' },
      { thu: 'Thứ 7', tuGio: '08:00', denGio: '20:00' },
    ] 
  },
];

export default {
    'GET /api/nhan-vien': (req: Request, res: Response) => {
        res.send({
            data: {
                result:danhSachNhanVien,
                total:danhSachNhanVien.length,
                success:true
            },
            errorCode: 'SUCCESS',
            info: 'Lấy danh sách nhân viên thành công'
        });
    },
    'POST /api/nhan-vien': (req: Request, res: Response) => {
        const newData = {
            _id: (danhSachNhanVien.length + 1).toString(),
            ...req.body
        }
        danhSachNhanVien.push(newData);
        res.send({
            data: {
                result:danhSachNhanVien,
                total:danhSachNhanVien.length,
                success:true
            },
            errorCode: 'SUCCESS',
            info: 'Thêm nhân viên thành công'
        });
    },
    'PUT /api/nhan-vien/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachNhanVien.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            res.send({
                data: {
                    result: null,
                    total: 0,
                    success: false
                },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy nhân viên'
            });
        } else {
            danhSachNhanVien[index] = {
                ...danhSachNhanVien[index],
                ...req.body
            };
            res.send({
                data: {
                    result: danhSachNhanVien[index],
                    total: danhSachNhanVien.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Cập nhật nhân viên thành công'
            });
        }
    },
    'DELETE /api/nhan-vien/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachNhanVien.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            res.send({
                data: {
                    result: null,
                    total: 0,
                    success: false
                },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy nhân viên'
            });
        } else {
            danhSachNhanVien.splice(index, 1);
            res.send({
                data: {
                    result: danhSachNhanVien,
                    total: danhSachNhanVien.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Xóa nhân viên thành công'
            });
        }
    }
}
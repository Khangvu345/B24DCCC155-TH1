import { Request, Response } from "express";

export let danhSachLichHen = [
  { 
    _id: '1', 
    tenKhachHang: 'Nguyễn Văn A', 
    soDienThoai: '0987654321', 
    thoiGian: '2023-11-20T09:00:00.000Z', 
    idDichVu: 'Gội đầu massage', 
    idNhanVien: 'Trần Thị B', 
    trangThai: 'Hoàn thành'
  },
  { 
    _id: '2', 
    tenKhachHang: 'Lê Thị C', 
    soDienThoai: '0123456789', 
    thoiGian: '2023-11-21T14:30:00.000Z', 
    idDichVu: 'Cắt tóc nam', 
    idNhanVien: 'Nguyễn Văn A', 
    trangThai: 'Hoàn thành'
  },
];

export default {
    'GET /api/lich-hen': (req: Request, res: Response) => {
        res.send({
            data: {
                result: danhSachLichHen,
                total: danhSachLichHen.length,
                success: true
            },
            errorCode: 'SUCCESS',
            info: 'Lấy danh sách lịch hẹn thành công'
        });
    },
    'POST /api/lich-hen': (req: Request, res: Response) => {
        const newData = {
            _id: Date.now().toString(),
            ...req.body,
            trangThai: req.body.trangThai || 'Chờ duyệt'
        }
        
        const isConflict = danhSachLichHen.some(
            lh => lh.idNhanVien === newData.idNhanVien && lh.thoiGian === newData.thoiGian && lh.trangThai !== 'Hủy'
        );

        if (isConflict) {
            return res.send({
                data: { result: null, total: 0, success: false },
                errorCode: 'BAD_REQUEST',
                info: 'Nhân viên đã có lịch hẹn vào thời gian này!'
            });
        }

        danhSachLichHen.push(newData);
        return res.send({
            data: {
                result: newData,
                total: danhSachLichHen.length,
                success: true
            },
            errorCode: 'SUCCESS',
            info: 'Đặt lịch hẹn thành công'
        });
    },
    'PUT /api/lich-hen/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachLichHen.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            return res.send({
                data: { result: null, total: 0, success: false },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy lịch hẹn'
            });
        } else {
            danhSachLichHen[index] = {
                ...danhSachLichHen[index],
                ...req.body
            };
            return res.send({
                data: {
                    result: danhSachLichHen[index],
                    total: danhSachLichHen.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Cập nhật lịch hẹn thành công'
            });
        }
    },
    'DELETE /api/lich-hen/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachLichHen.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            return res.send({
                data: { result: null, total: 0, success: false },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy lịch hẹn'
            });
        } else {
            danhSachLichHen.splice(index, 1);
            return res.send({
                data: {
                    result: danhSachLichHen,
                    total: danhSachLichHen.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Xóa lịch hẹn thành công'
            });
        }
    }
}

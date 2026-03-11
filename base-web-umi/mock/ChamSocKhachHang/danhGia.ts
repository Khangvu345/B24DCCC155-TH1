import { Request, Response } from "express";

let danhSachDanhGia = [
  { 
    _id: '1', 
    idLichHen: '1', 
    tenKhachHang: 'Nguyễn Văn A', 
    idDichVu: 'Dịch vụ Spa', 
    idNhanVien: 'Trần Thị B', 
    soSao: 5,
    nhanXetKhachHang: '<p>Dịch vụ rất tốt, nhân viên nhiệt tình!</p>',
    phanHoiNhanVien: ''
  },
  { 
    _id: '2', 
    idLichHen: '2', 
    tenKhachHang: 'Lê Thị C', 
    idDichVu: 'Massage', 
    idNhanVien: 'Nguyễn Văn A', 
    soSao: 4,
    nhanXetKhachHang: '<p>Tạm ổn, cần cải thiện thêm lúc chờ.</p>',
    phanHoiNhanVien: '<p>Cảm ơn chị đã góp ý ạ.</p>'
  },
];

export default {
    'GET /api/danh-gia': (req: Request, res: Response) => {
        res.send({
            data: {
                result: danhSachDanhGia,
                total: danhSachDanhGia.length,
                success: true
            },
            errorCode: 'SUCCESS',
            info: 'Lấy danh sách đánh giá thành công'
        });
    },
    'POST /api/danh-gia': (req: Request, res: Response) => {
        const newData = {
            _id: Date.now().toString(),
            ...req.body
        }
        danhSachDanhGia.push(newData);
        return res.send({
            data: {
                result: newData,
                total: danhSachDanhGia.length,
                success: true
            },
            errorCode: 'SUCCESS',
            info: 'Thêm đánh giá thành công'
        });
    },
    'PUT /api/danh-gia/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachDanhGia.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            return res.send({
                data: { result: null, total: 0, success: false },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy đánh giá'
            });
        } else {
            danhSachDanhGia[index] = {
                ...danhSachDanhGia[index],
                ...req.body
            };
            return res.send({
                data: {
                    result: danhSachDanhGia[index],
                    total: danhSachDanhGia.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Phản hồi đánh giá thành công'
            });
        }
    },
    'DELETE /api/danh-gia/:id': (req: Request, res: Response) => {
        const { id } = req.params;
        const index = danhSachDanhGia.findIndex((item) => String(item._id) === String(id));
        if (index === -1) {
            return res.send({
                data: { result: null, total: 0, success: false },
                errorCode: 'NOT_FOUND',
                info: 'Không tìm thấy đánh giá'
            });
        } else {
            danhSachDanhGia.splice(index, 1);
            return res.send({
                data: {
                    result: danhSachDanhGia,
                    total: danhSachDanhGia.length,
                    success: true
                },
                errorCode: 'SUCCESS',
                info: 'Xóa đánh giá thành công'
            });
        }
    }
}

import { z } from 'zod';

export const nhanVienSchema = z.object({
    hoTen: z.string().min(1, 'Họ tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    vaiTro: z.enum(['quan_ly', 'nhan_vien', 'le_tan']),
    soDienThoai: z.string().optional()
});

export const nhanVienUpdateSchema = nhanVienSchema.partial();
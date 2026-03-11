import { z } from 'zod';

export const createNhanVienSchema = z.object({
    ten: z.string().min(1, 'Tên nhân viên không được để trống'),
    soDienThoai: z
        .string()
        .regex(/^(0|\+84)\d{9}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)'),
    chuyenMon: z.string().min(1, 'Chuyên môn không được để trống'),
    soKhachToiDa: z
        .number({ invalid_type_error: 'Số khách tối đa phải là số' })
        .int()
        .min(1, 'Tối thiểu 1 khách/ngày')
        .max(50, 'Tối đa 50 khách/ngày'),
    moTa: z.string().optional(),
});

export const updateNhanVienSchema = z.object({
    ten: z.string().min(1).optional(),
    soDienThoai: z.string().regex(/^(0|\+84)\d{9}$/).optional(),
    chuyenMon: z.string().min(1).optional(),
    soKhachToiDa: z.number().int().min(1).max(50).optional(),
    moTa: z.string().optional(),
});
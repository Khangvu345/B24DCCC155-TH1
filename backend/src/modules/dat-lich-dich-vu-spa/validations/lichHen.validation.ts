import { z } from 'zod';
import { TRANG_THAI_LICH_HEN_VALUES } from '../models/lichHen.model';

// Regex kiểm tra format HH:mm  (00:00 – 23:59)
const HH_MM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
// Regex kiểm tra format YYYY-MM-DD
const YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const createLichHenSchema = z.object({
    khachHangId: z.string().min(1, 'Tên/SĐT khách hàng không được để trống'),
    nhanVienId: z.string().min(1, 'Nhân viên không được để trống'),
    dichVuId: z.string().min(1, 'Dịch vụ không được để trống'),
    ngay: z
        .string()
        .regex(YYYY_MM_DD_REGEX, 'Ngày phải có định dạng YYYY-MM-DD'),
    gioDat: z
        .string()
        .regex(HH_MM_REGEX, 'Giờ đặt phải có định dạng HH:mm (VD: 09:00)'),
    ghiChu: z.string().optional(),
});

export const updateLichHenSchema = z.object({
    khachHangId: z.string().min(1).optional(),
    nhanVienId: z.string().min(1).optional(),
    dichVuId: z.string().min(1).optional(),
    ngay: z.string().regex(YYYY_MM_DD_REGEX, 'Ngày phải có định dạng YYYY-MM-DD').optional(),
    gioDat: z.string().regex(HH_MM_REGEX, 'Giờ đặt phải có định dạng HH:mm').optional(),
    ghiChu: z.string().optional(),
});

export const doiTrangThaiSchema = z.object({
    trangThai: z.enum(TRANG_THAI_LICH_HEN_VALUES as [string, ...string[]], {
        errorMap: () => ({
            message: `Trạng thái phải là một trong: ${TRANG_THAI_LICH_HEN_VALUES.join(', ')}`,
        }),
    }),
});
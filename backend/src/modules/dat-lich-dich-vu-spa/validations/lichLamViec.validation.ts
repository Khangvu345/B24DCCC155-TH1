import { z } from 'zod';

const HH_MM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const createLichLamViecSchema = z.object({
    nhanVienId: z.string().min(1, 'nhanVienId không được để trống'),
    thu: z.union([
        z.literal(0), z.literal(1), z.literal(2), z.literal(3),
        z.literal(4), z.literal(5), z.literal(6),
    ], { errorMap: () => ({ message: 'Thứ phải là số nguyên từ 0 (CN) đến 6 (T7)' }) }),
    gioVao: z.string().regex(HH_MM_REGEX, 'Giờ vào phải có định dạng HH:mm'),
    gioRa: z.string().regex(HH_MM_REGEX, 'Giờ ra phải có định dạng HH:mm'),
}).refine((data) => data.gioVao < data.gioRa, {
    message: 'Giờ vào phải trước giờ ra',
    path: ['gioRa'],
});

export const updateLichLamViecSchema = z.object({
    thu: z.union([
        z.literal(0), z.literal(1), z.literal(2), z.literal(3),
        z.literal(4), z.literal(5), z.literal(6),
    ]).optional(),
    gioVao: z.string().regex(HH_MM_REGEX).optional(),
    gioRa: z.string().regex(HH_MM_REGEX).optional(),
});

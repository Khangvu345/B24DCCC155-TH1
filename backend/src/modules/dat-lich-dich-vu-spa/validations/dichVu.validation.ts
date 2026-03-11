import { z } from 'zod';

export const createDichVuSchema = z.object({
    ten: z.string().min(1, 'Tên dịch vụ không được để trống'),
    gia: z
        .number({ invalid_type_error: 'Giá phải là số' })
        .min(0, 'Giá không được âm'),
    thoiGianPhut: z
        .number({ invalid_type_error: 'Thời gian phải là số' })
        .int()
        .min(5, 'Thời gian tối thiểu 5 phút')
        .max(480, 'Thời gian tối đa 480 phút (8 tiếng)'),
    moTa: z.string().optional(),
});

export const updateDichVuSchema = z.object({
    ten: z.string().min(1).optional(),
    gia: z.number().min(0).optional(),
    thoiGianPhut: z.number().int().min(5).max(480).optional(),
    moTa: z.string().optional(),
});
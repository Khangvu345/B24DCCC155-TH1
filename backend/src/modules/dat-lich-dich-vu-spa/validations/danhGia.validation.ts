import { z } from 'zod';

export const createDanhGiaSchema = z.object({
    lichHenId: z.string().min(1, 'lichHenId không được để trống'),
    soSao: z
        .number({ invalid_type_error: 'soSao phải là số' })
        .int('soSao phải là số nguyên')
        .min(1, 'soSao tối thiểu là 1')
        .max(5, 'soSao tối đa là 5'),
    nhanXet: z.string().optional(),
});

export const phanHoiSchema = z.object({
    phanHoi: z.string().min(1, 'Nội dung phản hồi không được để trống'),
});
import { z } from 'zod';

export const createMonHocSchema = z.object({
    maMonHoc: z.string().min(1, 'Mã môn học không được để trống'),
    tenMonHoc: z.string().min(1, 'Tên môn học không được để trống'),
    soTinChi: z.number().int().min(1, 'Số tín chỉ phải >= 1').max(10, 'Số tín chỉ phải <= 10'),
});

export const updateMonHocSchema = z.object({
    maMonHoc: z.string().min(1, 'Mã môn học không được để trống').optional(),
    tenMonHoc: z.string().min(1, 'Tên môn học không được để trống').optional(),
    soTinChi: z.number().int().min(1).max(10).optional(),
});

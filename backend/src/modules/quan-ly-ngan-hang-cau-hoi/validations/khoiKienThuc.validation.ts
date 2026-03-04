import { z } from 'zod';

export const createKhoiKienThucSchema = z.object({
    ten: z.string().min(1, 'Tên khối kiến thức không được để trống'),
});

export const updateKhoiKienThucSchema = z.object({
    ten: z.string().min(1, 'Tên khối kiến thức không được để trống'),
});

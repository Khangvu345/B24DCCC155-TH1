import { z } from 'zod';

export const dichVuSchema = z.object({
    tenDichVu: z.string().min(1, 'Tên dịch vụ không được để trống'),
    giaTien: z.number().min(0, 'Giá tiền phải lớn hơn hoặc bằng 0'),
    thoiGianThucHien: z.number().min(1, 'Thời gian thực hiện (phút) phải lớn hơn 0'),
    moTa: z.string().optional(),
    hinhAnh: z.string().url('Đường dẫn hình ảnh không hợp lệ').optional().or(z.literal(''))
});

export const dichVuUpdateSchema = dichVuSchema.partial();
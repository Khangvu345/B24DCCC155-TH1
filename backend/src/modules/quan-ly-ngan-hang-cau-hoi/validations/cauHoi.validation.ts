import { z } from 'zod';
import { MUC_DO_VALUES } from '../models/cauHoi.model';

export const createCauHoiSchema = z.object({
    monHocId: z.string().min(1, 'Mã môn học không được để trống'),
    khoiKienThucId: z.string().min(1, 'Mã khối kiến thức không được để trống'),
    noiDung: z.string().min(1, 'Nội dung câu hỏi không được để trống'),
    mucDo: z.enum(MUC_DO_VALUES as [string, ...string[]], {
        errorMap: () => ({ message: `Mức độ phải là một trong: ${MUC_DO_VALUES.join(', ')}` }),
    }),
});

export const updateCauHoiSchema = z.object({
    monHocId: z.string().min(1).optional(),
    khoiKienThucId: z.string().min(1).optional(),
    noiDung: z.string().min(1).optional(),
    mucDo: z.enum(MUC_DO_VALUES as [string, ...string[]]).optional(),
});

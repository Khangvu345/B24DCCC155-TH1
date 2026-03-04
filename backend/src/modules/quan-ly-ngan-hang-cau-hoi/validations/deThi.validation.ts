import { z } from 'zod';
import { MUC_DO_VALUES } from '../models/cauHoi.model';

// Validation cho CauTrucDeThi
const yeuCauSchema = z.object({
    khoiKienThucId: z.string().min(1, 'Mã khối kiến thức không được để trống'),
    mucDo: z.enum(MUC_DO_VALUES as [string, ...string[]], {
        errorMap: () => ({ message: `Mức độ phải là một trong: ${MUC_DO_VALUES.join(', ')}` }),
    }),
    soCau: z.number().int().min(1, 'Số câu phải >= 1'),
});

export const createCauTrucDeThiSchema = z.object({
    ten: z.string().min(1, 'Tên cấu trúc không được để trống'),
    monHocId: z.string().min(1, 'Mã môn học không được để trống'),
    danhSachYeuCau: z.array(yeuCauSchema).min(1, 'Phải có ít nhất 1 yêu cầu'),
});

export const updateCauTrucDeThiSchema = z.object({
    ten: z.string().min(1).optional(),
    monHocId: z.string().min(1).optional(),
    danhSachYeuCau: z.array(yeuCauSchema).min(1).optional(),
});

// Validation cho DeThi
export const taoDeThiTuDongSchema = z.object({
    tieuDe: z.string().min(1, 'Tiêu đề đề thi không được để trống'),
    cauTrucDeThiId: z.string().min(1, 'Mã cấu trúc đề thi không được để trống'),
});

export const updateDeThiSchema = z.object({
    tieuDe: z.string().min(1).optional(),
});

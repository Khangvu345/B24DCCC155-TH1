/**
 * Mức độ khó của câu hỏi
 */
export type MucDo = 'de' | 'trungBinh' | 'kho' | 'ratKho';

export const MUC_DO_VALUES: MucDo[] = ['de', 'trungBinh', 'kho', 'ratKho'];

/**
 * Interface cho Câu Hỏi 
 */
export interface ICauHoi {
    id: string;
    monHocId: string;        // FK -> MonHoc
    khoiKienThucId: string;  // FK -> KhoiKienThuc
    noiDung: string;         // Nội dung câu hỏi
    mucDo: MucDo;            // Dễ / Trung bình / Khó / Rất khó
}

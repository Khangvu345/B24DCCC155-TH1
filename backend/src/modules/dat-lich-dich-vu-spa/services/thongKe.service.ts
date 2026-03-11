import { readJsonFile } from '../../../config/database';

const LICH_HEN_FILE = 'lichHen.json';

export interface ILichHen {
    id: string;
    dichVuId: string;
    nhanVienId: string;
    khachHang: {
        ten: string;
        soDienThoai: string;
    };
    ngayHen: string;
    caHen: string;
    trangThai: 'cho_xac_nhan' | 'xac_nhan' | 'hoan_thanh' | 'huy';
    tongTien: number;
}

export class ThongKeService {
    static getDoanhThu(): { tongDoanhThu: number; chiTiet: ILichHen[] } {
        const data = readJsonFile<ILichHen>(LICH_HEN_FILE);
        // Chỉ tính doanh thu cho các lịch hẹn đã hoàn thành
        const lichHoanThanh = data.filter(l => l.trangThai === 'hoan_thanh');
        const tongDoanhThu = lichHoanThanh.reduce((sum, current) => sum + (current.tongTien || 0), 0);
        
        return {
            tongDoanhThu,
            chiTiet: lichHoanThanh
        };
    }

    static getThongKeLichHen(): { tongSo: number; theoTrangThai: Record<string, number> } {
        const data = readJsonFile<ILichHen>(LICH_HEN_FILE);
        
        const theoTrangThai: Record<string, number> = {
            'hoan_thanh': 0,
            'xac_nhan': 0,
            'cho_xac_nhan': 0,
            'huy': 0
        };

        data.forEach(l => {
            if (theoTrangThai[l.trangThai] !== undefined) {
                theoTrangThai[l.trangThai]++;
            } else {
                theoTrangThai[l.trangThai] = 1;
            }
        });

        return {
            tongSo: data.length,
            theoTrangThai
        };
    }
}
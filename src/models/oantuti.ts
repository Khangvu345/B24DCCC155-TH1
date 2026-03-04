import { useState } from 'react';
import { message } from 'antd';
import {
    LuaChon,
    KetQua,
    VanDau,
    layLuaChonNgauNhien,
    xacDinhKetQua,
    layTenKetQua,
} from '@/services/OanTuTi';

export default () => {
    const [lichSuDau, setLichSuDau] = useState<VanDau[]>([]);
    const [luaChonNguoiChoi, setLuaChonNguoiChoi] = useState<LuaChon | null>(null);
    const [luaChonMay, setLuaChonMay] = useState<LuaChon | null>(null);
    const [ketQua, setKetQua] = useState<KetQua | null>(null);
    const [dangChoi, setDangChoi] = useState<boolean>(false);
    const [demVan, setDemVan] = useState<number>(0);

    // Xử lý 1 ván đấu
    const choi = (luaChon: LuaChon) => {
        setDangChoi(true);

        // Random cho máy
        const luaChonMayTinh = layLuaChonNgauNhien();

        // Xác định kết quả
        const ketQuaVan = xacDinhKetQua(luaChon, luaChonMayTinh);

        // Cập nhật state
        setLuaChonNguoiChoi(luaChon);
        setLuaChonMay(luaChonMayTinh);
        setKetQua(ketQuaVan);

        // Hiện thông báo
        if (ketQuaVan === KetQua.THANG) {
            message.success('🎉 Bạn đã THẮNG!');
        } else if (ketQuaVan === KetQua.THUA) {
            message.error('😢 Bạn đã THUA!');
        } else {
            message.warning('🤝 Ván này HÒA!');
        }

        // Tạo ván đấu mới
        const vanMoi: VanDau = {
            id: demVan + 1,
            nguoiChoi: luaChon,
            mayTinh: luaChonMayTinh,
            ketQua: ketQuaVan,
            thoiGian: new Date().toLocaleTimeString('vi-VN'),
        };

        // Cập nhật lịch sử (lưu tất cả, phân trang ở UI)
        const lichSuMoi = [vanMoi, ...lichSuDau];
        setLichSuDau(lichSuMoi);
        setDemVan(demVan + 1);

        // Tắt trạng thái đang chơi
        setTimeout(() => {
            setDangChoi(false);
        }, 300);
    };

    // Reset game
    const resetGame = () => {
        setLichSuDau([]);
        setLuaChonNguoiChoi(null);
        setLuaChonMay(null);
        setKetQua(null);
        setDangChoi(false);
        setDemVan(0);
        message.info('🔄 Đã reset trò chơi!');
    };

    return {
        lichSuDau,
        luaChonNguoiChoi,
        luaChonMay,
        ketQua,
        dangChoi,
        demVan,
        choi,
        resetGame,
    };
};

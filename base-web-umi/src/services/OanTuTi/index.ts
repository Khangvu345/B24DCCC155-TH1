// Enum lựa chọn
export enum LuaChon {
    KEO = 'KEO',
    BUA = 'BUA',
    BAO = 'BAO',
}

// Enum kết quả
export enum KetQua {
    THANG = 'THANG',
    THUA = 'THUA',
    HOA = 'HOA',
}

// Interface cho 1 ván đấu
export interface VanDau {
    id: number;
    nguoiChoi: LuaChon;
    mayTinh: LuaChon;
    ketQua: KetQua;
    thoiGian: string;
}

// Random lựa chọn cho máy tính
export const layLuaChonNgauNhien = (): LuaChon => {
    const luaChons = [LuaChon.KEO, LuaChon.BUA, LuaChon.BAO];
    const randomIndex = Math.floor(Math.random() * 3);
    return luaChons[randomIndex];
};

// Xác định kết quả: người chơi so với máy tính
export const xacDinhKetQua = (nguoiChoi: LuaChon, mayTinh: LuaChon): KetQua => {
    if (nguoiChoi === mayTinh) return KetQua.HOA;

    if (
        (nguoiChoi === LuaChon.KEO && mayTinh === LuaChon.BAO) ||
        (nguoiChoi === LuaChon.BUA && mayTinh === LuaChon.KEO) ||
        (nguoiChoi === LuaChon.BAO && mayTinh === LuaChon.BUA)
    ) {
        return KetQua.THANG;
    }

    return KetQua.THUA;
};

// Lấy tên hiển thị
export const layTenLuaChon = (luaChon: LuaChon): string => {
    const tenMap: Record<LuaChon, string> = {
        [LuaChon.KEO]: 'Kéo',
        [LuaChon.BUA]: 'Búa',
        [LuaChon.BAO]: 'Bao',
    };
    return tenMap[luaChon];
};

// Lấy icon hiển thị
export const layIconLuaChon = (luaChon: LuaChon): string => {
    const iconMap: Record<LuaChon, string> = {
        [LuaChon.KEO]: '✌️',
        [LuaChon.BUA]: '✊',
        [LuaChon.BAO]: '✋',
    };
    return iconMap[luaChon];
};

// Lấy tên kết quả
export const layTenKetQua = (ketQua: KetQua): string => {
    const tenMap: Record<KetQua, string> = {
        [KetQua.THANG]: 'Thắng',
        [KetQua.THUA]: 'Thua',
        [KetQua.HOA]: 'Hòa',
    };
    return tenMap[ketQua];
};

// Lấy màu kết quả
export const layMauKetQua = (ketQua: KetQua): string => {
    const mauMap: Record<KetQua, string> = {
        [KetQua.THANG]: '#52c41a',
        [KetQua.THUA]: '#ff4d4f',
        [KetQua.HOA]: '#faad14',
    };
    return mauMap[ketQua];
};

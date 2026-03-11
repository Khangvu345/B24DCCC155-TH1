import React, { useEffect } from "react";
import { getThongKeLichHen, getThongKeDichVu, getThongKeNhanVien } from "@/services/ChamSocKhachHang/ThongKe/thongKe";

export default () => {
    const [dataLichHen, setDataLichHen] = React.useState<any>({});
    const [dataDichVu, setDataDichVu] = React.useState<any>({});
    const [dataNhanVien, setDataNhanVien] = React.useState<any>({});
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [resLichHen, resDichVu, resNhanVien] = await Promise.all([
                getThongKeLichHen(),
                getThongKeDichVu(),
                getThongKeNhanVien()
            ]);

            if (resLichHen?.data?.data) setDataLichHen(resLichHen.data.data);
            if (resDichVu?.data?.data) setDataDichVu(resDichVu.data.data);
            if (resNhanVien?.data?.data) setDataNhanVien(resNhanVien.data.data);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        dataLichHen,
        dataDichVu,
        dataNhanVien,
        loading,
        fetchAllData
    }
}

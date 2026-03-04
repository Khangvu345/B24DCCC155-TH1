import { useState } from 'react';
import { getDeThi, taoDeThiTuDong, getChiTietDeThi, deleteDeThi } from '@/services/QuanLyNganHangCauHoi/deThi';
import { message } from 'antd';

export default () => {
    const [danhSachDeThi, setDanhSachDeThi] = useState<any[]>([]);
    const [visibleTaoDeThi, setVisibleTaoDeThi] = useState<boolean>(false);
    const [visibleChiTiet, setVisibleChiTiet] = useState<boolean>(false);
    const [currentDeThi, setCurrentDeThi] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchDeThi = async (params?: any) => {
        setLoading(true);
        try {
            const res = await getDeThi(params);
            setDanhSachDeThi(res?.data?.data ?? res?.data ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTaoDeThi = async (payload: any) => {
        setLoading(true);
        try {
            const res = await taoDeThiTuDong(payload);
            message.success('Tạo đề thi tự động thành công');
            setVisibleTaoDeThi(false);
            fetchDeThi();
            return res;
        } catch (error: any) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleXemChiTiet = async (id: string) => {
        setLoading(true);
        try {
            const res = await getChiTietDeThi(id);
            setCurrentDeThi(res?.data?.data ?? res?.data);
            setVisibleChiTiet(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteDeThi(id);
            message.success('Xóa đề thi thành công');
            fetchDeThi();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        danhSachDeThi,
        setDanhSachDeThi,
        visibleTaoDeThi,
        setVisibleTaoDeThi,
        visibleChiTiet,
        setVisibleChiTiet,
        currentDeThi,
        setCurrentDeThi,
        loading,
        fetchDeThi,
        handleTaoDeThi,
        handleXemChiTiet,
        handleDelete
    };
};

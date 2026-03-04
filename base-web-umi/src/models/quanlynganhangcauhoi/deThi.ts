import { useState } from 'react';
import { getDeThi, taoDeThiTuDong, getChiTietDeThi, deleteDeThi, getCauTruc, deleteCauTruc, createCauTruc } from '@/services/QuanLyNganHangCauHoi/deThi';
import { message } from 'antd';

export default () => {
    const [danhSachDeThi, setDanhSachDeThi] = useState<any[]>([]);
    const [danhSachCauTruc, setDanhSachCauTruc] = useState<any[]>([]);
    const [visibleTaoDeThi, setVisibleTaoDeThi] = useState<boolean>(false);
    const [visibleTaoDeThiTaiCauTruc, setVisibleTaoDeThiTaiCauTruc] = useState<boolean>(false);
    const [visibleChiTiet, setVisibleChiTiet] = useState<boolean>(false);
    const [currentDeThi, setCurrentDeThi] = useState<any>();
    const [currentCauTruc, setCurrentCauTruc] = useState<any>();
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

    const fetchCauTruc = async (params?: any) => {
        setLoading(true);
        try {
            const res = await getCauTruc(params);
            setDanhSachCauTruc(res?.data?.data ?? res?.data ?? []);
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

    const handleCreateCauTruc = async (payload: any) => {
        setLoading(true);
        try {
            const res = await createCauTruc(payload);
            message.success('Thêm cấu trúc đề thi thành công');
            fetchCauTruc();
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

    const handleDeleteCauTrucDeThi = async (id: string) => {
        setLoading(true);
        try {
            await deleteCauTruc(id);
            message.success('Xóa cấu trúc thành công');
            fetchCauTruc();
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
        danhSachCauTruc,
        fetchCauTruc,
        handleDeleteCauTrucDeThi,
        visibleTaoDeThiTaiCauTruc,
        setVisibleTaoDeThiTaiCauTruc,
        currentCauTruc,
        setCurrentCauTruc,
        handleCreateCauTruc,
        loading,
        fetchDeThi,
        handleTaoDeThi,
        handleXemChiTiet,
        handleDelete
    };
};

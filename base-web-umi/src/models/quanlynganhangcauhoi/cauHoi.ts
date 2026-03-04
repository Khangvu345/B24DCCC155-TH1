import { useState } from 'react';
import { getCauHoi, createCauHoi, updateCauHoi, deleteCauHoi } from '@/services/QuanLyNganHangCauHoi/cauHoi';
import { message } from 'antd';

export interface CauHoiRecord {
    _id: string;
    maCauHoi: string;
    monHocId: any;
    khoiKienThucId?: any;
    noiDung: string;
    mucDoKho: 'Dễ' | 'Trung bình' | 'Khó' | 'Rất khó';
    createdAt?: string;
    updatedAt?: string;
}

export default () => {
    const [data, setData] = useState<CauHoiRecord[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<CauHoiRecord>();
    const [loading, setLoading] = useState<boolean>(false);

    // Filter states
    const [filters, setFilters] = useState<any>({});

    const fetchCauHoi = async (params: any = {}) => {
        setLoading(true);
        try {
            const queryParams = { ...filters, ...params };
            const res = await getCauHoi(queryParams);
            setData(res?.data?.data ?? res?.data ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (payload: any) => {
        setLoading(true);
        try {
            await createCauHoi(payload);
            message.success('Thêm mới câu hỏi thành công');
            setVisible(false);
            fetchCauHoi();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id: string, payload: any) => {
        setLoading(true);
        try {
            await updateCauHoi(id, payload);
            message.success('Cập nhật câu hỏi thành công');
            setVisible(false);
            fetchCauHoi();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteCauHoi(id);
            message.success('Xóa câu hỏi thành công');
            fetchCauHoi();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        loading,
        fetchCauHoi,
        handleCreate,
        handleUpdate,
        handleDelete,
        filters,
        setFilters
    };
};

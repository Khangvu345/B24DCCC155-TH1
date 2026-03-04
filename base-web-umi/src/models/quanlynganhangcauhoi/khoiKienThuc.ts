import { useState } from 'react';
import { getKhoiKienThuc, createKhoiKienThuc, updateKhoiKienThuc, deleteKhoiKienThuc } from '@/services/QuanLyNganHangCauHoi/khoiKienThuc';
import { message } from 'antd';

export interface KhoiKienThucRecord {
    id: string;
    ten: string;
    createdAt?: string;
    updatedAt?: string;
}

export default () => {
    const [data, setData] = useState<KhoiKienThucRecord[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<KhoiKienThucRecord>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchKhoiKienThuc = async (params?: any) => {
        setLoading(true);
        try {
            const res = await getKhoiKienThuc(params);
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
            await createKhoiKienThuc(payload);
            message.success('Thêm mới thành công');
            setVisible(false);
            fetchKhoiKienThuc();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id: string, payload: any) => {
        setLoading(true);
        try {
            await updateKhoiKienThuc(id, payload);
            message.success('Cập nhật thành công');
            setVisible(false);
            fetchKhoiKienThuc();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteKhoiKienThuc(id);
            message.success('Xóa thành công');
            fetchKhoiKienThuc();
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
        fetchKhoiKienThuc,
        handleCreate,
        handleUpdate,
        handleDelete
    };
};

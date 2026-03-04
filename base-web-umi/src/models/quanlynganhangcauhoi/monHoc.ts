import { useState } from 'react';
import { getMonHoc, createMonHoc, updateMonHoc, deleteMonHoc } from '@/services/QuanLyNganHangCauHoi/monHoc';
import { message } from 'antd';

export interface MonHocRecord {
    _id: string;
    maMonHoc: string;
    tenMonHoc: string;
    soTinChi: number;
    moTa?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default () => {
    const [data, setData] = useState<MonHocRecord[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<MonHocRecord>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMonHoc = async (params?: any) => {
        setLoading(true);
        try {
            const res = await getMonHoc(params);
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
            await createMonHoc(payload);
            message.success('Thêm mới môn học thành công');
            setVisible(false);
            fetchMonHoc();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id: string, payload: any) => {
        setLoading(true);
        try {
            await updateMonHoc(id, payload);
            message.success('Cập nhật môn học thành công');
            setVisible(false);
            fetchMonHoc();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteMonHoc(id);
            message.success('Xóa môn học thành công');
            fetchMonHoc();
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
        fetchMonHoc,
        handleCreate,
        handleUpdate,
        handleDelete
    };
};

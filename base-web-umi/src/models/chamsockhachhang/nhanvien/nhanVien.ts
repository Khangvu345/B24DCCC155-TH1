import React from "react";
import {message} from "antd";
import {getNhanVien, addNhanVien, updateNhanVien, deleteNhanVien} from "@/services/ChamSocKhachHang/NhanVien/nhanVien";

export default () => {
    const [danhSach, setDanhSach] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [visibleForm, setVisibleForm] = React.useState<boolean>(false);
    const [edit, setEdit] = React.useState<boolean>(false);
    const [isView, setIsView] = React.useState<boolean>(false);
    const [record, setRecord] = React.useState<any>({});
    const [selectedIds, setSelectedIds] = React.useState<any[]>([]);
    const [condition, setCondition] = React.useState<any>({});
    const [sort, setSort] = React.useState<any>({});
    const [filters, setFilters] = React.useState<any[]>([]);
    const initFilter: any[] = [];

    const getModel = async (customParams?: any) => {
        try {
            setLoading(true);
            const res = await getNhanVien({page,limit, ...customParams});
            if (res?.data?.data?.result) {
                setDanhSach(res.data.data.result);
                setTotal(res.data.data.total || 0);
            }
        } catch (e) {
            console.log(e);
            message.error('Lấy dữ liệu thất bại');
        } finally {
            setLoading(false);
        }
    } 

    const postModel = async (value: any) => {
        try {
            setLoading(true);
            const res = await addNhanVien(value);
            if (res?.data?.data?.result) {
                message.success('Thêm nhân viên thành công');
                setVisibleForm(false);
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Thêm nhân viên thất bại');
        } finally {
            setLoading(false);
        }
    }

    const putModel = async (id: string, value: any) => {
        try {
            setLoading(true);
            const res = await updateNhanVien({_id: id, ...value});
            if (res?.data?.data?.result) {
                message.success('Cập nhật nhân viên thành công');
                setVisibleForm(false);
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Cập nhật nhân viên thất bại');
        } finally {
            setLoading(false);
        }
    }

    const deleteModel = async (id: string) => {
        try {
            setLoading(true);
            const res = await deleteNhanVien({_id: id});
            if (res?.data?.data?.result) {
                message.success('Xóa nhân viên thành công');
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Xóa nhân viên thất bại');
        } finally {
            setLoading(false);
        }
    }
    return {
        danhSach, setDanhSach,
        total, setTotal,
        loading, setLoading,
        page, setPage,
        limit, setLimit,
        visibleForm, setVisibleForm,
        edit, setEdit,
        isView, setIsView,
        record, setRecord,
        selectedIds, setSelectedIds,
        condition, setCondition,
        sort, setSort,
        filters, setFilters,
        initFilter,
        getModel, postModel, putModel, deleteModel,
    }
}

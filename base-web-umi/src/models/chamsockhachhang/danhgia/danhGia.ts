import React from "react";
import { message } from "antd";
import { getDanhGia, addDanhGia, updateDanhGia, deleteDanhGia } from "@/services/ChamSocKhachHang/DanhGia/danhGia";

export default () => {
    const [danhSach, setDanhSach] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [visibleForm, setVisibleForm] = React.useState<boolean>(false);
    const [edit, setEdit] = React.useState<boolean>(false);
    const [record, setRecord] = React.useState<any>({});
    
    // States cho TableBase
    const [isView, setIsView] = React.useState<boolean>(false);
    const [selectedIds, setSelectedIds] = React.useState<any[]>([]);
    const [condition, setCondition] = React.useState<any>({});
    const [sort, setSort] = React.useState<any>({});
    const [filters, setFilters] = React.useState<any[]>([]);
    const initFilter: any[] = [];

    const getModel = async (customParams?: any) => {
        try {
            setLoading(true);
            const res = await getDanhGia({ page, limit, ...customParams });
            if (res?.data?.data?.result) {
                setDanhSach(res.data.data.result);
                setTotal(res.data.data.total || 0);
            }
        } catch (e) {
            console.log(e);
            message.error('Lấy dữ liệu đánh giá thất bại');
        } finally {
            setLoading(false);
        }
    } 

    const postModel = async (value: any) => {
        try {
            setLoading(true);
            const res = await addDanhGia(value);
            if (res?.data?.data?.result) {
                message.success('Thêm đánh giá thành công');
                setVisibleForm(false);
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Thêm đánh giá thất bại');
        } finally {
            setLoading(false);
        }
    }

    const putModel = async (id: string, value: any) => {
        try {
            setLoading(true);
            const res = await updateDanhGia({ id, data: value });
            if (res?.data?.data?.result) {
                message.success('Cập nhật đánh giá thành công');
                setVisibleForm(false);
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Cập nhật đánh giá thất bại');
        } finally {
            setLoading(false);
        }
    }

    const deleteModel = async (id: string) => {
        try {
            setLoading(true);
            const res = await deleteDanhGia({ id });
            if (res?.data?.data?.result) {
                message.success('Xóa đánh giá thành công');
                getModel();
            }
        } catch (e) {
            console.log(e);
            message.error('Xóa đánh giá thất bại');
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
        record, setRecord,
        
        isView, setIsView,
        selectedIds, setSelectedIds,
        condition, setCondition,
        sort, setSort,
        filters, setFilters,
        initFilter,

        getModel, postModel, putModel, deleteModel,
    }
}

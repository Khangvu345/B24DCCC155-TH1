import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Tag, Tooltip } from 'antd';
import { useModel } from 'umi';
import { tienVietNam } from '@/utils/utils';
import FormDiemDen from './FormDiemDen';

const loaiHinhLabelMap: Record<KeHoachDuLich.TLoaiHinh, string> = {
  Bien: 'Biển',
  Nui: 'Núi',
  ThanhPho: 'Thành phố',
};

const getLoaiHinhLabel = (value?: KeHoachDuLich.TLoaiHinh) => (value ? loaiHinhLabelMap[value] ?? value : '');

const DiemDenPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('kehoachdulich.diemDen' as any) as any;

  const columns: IColumn<KeHoachDuLich.IDiemDen>[] = [
    {
      title: 'Ảnh',
      dataIndex: 'anhDaiDien',
      width: 100,
      render: (val: string) =>
        val ? <Image width={56} height={56} style={{ borderRadius: 8, objectFit: 'cover' }} src={val} /> : '- ',
    },
    {
      title: 'Tên',
      dataIndex: 'ten',
      width: 200,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Địa điểm',
      dataIndex: 'diaDiem',
      width: 200,
      filterType: 'string',
    },
    {
      title: 'Loại hình',
      dataIndex: 'loaiHinh',
      width: 140,
      filterType: 'select',
      filterData: ['Bien', 'Nui', 'ThanhPho'],
      render: (val: KeHoachDuLich.TLoaiHinh) => <Tag color="blue">{getLoaiHinhLabel(val)}</Tag>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      width: 120,
      sortable: true,
    },
    {
      title: 'Giá dự kiến',
      dataIndex: 'giaDuKien',
      width: 160,
      sortable: true,
      render: (val: number) => tienVietNam(val || 0),
    },
    {
      title: 'Thao tác',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (record: KeHoachDuLich.IDiemDen) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa điểm đến này?"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="kehoachdulich.diemDen"
      title="Quản lý điểm đến"
      Form={FormDiemDen}
    />
  );
};

export default DiemDenPage;

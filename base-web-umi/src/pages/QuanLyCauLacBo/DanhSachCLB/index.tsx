import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Image, Popconfirm, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { history, useModel } from 'umi';
import FormCLB from './components/FormCLB';

const DanhSachCLBPage = () => {
  const { getModel, page, limit, deleteModel, handleEdit } = useModel('quanlycaulacbo.cauLacBo' as any) as any;

  const columns: IColumn<CauLacBo.IRecord>[] = [
    {
      title: 'Anh dai dien',
      dataIndex: 'anhDaiDien',
      width: 110,
      render: (val: string) =>
        val ? <Image width={56} height={56} style={{ borderRadius: 8, objectFit: 'cover' }} src={val} /> : '- ',
    },
    {
      title: 'Ten cau lac bo',
      dataIndex: 'tenCLB',
      width: 220,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Ngay thanh lap',
      dataIndex: 'ngayThanhLap',
      width: 160,
      align: 'center',
      sortable: true,
      render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : '-'),
    },
    {
      title: 'Mo ta',
      dataIndex: 'moTa',
      width: 320,
      render: (val: string) => {
        const plainText = String(val || '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        return plainText || '-';
      },
    },
    {
      title: 'Chu nhiem CLB',
      dataIndex: 'chuNhiem',
      width: 180,
      filterType: 'string',
    },
    {
      title: 'Hoat dong',
      dataIndex: 'hoatDong',
      width: 130,
      align: 'center',
      filterType: 'select',
      filterData: [
        { label: 'Co', value: 'true' },
        { label: 'Khong', value: 'false' },
      ],
      render: (val: boolean) =>
        val ? (
          <Tag color="success">Co</Tag>
        ) : (
          <Tag color="default">Khong</Tag>
        ),
    },
    {
      title: 'Thao tac',
      width: 140,
      fixed: 'right',
      align: 'center',
      render: (record: CauLacBo.IRecord) => (
        <>
          <Tooltip title="Chinh sua">
            <Button onClick={() => handleEdit(record)} type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xoa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Ban co chac chan muon xoa CLB nay?"
              placement="topLeft"
            >
              <Button danger type="link" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xem thanh vien">
            <Button
              type="link"
              icon={<TeamOutlined />}
              onClick={() => history.push(`/quan-ly-cau-lac-bo/thanh-vien?cauLacBoId=${record._id}`)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="quanlycaulacbo.cauLacBo"
      title="Danh sach cau lac bo"
      Form={FormCLB}
    />
  );
};

export default DanhSachCLBPage;

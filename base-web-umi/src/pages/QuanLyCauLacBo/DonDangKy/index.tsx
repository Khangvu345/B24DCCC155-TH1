import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined, EyeOutlined, HistoryOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Select, Space, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import FormDonDangKy from './FormDonDangKy';
import ModalDuyet from './ModalDuyet';
import ModalLichSu from './ModalLichSu';

const DonDangKyPage = () => {
  const model = useModel('quanlycaulacbo.donDangKy' as any) as any;
  const clbModel = useModel('quanlycaulacbo.cauLacBo' as any) as any;

  const { getModel, page, limit, deleteModel, handleEdit, handleView, selectedIds, duyetNhieu } = model;

  const [clbOptions, setClbOptions] = useState<{ label: string; value: string }[]>([]);
  const [duyetModal, setDuyetModal] = useState<{ visible: boolean; type: 'Approved' | 'Rejected'; ids: string[] }>({
    visible: false,
    type: 'Approved',
    ids: [],
  });
  const [lichSuModal, setLichSuModal] = useState<{ visible: boolean; data: QuanLyCauLacBo.ILichSuThaoTac[] }>({
    visible: false,
    data: [],
  });
  const [loadingDuyet, setLoadingDuyet] = useState<boolean>(false);

  useEffect(() => {
    clbModel
      .getAllModel(false, { tenCLB: 1 }, undefined, undefined, undefined, false)
      .then((res: QuanLyCauLacBo.ICauLacBo[]) => {
        setClbOptions((res || []).map((item) => ({ label: item.tenCLB, value: item._id || '' })));
      })
      .catch((error: unknown) => console.log(error));
  }, []);

  const clbMap = useMemo(
    () =>
      clbOptions.reduce<Record<string, string>>((acc, item) => {
        acc[item.value] = item.label;
        return acc;
      }, {}),
    [clbOptions],
  );

  const openDuyetModal = (ids: string[], type: 'Approved' | 'Rejected') => {
    if (!ids.length) return;
    setDuyetModal({ visible: true, type, ids });
  };

  const submitDuyet = async (lyDo?: string) => {
    setLoadingDuyet(true);
    try {
      await duyetNhieu(duyetModal.ids, duyetModal.type, lyDo);
      setDuyetModal({ visible: false, type: 'Approved', ids: [] });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDuyet(false);
    }
  };

  const showLichSu = async (id?: string) => {
    if (!id) return;
    try {
      const data = await model.getLichSu(id);
      setLichSuModal({ visible: true, data: data || [] });
    } catch (error) {
      console.log(error);
    }
  };

  const columns: IColumn<QuanLyCauLacBo.IDonDangKy>[] = [
    {
      title: 'Ho ten',
      dataIndex: 'hoTen',
      width: 180,
      filterType: 'string',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 220,
      filterType: 'string',
    },
    {
      title: 'SDT',
      dataIndex: 'sdt',
      width: 130,
    },
    {
      title: 'Gioi tinh',
      dataIndex: 'gioiTinh',
      width: 120,
      filterType: 'select',
      filterData: ['Nam', 'Nu', 'Khac'],
    },
    {
      title: 'Cau lac bo',
      dataIndex: 'cauLacBoId',
      width: 220,
      filterType: 'customselect',
      filterCustomSelect: <Select mode="multiple" options={clbOptions} placeholder="Chon CLB" />,
      render: (val: string) => clbMap[val] || '-',
    },
    {
      title: 'Trang thai',
      dataIndex: 'trangThai',
      width: 140,
      filterType: 'select',
      filterData: ['Pending', 'Approved', 'Rejected'],
      render: (val: QuanLyCauLacBo.TTrangThai) => {
        if (val === 'Approved') return <Tag color="green">Approved</Tag>;
        if (val === 'Rejected') return <Tag color="red">Rejected</Tag>;
        return <Tag color="gold">Pending</Tag>;
      },
    },
    {
      title: 'Ngay dang ky',
      dataIndex: 'ngayDangKy',
      width: 150,
      sortable: true,
      render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : '-'),
    },
    {
      title: 'Thao tac',
      width: 260,
      fixed: 'right',
      align: 'center',
      render: (record: QuanLyCauLacBo.IDonDangKy) => (
        <Space size={4}>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Ban co chac chan muon xoa don nay?" onConfirm={() => deleteModel(record._id, getModel)}>
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button type="link" icon={<HistoryOutlined />} onClick={() => showLichSu(record._id)} />
          <Button type="link" onClick={() => openDuyetModal([record._id || ''], 'Approved')}>
            Duyet
          </Button>
          <Button type="link" danger onClick={() => openDuyetModal([record._id || ''], 'Rejected')}>
            Tu choi
          </Button>
        </Space>
      ),
    },
  ];

  const selectedCount = selectedIds?.length || 0;

  return (
    <>
      <TableBase
        columns={columns}
        dependencies={[page, limit]}
        modelName="quanlycaulacbo.donDangKy"
        title="Don dang ky thanh vien"
        Form={FormDonDangKy}
        rowSelection
        otherButtons={[
          selectedCount > 0 ? (
            <Button key="duyet-nhieu" type="primary" onClick={() => openDuyetModal(selectedIds, 'Approved')}>
              Duyet {selectedCount} don da chon
            </Button>
          ) : null,
          selectedCount > 0 ? (
            <Button key="tu-choi-nhieu" danger onClick={() => openDuyetModal(selectedIds, 'Rejected')}>
              Khong duyet {selectedCount} don da chon
            </Button>
          ) : null,
        ].filter(Boolean) as JSX.Element[]}
      />

      <ModalDuyet
        visible={duyetModal.visible}
        onCancel={() => setDuyetModal({ visible: false, type: 'Approved', ids: [] })}
        onOk={submitDuyet}
        type={duyetModal.type}
        count={duyetModal.ids.length}
        loading={loadingDuyet}
      />

      <ModalLichSu
        visible={lichSuModal.visible}
        onCancel={() => setLichSuModal({ visible: false, data: [] })}
        lichSu={lichSuModal.data}
      />
    </>
  );
};

export default DonDangKyPage;

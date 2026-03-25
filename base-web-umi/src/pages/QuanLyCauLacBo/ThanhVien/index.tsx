import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { Button, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import ModalChuyenCLB from './ModalChuyenCLB';

const ThanhVienPage = () => {
  const model = useModel('quanlycaulacbo.thanhVien' as any) as any;
  const clbModel = useModel('quanlycaulacbo.cauLacBo' as any) as any;

  const { getModel, page, limit, selectedIds, chuyenCLB } = model;

  const [clbOptions, setClbOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCLB, setSelectedCLB] = useState<string>();
  const [modalChuyen, setModalChuyen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const queryCLB = query.get('cauLacBoId') || undefined;

    clbModel
      .getAllModel(false, { tenCLB: 1 }, undefined, undefined, undefined, false)
      .then((res: QuanLyCauLacBo.ICauLacBo[]) => {
        const options = (res || []).map((item) => ({ label: item.tenCLB, value: item._id || '' }));
        setClbOptions(options);
        if (queryCLB && options.some((item) => item.value === queryCLB)) {
          setSelectedCLB(queryCLB);
        } else if (!selectedCLB && options[0]?.value) setSelectedCLB(options[0].value);
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

  const getData = () => {
    getModel(selectedCLB ? { cauLacBoId: selectedCLB } : undefined);
  };

  const handleChuyenCLB = async (cauLacBoIdMoi: string) => {
    if (!selectedIds?.length) return;
    setLoading(true);
    try {
      await chuyenCLB(selectedIds, cauLacBoIdMoi);
      setModalChuyen(false);
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: IColumn<QuanLyCauLacBo.IThanhVien>[] = [
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
      width: 140,
    },
    {
      title: 'Gioi tinh',
      dataIndex: 'gioiTinh',
      width: 110,
      filterType: 'select',
      filterData: ['Nam', 'Nu', 'Khac'],
    },
    {
      title: 'Dia chi',
      dataIndex: 'diaChi',
      width: 220,
      filterType: 'string',
    },
    {
      title: 'So truong',
      dataIndex: 'soTruong',
      width: 220,
      filterType: 'string',
    },
    {
      title: 'Cau lac bo',
      dataIndex: 'cauLacBoId',
      width: 220,
      render: (val: string) => clbMap[val] || '-',
    },
    {
      title: 'Ngay dang ky',
      dataIndex: 'ngayDangKy',
      width: 150,
      sortable: true,
      render: (val: string) => (val ? moment(val).format('DD/MM/YYYY') : '-'),
    },
  ];

  const selectedCount = selectedIds?.length || 0;

  return (
    <>
      <TableBase
        title="Quan ly thanh vien CLB"
        columns={columns}
        modelName="quanlycaulacbo.thanhVien"
        dependencies={[page, limit, selectedCLB]}
        getData={getData}
        rowSelection
        buttons={{ create: false }}
        otherButtons={[
          <Space key="filter-clb">
            <span>CLB:</span>
            <Select
              style={{ width: 280 }}
              options={clbOptions}
              value={selectedCLB}
              placeholder="Chon cau lac bo"
              showSearch
              optionFilterProp="label"
              onChange={(value) => {
                setSelectedCLB(value);
                model.setSelectedIds(undefined);
              }}
            />
          </Space>,
          selectedCount > 0 ? (
            <Button key="chuyen-clb" type="primary" onClick={() => setModalChuyen(true)}>
              Chuyen CLB cho {selectedCount} thanh vien
            </Button>
          ) : null,
        ].filter(Boolean) as JSX.Element[]}
      />

      <ModalChuyenCLB
        visible={modalChuyen}
        count={selectedCount}
        currentCauLacBoId={selectedCLB}
        clbOptions={clbOptions}
        onCancel={() => setModalChuyen(false)}
        onOk={handleChuyenCLB}
        loading={loading}
      />
    </>
  );
};

export default ThanhVienPage;

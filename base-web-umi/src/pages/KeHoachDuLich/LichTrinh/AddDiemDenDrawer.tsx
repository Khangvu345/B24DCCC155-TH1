import { Button, Drawer, Input, List, Rate, Select, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { tienVietNam } from '@/utils/utils';

const { Text } = Typography;

const loaiHinhLabelMap: Record<KeHoachDuLich.TLoaiHinh, string> = {
  Bien: 'Biển',
  Nui: 'Núi',
  ThanhPho: 'Thành phố',
};

const getLoaiHinhLabel = (value?: KeHoachDuLich.TLoaiHinh) => (value ? loaiHinhLabelMap[value] ?? value : '');

type AddDiemDenDrawerProps = {
  visible: boolean;
  loading?: boolean;
  data: KeHoachDuLich.IDiemDen[];
  selectedIds?: string[];
  onAdd: (id: string) => void;
  onClose: () => void;
};

const loaiHinhOptions = [
  { label: 'Tất cả', value: 'TatCa' },
  { label: 'Biển', value: 'Bien' },
  { label: 'Núi', value: 'Nui' },
  { label: 'Thành phố', value: 'ThanhPho' },
];

const AddDiemDenDrawer = ({ visible, loading, data, selectedIds, onAdd, onClose }: AddDiemDenDrawerProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [loaiHinh, setLoaiHinh] = useState<string>('TatCa');

  const filtered = useMemo(() => {
    let next = [...(data || [])];
    if (loaiHinh && loaiHinh !== 'TatCa') {
      next = next.filter((item) => item.loaiHinh === loaiHinh);
    }
    if (keyword) {
      const lower = keyword.toLowerCase();
      next = next.filter(
        (item) => item.ten.toLowerCase().includes(lower) || item.diaDiem.toLowerCase().includes(lower),
      );
    }
    return next;
  }, [data, keyword, loaiHinh]);

  return (
    <Drawer title="Chọn điểm đến" width={520} visible={visible} onClose={onClose} destroyOnClose>
      <Space direction="vertical" style={{ width: '100%' }} size={12}>
        <Input.Search placeholder="Tìm điểm đến" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Select options={loaiHinhOptions} value={loaiHinh} onChange={(val) => setLoaiHinh(val)} />

        <List
          loading={loading}
          dataSource={filtered}
          renderItem={(item) => {
            const isSelected = selectedIds?.includes(item._id || '') ?? false;
            return (
              <List.Item
                actions={[
                  <Button key="add" type="link" onClick={() => onAdd(item._id || '')} disabled={isSelected}>
                    {isSelected ? 'Đã chọn' : 'Thêm'}
                  </Button>,
                ]}
              >
                <Space direction="vertical" size={2} style={{ width: '100%' }}>
                  <Text strong>{item.ten}</Text>
                  <Text type="secondary">{item.diaDiem}</Text>
                  <Space size={6}>
                    <Tag color="blue">{getLoaiHinhLabel(item.loaiHinh)}</Tag>
                    <Rate disabled allowHalf value={item.rating} />
                  </Space>
                  <Text>{tienVietNam(item.giaDuKien || 0)}</Text>
                </Space>
              </List.Item>
            );
          }}
        />
      </Space>
    </Drawer>
  );
};

export default AddDiemDenDrawer;

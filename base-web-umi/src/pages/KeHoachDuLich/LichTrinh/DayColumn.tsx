import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, List, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { tienVietNam } from '@/utils/utils';

const { Text } = Typography;

const loaiHinhLabelMap: Record<KeHoachDuLich.TLoaiHinh, string> = {
  Bien: 'Biển',
  Nui: 'Núi',
  ThanhPho: 'Thành phố',
};

const getLoaiHinhLabel = (value?: KeHoachDuLich.TLoaiHinh) => (value ? loaiHinhLabelMap[value] ?? value : '');

type DayColumnProps = {
  ngay: string;
  items: KeHoachDuLich.IDiemDen[];
  tongChiPhi: number;
  tongThoiGianDiChuyen: number;
  onAdd: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onRemove: (index: number) => void;
};

const DayColumn = ({ ngay, items, tongChiPhi, tongThoiGianDiChuyen, onAdd, onMove, onRemove }: DayColumnProps) => {
  const label = moment(ngay).isValid() ? moment(ngay).format('DD/MM/YYYY') : ngay;

  return (
    <Card
      title={`Ngày ${label}`}
      extra={
        <Button icon={<PlusOutlined />} size="small" onClick={onAdd}>
          Thêm điểm đến
        </Button>
      }
    >
      {items.length === 0 ? (
        <Empty description="Chưa có điểm đến" />
      ) : (
        <List
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <Button
                  key="up"
                  size="small"
                  icon={<ArrowUpOutlined />}
                  disabled={index === 0}
                  onClick={() => onMove(index, 'up')}
                />,
                <Button
                  key="down"
                  size="small"
                  icon={<ArrowDownOutlined />}
                  disabled={index === items.length - 1}
                  onClick={() => onMove(index, 'down')}
                />,
                <Button key="remove" danger size="small" icon={<DeleteOutlined />} onClick={() => onRemove(index)} />,
              ]}
            >
              <Space direction="vertical" size={2}>
                <Text strong>{item.ten}</Text>
                <Text type="secondary">{item.diaDiem}</Text>
                <Tag color="blue">{getLoaiHinhLabel(item.loaiHinh)}</Tag>
                <Text>{tienVietNam(item.giaDuKien || 0)}</Text>
              </Space>
            </List.Item>
          )}
        />
      )}

      <div style={{ marginTop: 12 }}>
        <Space direction="vertical" size={2}>
          <Text>Chi phí trong ngày: {tienVietNam(tongChiPhi || 0)}</Text>
          <Text type="secondary">Thời gian di chuyển: {tongThoiGianDiChuyen || 0} phút</Text>
        </Space>
      </div>
    </Card>
  );
};

export default DayColumn;

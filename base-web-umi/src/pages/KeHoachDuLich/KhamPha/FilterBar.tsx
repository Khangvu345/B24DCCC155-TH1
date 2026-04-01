import { Col, Rate, Row, Select, Slider, Space } from 'antd';

export type TFilterState = {
  loaiHinh?: KeHoachDuLich.TLoaiHinh | 'TatCa';
  priceRange: [number, number];
  rating?: number;
  sort?: string;
};

type FilterBarProps = {
  value: TFilterState;
  onChange: (next: TFilterState) => void;
  maxPrice: number;
};

const loaiHinhOptions = [
  { label: 'Tất cả', value: 'TatCa' },
  { label: 'Biển', value: 'Bien' },
  { label: 'Núi', value: 'Nui' },
  { label: 'Thành phố', value: 'ThanhPho' },
];

const sortOptions = [
  { label: 'Rating cao nhất', value: 'rating-desc' },
  { label: 'Rating thấp nhất', value: 'rating-asc' },
  { label: 'Giá thấp nhất', value: 'price-asc' },
  { label: 'Giá cao nhất', value: 'price-desc' },
];

const FilterBar = ({ value, onChange, maxPrice }: FilterBarProps) => {
  const max = maxPrice > 0 ? maxPrice : 1000000;

  return (
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} md={6} lg={5}>
        <Select
          style={{ width: '100%' }}
          options={loaiHinhOptions}
          value={value.loaiHinh ?? 'TatCa'}
          onChange={(val) => onChange({ ...value, loaiHinh: val })}
        />
      </Col>
      <Col xs={24} md={10} lg={9}>
        <Space style={{ width: '100%' }} direction="vertical" size={4}>
          <span>Khoảng giá</span>
          <Slider
            range
            min={0}
            max={max}
            value={value.priceRange}
            onChange={(range) => onChange({ ...value, priceRange: range as [number, number] })}
          />
        </Space>
      </Col>
      <Col xs={24} md={4} lg={4}>
        <Space direction="vertical" size={4}>
          <span>Đánh giá</span>
          <Rate allowHalf value={value.rating} onChange={(val) => onChange({ ...value, rating: val })} />
        </Space>
      </Col>
      <Col xs={24} md={4} lg={6}>
        <Select
          style={{ width: '100%' }}
          options={sortOptions}
          value={value.sort}
          onChange={(val) => onChange({ ...value, sort: val })}
          placeholder="Sắp xếp"
        />
      </Col>
    </Row>
  );
};

export default FilterBar;

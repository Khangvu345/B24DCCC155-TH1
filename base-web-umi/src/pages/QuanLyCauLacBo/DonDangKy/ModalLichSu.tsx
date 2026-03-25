import { Modal, Timeline, Typography } from 'antd';
import moment from 'moment';

type Props = {
  visible: boolean;
  onCancel: () => void;
  lichSu: QuanLyCauLacBo.ILichSuThaoTac[];
};

const ModalLichSu = ({ visible, onCancel, lichSu }: Props) => {
  return (
    <Modal title="Lich su thao tac" visible={visible} onCancel={onCancel} footer={null} destroyOnClose>
      <Timeline>
        {lichSu.map((item, index) => (
          <Timeline.Item key={`${item.thoiGian}-${index}`} color={item.hanhDong === 'Approved' ? 'green' : 'red'}>
            <Typography.Text>
              {item.nguoiThucHien} da {item.hanhDong} vao luc {moment(item.thoiGian).format('HH:mm DD/MM/YYYY')}
              {item.lyDo ? `, ly do: ${item.lyDo}` : ''}
            </Typography.Text>
          </Timeline.Item>
        ))}
      </Timeline>
      {!lichSu.length ? <Typography.Text type="secondary">Chua co lich su thao tac</Typography.Text> : null}
    </Modal>
  );
};

export default ModalLichSu;

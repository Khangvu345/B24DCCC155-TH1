import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const TaoDeThiTuCauTruc = () => {
    const { handleTaoDeThi, loading, setVisibleTaoDeThiTaiCauTruc, currentCauTruc } = useModel('quanlynganhangcauhoi.deThi');
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            await handleTaoDeThi({
                tieuDe: values.tieuDe,
                cauTrucDeThiId: currentCauTruc?.id
            });
            setVisibleTaoDeThiTaiCauTruc(false);
        } catch (e) {
            // Error mapped in model
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Tiêu đề Đề Thi"
                name="tieuDe"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề cho đề thi mới!' }]}
            >
                <Input placeholder="Ví dụ: Đề thi cuối kỳ 2026..." />
            </Form.Item>

            <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button onClick={() => setVisibleTaoDeThiTaiCauTruc(false)} style={{ marginRight: 8 }}>
                    Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Tạo Đề Thi
                </Button>
            </div>
        </Form>
    );
};

export default TaoDeThiTuCauTruc;

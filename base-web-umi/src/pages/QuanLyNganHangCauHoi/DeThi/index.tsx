import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import DanhSachDeThi from './components/DanhSachDethi';
import DanhSachCauTruc from './components/DanhSachCauTruc';

const DeThi = () => {
    return (
        <PageContainer>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Đề Thi" key="1">
                    <DanhSachDeThi />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Cấu Trúc Đề Thi" key="2">
                    <DanhSachCauTruc />
                </Tabs.TabPane>
            </Tabs>
        </PageContainer>
    );
};

export default DeThi;

import { Typography , Row, Col } from "antd";
const { Title, Text } = Typography;


interface SectionHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    extra?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, extra }) => {
    return (
        <Row justify="space-between" align="middle" className="mb-4">
            <Col>
                <Title level={2} className="mb-0">{title}</Title>
                {subtitle && <Text type='secondary'>{subtitle}</Text>}
            </Col>
            {extra}
        </Row>
    )
}

export default SectionHeader;
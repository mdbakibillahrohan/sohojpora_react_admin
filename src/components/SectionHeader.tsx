import { Typography , Row, Col } from "antd";
const { Title, Text } = Typography;


const SectionHeader:React.FC = ({ title, subtitle, extra }) => {
    return (
        <Row justify="space-between" align="middle" className="mb-4">
            <Col>
                <Title level={2} className="mb-0">{title}</Title>
                {subtitle && <Text type = 'secondary'>{subtitle}</Text>}
            </Col>
            {extra}
        </Row>
    )
}

export default SectionHeader;
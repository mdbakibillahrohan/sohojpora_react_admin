import {Row,Col,Card,Statistic} from 'antd';

const GridStatsCard:React.FC = ({stats}) => {
    return (
        <div>
            <Row gutter={[24,24]} className='mb-6 flex w-full !flex-col items-center md:!flex-row'>
                {stats.map((stat,index)=>(
                    <Col xs={24} sm={12} md={6} key={index} className='w-full'>
                        <Card className='!h-full w-full !flex !flex-col justify-between items-center p-4'>
                            <Statistic {...stat} />
                            {stat.footer && <div className='mt-2 text-green-500 text-sm flex items-center '>{stat.footer}</div>}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default GridStatsCard;
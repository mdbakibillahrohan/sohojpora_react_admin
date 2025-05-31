import {Row,Col,Card,Statistic} from 'antd';


import React from "react"

interface Stat {
  title: string
  value: number
  prefix?: React.ReactNode
  suffix?: string
  precision?: number
  footer?: React.ReactNode
}

interface GridStatsCardProps {
  stats: Stat[]
}





const GridStatsCard: React.FC<GridStatsCardProps> = ({stats}) => {
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
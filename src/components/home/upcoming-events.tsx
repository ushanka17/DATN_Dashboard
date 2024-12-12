import { CalculatorOutlined } from '@ant-design/icons'
import { Badge, Card, List, message } from 'antd'
import { Text } from '../text'
import { useState } from 'react'
import { useList } from '@refinedev/core'
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries' 
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { getDate } from '@/utilities/helpers'
import dayjs from 'dayjs'

const UpcomingEvents = () => {
    //const [isLoading, setIsLoading] = useState(false);
    
    const { data, isLoading } = useList({
        resource: 'events',
        pagination: { pageSize: 5},
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        filters: [
            {
                field: 'startDate',
                operator: 'gte',
                value: dayjs().format('YYYY-MM-DD')
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
        }
    });
    
    return (
        <Card
            style={{height:'100%'}}
            bordered 
            hoverable
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <CalculatorOutlined />
                    <Text size="sm" style={{ marginLeft: "0.7rem" }}>
                        Lịch ăn sáng với Donald Trump
                    </Text>
            </div>
            }       
        >
            {isLoading ? (
                <List
                    itemLayout="horizontal"
                    dataSource={Array.from({ length: 5}).map((_, index) => ({
                        id: index,
                    }))} //data fake
                    renderItem={() => <UpcomingEventsSkeleton />}
                />
            ):(
                <List
                    itemLayout='horizontal'
                    dataSource={data?.data || []} //your data 1:51:28
                    renderItem={(item) => {
                        const renderDate = getDate(item.startDate, item.endDate)

                        return(
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={<Text size="xs">{renderDate}</Text>}
                                    description={<Text ellipsis={{ tooltip: true }}
                                    strong>
                                        {item.title}
                                    </Text>}

                                />
                            </List.Item>
                        )
                    }}                    
                />                
            )}

                {!isLoading && data?.data.length === 0 && (
                    <span
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '220px'
                        }}                    
                    >
                        heeh
                    </span>
                )}
                                
        </Card>
    )
}

export default UpcomingEvents
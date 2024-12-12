import { Chart, LatestActivities, UpcomingEvents, Voltage } from "@/components"
import { DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY, DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries"
import { DashboardTotalCountsQuery } from "@/graphql/types"
import { useCustom } from "@refinedev/core"
import { Col, Row } from "antd"

export const Home = () => {
  const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
    url: '',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY
    }
  })
  
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <Voltage            
            resource="companies"
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <Voltage
            resource="contacts"
            isLoading={isLoading}
            totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <Voltage
            resource="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>

      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: '32px'
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px'
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: '460px'
          }}
        >
          <Chart />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: '32px'
        }}
      >
        <Col xs={24}>
          <LatestActivities />
        </Col>
        
      </Row>
    </div>
  )
}
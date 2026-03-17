/**
 * Rewards & Offers Page
 *
 * Credit card rewards summary, earning categories, personalized offers,
 * and redemption options.
 */

import { Button, Card, Col, List, Row, Space, Statistic, Tag, Typography } from 'antd';
import {
  GiftOutlined,
  TrophyOutlined,
  CreditCardOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { REWARDS_DATA, REWARD_CATEGORIES, OFFERS, REDEEM_OPTIONS } from '../data/mockData.tsx';

const { Title, Text, Paragraph } = Typography;

export function Rewards() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ marginBottom: 0 }}>Rewards & Offers</Title>

      {/* Rewards Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Points"
              value={REWARDS_DATA.points}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix="pts"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Cash Back Earned"
              value={REWARDS_DATA.cashbackEarned}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="This Month"
              value={REWARDS_DATA.cashbackThisMonth}
              precision={2}
              prefix="+$"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Earning Categories */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CreditCardOutlined />
                <span>Active Cash Earning Categories</span>
              </Space>
            }
          >
            <List
              dataSource={REWARD_CATEGORIES}
              renderItem={(cat) => (
                <List.Item extra={<Tag color="green" style={{ fontSize: 14, padding: '2px 12px' }}>{cat.rate}</Tag>}>
                  <Text>{cat.name}</Text>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 12, padding: 12, background: '#f6ffed', borderRadius: 4 }}>
              <Text type="secondary">
                Earn unlimited cash back on every purchase with your Active Cash card.
                No caps on how much you can earn.
              </Text>
            </div>
          </Card>
        </Col>

        {/* Redeem */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <GiftOutlined />
                <span>Redeem Your Rewards</span>
              </Space>
            }
          >
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
              You have <Text strong style={{ color: '#faad14' }}>{REWARDS_DATA.points.toLocaleString()} points</Text> available to redeem.
            </Paragraph>
            <Row gutter={[12, 12]}>
              {REDEEM_OPTIONS.map((option) => (
                <Col xs={12} key={option}>
                  <Button block style={{ height: 'auto', padding: '12px 16px', textAlign: 'left' }}>
                    <div>
                      <Text strong>{option}</Text>
                    </div>
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Personalized Offers */}
      <Card
        title={
          <Space>
            <StarOutlined />
            <span>Personalized Offers</span>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          {OFFERS.map((offer) => (
            <Col xs={24} sm={8} key={offer.id}>
              <Card
                size="small"
                style={{ height: '100%', background: '#fafafa' }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Title level={5} style={{ marginBottom: 0 }}>{offer.title}</Title>
                  <Text type="secondary">{offer.description}</Text>
                  <Button type="primary" size="small">{offer.cta}</Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
}

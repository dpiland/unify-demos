/**
 * Rewards & Offers Page
 *
 * Credit card rewards summary, earning categories, personalized offers,
 * and redemption options.
 */

import { useState } from 'react';
import { Button, Card, Col, Divider, List, Modal, Row, Segmented, Space, Statistic, Tag, Typography, message, theme as antdTheme } from 'antd';
import {
  ArrowLeftOutlined,
  BellOutlined,
  CreditCardOutlined,
  DollarOutlined,
  GiftOutlined,
  GlobalOutlined,
  LockOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  StarOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { REWARDS_DATA, REWARD_CATEGORIES, OFFERS, REDEEM_OPTIONS } from '../data/mockData.tsx';

const { Title, Text, Paragraph } = Typography;

const PIE_COLORS = ['#1a3c5e', '#2d6a4f', '#e9c46a', '#e76f51', '#8c8c8c'];

const PIE_DATA = REWARD_CATEGORIES.map((cat) => ({
  name: cat.name,
  value: parseFloat(cat.rate),
}));

const REDEEM_CONTENT: Record<string, { icon: React.ReactNode; description: string; options: { label: string; points: number }[] }> = {
  'Statement Credit': {
    icon: <DollarOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
    description: 'Apply your rewards as a credit to your next statement. Minimum redemption: 2,500 points ($25).',
    options: [
      { label: '$25 Credit', points: 2500 },
      { label: '$50 Credit', points: 5000 },
      { label: '$100 Credit', points: 10000 },
      { label: '$200 Credit', points: 20000 },
    ],
  },
  'Gift Cards': {
    icon: <GiftOutlined style={{ fontSize: 32, color: '#faad14' }} />,
    description: 'Redeem for gift cards from popular retailers. Cards delivered digitally to your email.',
    options: [
      { label: 'Amazon $25', points: 2500 },
      { label: 'Starbucks $15', points: 1500 },
      { label: 'Target $50', points: 5000 },
      { label: 'Walmart $25', points: 2500 },
    ],
  },
  'Travel': {
    icon: <GlobalOutlined style={{ fontSize: 32, color: '#1a3c5e' }} />,
    description: 'Book flights, hotels, and rental cars through our travel portal. Points are worth 1.5x when redeemed for travel.',
    options: [
      { label: '$100 Travel Credit', points: 6700 },
      { label: '$250 Travel Credit', points: 16700 },
      { label: '$500 Travel Credit', points: 33400 },
    ],
  },
  'Merchandise': {
    icon: <ShoppingOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
    description: 'Browse our merchandise catalog for electronics, home goods, and more.',
    options: [
      { label: 'Wireless Earbuds', points: 8500 },
      { label: 'Smart Watch', points: 15000 },
      { label: 'Kitchen Set', points: 12000 },
      { label: 'Luggage Set', points: 20000 },
    ],
  },
};

export function Rewards() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const bgSubtle = isDark ? '#262626' : '#fafafa';
  const bgMuted = isDark ? '#1f1f1f' : '#f5f5f5';

  // Boolean flag: enable rewards redemption (regional rollout demo)
  const canRedeem = useFeatureFlag('enableRewardsRedemption');

  const [categoryView, setCategoryView] = useState<string>('list');
  const [selectedRedeem, setSelectedRedeem] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ label: string; points: number } | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

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
                <span>Horizon Cash Rewards Earning Categories</span>
              </Space>
            }
            extra={
              <Segmented
                value={categoryView}
                onChange={(val) => setCategoryView(val as string)}
                options={[
                  { value: 'list', icon: <UnorderedListOutlined /> },
                  { value: 'chart', icon: <PieChartOutlined /> },
                ]}
                size="small"
              />
            }
          >
            {categoryView === 'list' ? (
              <List
                dataSource={REWARD_CATEGORIES}
                renderItem={(cat) => (
                  <List.Item extra={<Tag color="green" style={{ fontSize: 14, padding: '2px 12px' }}>{cat.rate}</Tag>}>
                    <Text>{cat.name}</Text>
                  </List.Item>
                )}
              />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {PIE_DATA.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div style={{ marginTop: 12, padding: 12, background: isDark ? 'rgba(82, 196, 26, 0.2)' : 'rgba(82, 196, 26, 0.1)', borderRadius: 4 }}>
              <Text style={{ color: isDark ? '#b7eb8f' : '#389e0d' }}>
                Earn unlimited cash back on every purchase with your Horizon Cash Rewards card.
                No caps on how much you can earn.
              </Text>
            </div>
          </Card>
        </Col>

        {/* Redeem - controlled by enableRewardsRedemption boolean flag (regional rollout demo) */}
        <Col xs={24} lg={12}>
          {canRedeem ? (
            <>
              <Card
                title={
                  <Space>
                    {selectedRedeem ? (
                      <Button
                        type="text"
                        size="small"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => setSelectedRedeem(null)}
                        style={{ marginRight: 4 }}
                      />
                    ) : (
                      <GiftOutlined />
                    )}
                    <span>{selectedRedeem || 'Redeem Your Rewards'}</span>
                  </Space>
                }
              >
                <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                  You have <Text strong style={{ color: '#faad14' }}>{REWARDS_DATA.points.toLocaleString()} points</Text> available to redeem.
                </Paragraph>

                {!selectedRedeem ? (
                  <Row gutter={[12, 12]}>
                    {REDEEM_OPTIONS.map((option) => (
                      <Col xs={12} key={option}>
                        <Button
                          block
                          style={{ height: 'auto', padding: '16px', textAlign: 'center' }}
                          onClick={() => setSelectedRedeem(option)}
                        >
                          <Space direction="vertical" size={4}>
                            {REDEEM_CONTENT[option]?.icon}
                            <Text strong>{option}</Text>
                          </Space>
                        </Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                      {REDEEM_CONTENT[selectedRedeem]?.icon}
                    </div>
                    <Paragraph type="secondary" style={{ textAlign: 'center' }}>
                      {REDEEM_CONTENT[selectedRedeem]?.description}
                    </Paragraph>
                    <Divider />
                    <List
                      dataSource={REDEEM_CONTENT[selectedRedeem]?.options || []}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Button
                              type="primary"
                              size="small"
                              disabled={REWARDS_DATA.points < item.points}
                              onClick={() => setConfirmModal(item)}
                            >
                              Redeem
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={item.label}
                            description={
                              <Text type={REWARDS_DATA.points >= item.points ? 'secondary' : 'danger'}>
                                {item.points.toLocaleString()} points
                              </Text>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </Card>

              {/* Confirmation Modal */}
              <Modal
                title="Confirm Redemption"
                open={!!confirmModal}
                onOk={() => {
                  setConfirmModal(null);
                  setSelectedRedeem(null);
                }}
                onCancel={() => setConfirmModal(null)}
                okText="Confirm Redemption"
              >
                {confirmModal && (
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Paragraph>
                      You are about to redeem <Text strong>{confirmModal.points.toLocaleString()} points</Text> for:
                    </Paragraph>
                    <Card size="small" style={{ background: bgSubtle, textAlign: 'center' }}>
                      <Title level={4} style={{ marginBottom: 0 }}>{confirmModal.label}</Title>
                    </Card>
                    <Paragraph type="secondary">
                      Remaining balance after redemption: <Text strong>{(REWARDS_DATA.points - confirmModal.points).toLocaleString()} points</Text>
                    </Paragraph>
                  </Space>
                )}
              </Modal>
            </>
          ) : (
            <Card
              title={
                <Space>
                  <GiftOutlined />
                  <span>Redeem Your Rewards</span>
                </Space>
              }
            >
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <LockOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
                <Title level={4} style={{ color: '#8c8c8c' }}>Coming Soon to Your Region</Title>
                <Paragraph type="secondary" style={{ maxWidth: 360, margin: '0 auto 24px' }}>
                  Self-service rewards redemption is currently available in select markets
                  and will be expanding to your area soon.
                </Paragraph>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  You have <Text strong style={{ color: '#faad14' }}>{REWARDS_DATA.points.toLocaleString()} points</Text> ready to redeem when it launches.
                </Paragraph>
                <Button type="primary" icon={<BellOutlined />} onClick={() => message.success('You\'ll be notified when rewards redemption is available in your region!')}>
                  Notify Me When Available
                </Button>
              </div>
            </Card>
          )}
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
                style={{ height: '100%', background: bgSubtle }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Title level={5} style={{ marginBottom: 0 }}>{offer.title}</Title>
                  <Text type="secondary">{offer.description}</Text>
                  <Button type="primary" size="small" onClick={() => setSelectedOffer(offer.id)}>
                    {offer.cta}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Offer Detail Modal */}
      <Modal
        title={OFFERS.find(o => o.id === selectedOffer)?.title}
        open={!!selectedOffer}
        onCancel={() => setSelectedOffer(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedOffer(null)}>Close</Button>,
          <Button key="enroll" type="primary" onClick={() => {
            message.success('You have been enrolled in this offer!');
            setSelectedOffer(null);
          }}>
            Enroll Now
          </Button>,
        ]}
      >
        {selectedOffer === 'o1' && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>{OFFERS[0].description}</Paragraph>
            <Card size="small" style={{ background: bgMuted }}>
              <Space direction="vertical" size="small">
                <Text strong>Offer Details</Text>
                <Text type="secondary">Earn 5x points on flights, hotels, and car rentals booked through our travel portal from June 1 - August 31, 2026.</Text>
              </Space>
            </Card>
            <div>
              <Text strong>Terms:</Text>
              <ul style={{ marginTop: 4, paddingLeft: 20, color: '#8c8c8c' }}>
                <li>Maximum bonus of 25,000 points per statement period</li>
                <li>Must book through Horizon Bank travel portal</li>
                <li>Points post within 1-2 billing cycles</li>
              </ul>
            </div>
          </Space>
        )}
        {selectedOffer === 'o2' && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>{OFFERS[1].description}</Paragraph>
            <Card size="small" style={{ background: bgMuted }}>
              <Space direction="vertical" size="small">
                <Text strong>How to Qualify</Text>
                <Text type="secondary">Open a new Horizon Savings Savings account, deposit $25,000 or more within 30 days, and maintain the balance for 90 days.</Text>
              </Space>
            </Card>
            <div>
              <Text strong>Terms:</Text>
              <ul style={{ marginTop: 4, paddingLeft: 20, color: '#8c8c8c' }}>
                <li>New Horizon Savings accounts only</li>
                <li>$25,000 minimum opening deposit required</li>
                <li>Bonus deposited within 10 days of qualifying</li>
                <li>Limit one bonus per customer</li>
              </ul>
            </div>
          </Space>
        )}
        {selectedOffer === 'o3' && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>{OFFERS[2].description}</Paragraph>
            <Card size="small" style={{ background: bgMuted }}>
              <Space direction="vertical" size="small">
                <Text strong>Current Rates</Text>
                <Row gutter={[16, 8]} style={{ marginTop: 8 }}>
                  <Col span={12}><Text type="secondary">30-year fixed</Text></Col>
                  <Col span={12}><Text strong>5.25% APR</Text></Col>
                  <Col span={12}><Text type="secondary">15-year fixed</Text></Col>
                  <Col span={12}><Text strong>4.75% APR</Text></Col>
                  <Col span={12}><Text type="secondary">5/1 ARM</Text></Col>
                  <Col span={12}><Text strong>4.50% APR</Text></Col>
                </Row>
              </Space>
            </Card>
            <div>
              <Text strong>Benefits:</Text>
              <ul style={{ marginTop: 4, paddingLeft: 20, color: '#8c8c8c' }}>
                <li>No application fee for existing customers</li>
                <li>Close in as few as 30 days</li>
                <li>Dedicated loan officer assigned to your case</li>
              </ul>
            </div>
          </Space>
        )}
      </Modal>
    </Space>
  );
}

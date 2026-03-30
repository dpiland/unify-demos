/**
 * LoginPage Component - Ridgeline Outfitters
 *
 * User persona selector with outdoor-themed design.
 * Users can "log in" by clicking on a persona, which sets their
 * properties for feature flag targeting.
 */

import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import { UserOutlined, CrownOutlined, ExperimentOutlined, CompassOutlined } from '@ant-design/icons';
import { DEFAULT_USERS, type User } from '../lib/users';

const { Title, Text, Paragraph } = Typography;

interface LoginPageProps {
  onSelectUser: (user: User) => void;
}

/**
 * Get icon for user type
 */
function getUserIcon(userId: string) {
  const iconProps = { style: { fontSize: 32 } };

  switch (userId) {
    case 'vip-shopper':
      return <CrownOutlined {...iconProps} style={{ ...iconProps.style, color: '#b8860b' }} />;
    case 'beta-tester':
      return <ExperimentOutlined {...iconProps} style={{ ...iconProps.style, color: '#722ed1' }} />;
    case 'new-shopper':
      return <CompassOutlined {...iconProps} style={{ ...iconProps.style, color: '#2f5233' }} />;
    default:
      return <UserOutlined {...iconProps} style={{ ...iconProps.style, color: '#1e3a5f' }} />;
  }
}

/**
 * Get color for membership tier tag
 */
function getTierColor(tier: string): string {
  const colorMap: Record<string, string> = {
    vip: 'gold',
    beta: 'purple',
    new: 'green',
    basic: 'default',
  };
  return colorMap[tier] || 'default';
}

export function LoginPage({ onSelectUser }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {/* Mountain Logo */}
          <svg width="56" height="40" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 16 }}>
            <path d="M14 0L20 12L28 20H0L8 12L14 0Z" fill="#fff"/>
            <path d="M8 6L12 14L16 20H0L4 14L8 6Z" fill="#a8d1ab" opacity="0.7"/>
          </svg>
          <Title level={1} style={{ color: '#fff', marginBottom: 8, letterSpacing: 3, textTransform: 'uppercase' }}>
            Select Your Profile
          </Title>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }}>
            Choose a persona to explore a personalized outdoor gear experience
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {DEFAULT_USERS.map((user) => (
            <Col xs={24} sm={12} lg={6} key={user.id}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                styles={{
                  body: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  },
                }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%', flex: 1 }}>
                  {/* Avatar */}
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: '#f5f3ef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        marginBottom: 16,
                      }}
                    >
                      {getUserIcon(user.id)}
                    </div>

                    <Title level={4} style={{ marginBottom: 4 }}>
                      {user.name}
                    </Title>

                    <Tag color={getTierColor(user.properties.strings.membershipTier)}>
                      {user.properties.strings.membershipTier}
                    </Tag>
                  </div>

                  {/* Description */}
                  <Paragraph
                    type="secondary"
                    style={{
                      textAlign: 'center',
                      marginBottom: 0,
                      minHeight: 40,
                      fontSize: 13,
                    }}
                  >
                    {user.description}
                  </Paragraph>

                  {/* Properties Summary */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        background: '#faf9f7',
                        padding: 12,
                        borderRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Member Type:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.membershipTier}</Text>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Region:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.region}</Text>
                      </div>
                      <div>
                        <Text strong>Member Since:</Text>{' '}
                        <Text type="secondary">{user.properties.numbers.memberSince} months</Text>
                      </div>
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={() => onSelectUser(user)}
                  >
                    Continue as {user.name.split(' ')[0]}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Info Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 48,
            padding: 24,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 13 }}>
            Each profile has different properties used for feature flag targeting.
            Switch between profiles to see how the outdoor shopping experience adapts.
          </Text>
        </div>
      </div>
    </div>
  );
}

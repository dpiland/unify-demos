/**
 * LoginPage Component
 *
 * Provides a user selector for demo purposes.
 * Users can "log in" by clicking on a persona, which sets their
 * properties for feature flag targeting.
 */

import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import { UserOutlined, CrownOutlined, ExperimentOutlined, SmileOutlined } from '@ant-design/icons';
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
    case 'premium-user':
      return <CrownOutlined {...iconProps} style={{ ...iconProps.style, color: '#faad14' }} />;
    case 'beta-tester':
      return <ExperimentOutlined {...iconProps} style={{ ...iconProps.style, color: '#722ed1' }} />;
    case 'new-user':
      return <SmileOutlined {...iconProps} style={{ ...iconProps.style, color: '#52c41a' }} />;
    default:
      return <UserOutlined {...iconProps} style={{ ...iconProps.style, color: '#1890ff' }} />;
  }
}

/**
 * Get color for user tier tag
 */
function getTierColor(tier: string): string {
  const colorMap: Record<string, string> = {
    premium: 'gold',
    beta: 'purple',
    new: 'green',
    standard: 'blue',
  };
  return colorMap[tier] || 'default';
}

export function LoginPage({ onSelectUser }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 8 }}>
            Demo User Selector
          </Title>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.85)' }}>
            Choose a user persona to see how features change based on targeting rules
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
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
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
                        background: '#f0f0f0',
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

                    <Tag color={getTierColor(user.properties.strings.userTier)}>
                      {user.properties.strings.userTier}
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
                        background: '#fafafa',
                        padding: 12,
                        borderRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Account Type:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.accountType}</Text>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Region:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.region}</Text>
                      </div>
                      <div>
                        <Text strong>Account Age:</Text>{' '}
                        <Text type="secondary">{user.properties.numbers.accountAge} months</Text>
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
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13 }}>
            💡 <strong>Tip:</strong> Each user has different properties that can be used to target
            feature flags in CloudBees Unify. Switch between users to see how features change
            dynamically.
          </Text>
        </div>
      </div>
    </div>
  );
}

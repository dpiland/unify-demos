/**
 * LoginPage Component — CloudBees Unify
 *
 * User persona selector for demos. Three personas representing
 * Free, Team, and Enterprise plan tiers.
 */

import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import { CodeOutlined, TeamOutlined, SafetyCertificateOutlined, CrownOutlined } from '@ant-design/icons';
import { DEFAULT_USERS, type User } from '../lib/users';

const { Title, Text, Paragraph } = Typography;

interface LoginPageProps {
  onSelectUser: (user: User) => void;
}

function getUserIcon(userId: string) {
  const iconProps = { style: { fontSize: 32 } };

  switch (userId) {
    case 'free-developer':
      return <CodeOutlined {...iconProps} style={{ ...iconProps.style, color: '#8c8c8c' }} />;
    case 'team-lead':
      return <TeamOutlined {...iconProps} style={{ ...iconProps.style, color: '#1890ff' }} />;
    case 'cloudbees-admin':
      return <CrownOutlined {...iconProps} style={{ ...iconProps.style, color: '#722ed1' }} />;
    case 'enterprise-admin':
      return <SafetyCertificateOutlined {...iconProps} style={{ ...iconProps.style, color: '#faad14' }} />;
    default:
      return <CodeOutlined {...iconProps} style={{ ...iconProps.style, color: '#8c8c8c' }} />;
  }
}

function getTierColor(tier: string): string {
  const colorMap: Record<string, string> = {
    free: 'default',
    team: 'blue',
    enterprise: 'gold',
  };
  return colorMap[tier] || 'default';
}

export function LoginPage({ onSelectUser }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1b1f3b 0%, #303660 50%, #1b1f3b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 8 }}>
            CloudBees Unify
          </Title>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.75)' }}>
            Select your account to continue
          </Text>
        </div>

        <Row gutter={[24, 24]} justify="center">
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

                    <Tag color={getTierColor(user.properties.strings.planTier)}>
                      {user.properties.strings.planTier}
                    </Tag>
                  </div>

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
                        <Text strong>Role:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.role}</Text>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Pipelines:</Text>{' '}
                        <Text type="secondary">{user.properties.numbers.pipelinesCount}</Text>
                      </div>
                      <div>
                        <Text strong>Team Size:</Text>{' '}
                        <Text type="secondary">{user.properties.numbers.teamSize}</Text>
                      </div>
                    </div>
                  </div>

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

        <div
          style={{
            textAlign: 'center',
            marginTop: 48,
            padding: 24,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: 13 }}>
            Each account represents a different plan tier. Switch between accounts to see
            how platform modules unlock and support options change based on feature flag targeting.
          </Text>
        </div>
      </div>
    </div>
  );
}

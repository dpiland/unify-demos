/**
 * LoginPage Component
 *
 * Provides a user selector for demo purposes.
 * Users can "log in" by clicking on a persona, which sets their
 * properties for feature flag targeting.
 */

import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import { MedicineBoxOutlined, HeartOutlined, TeamOutlined, ReadOutlined } from '@ant-design/icons';
import { DEFAULT_USERS, type User } from '../lib/users';

const { Title, Text, Paragraph } = Typography;

interface LoginPageProps {
  onSelectUser: (user: User) => void;
}

/**
 * Get icon for healthcare provider role
 */
function getUserIcon(userId: string) {
  const iconProps = { style: { fontSize: 32 } };

  switch (userId) {
    case 'specialist':
      return <HeartOutlined {...iconProps} style={{ ...iconProps.style, color: '#722ed1' }} />;
    case 'nurse-practitioner':
      return <TeamOutlined {...iconProps} style={{ ...iconProps.style, color: '#52c41a' }} />;
    case 'resident':
      return <ReadOutlined {...iconProps} style={{ ...iconProps.style, color: '#faad14' }} />;
    default: // primary-care
      return <MedicineBoxOutlined {...iconProps} style={{ ...iconProps.style, color: '#0891b2' }} />;
  }
}

/**
 * Get color for role tag
 */
function getRoleColor(role: string): string {
  const colorMap: Record<string, string> = {
    physician: 'blue',
    surgeon: 'purple',
    'nurse-practitioner': 'green',
    resident: 'orange',
  };
  return colorMap[role] || 'default';
}

export function LoginPage({ onSelectUser }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0891b2 0%, #155e75 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 8 }}>
            Select Your Provider Profile
          </Title>
          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.85)' }}>
            Choose a provider persona to experience personalized clinical features
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

                    <Tag color={getRoleColor(user.properties.strings.role)}>
                      {user.properties.strings.role}
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
                        <Text strong>Department:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.department}</Text>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>Specialty:</Text>{' '}
                        <Text type="secondary">{user.properties.strings.specialty}</Text>
                      </div>
                      <div>
                        <Text strong>Patient Panel:</Text>{' '}
                        <Text type="secondary">{user.properties.numbers.patientPanelSize.toLocaleString()}</Text>
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
            <strong>Tip:</strong> Each provider has unique properties (role, department, experience)
            that enable personalized feature targeting in CloudBees Unify. Switch between providers
            to see how the dashboard adapts clinical features.
          </Text>
        </div>
      </div>
    </div>
  );
}

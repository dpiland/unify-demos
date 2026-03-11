/**
 * EnvironmentalBanner Component
 *
 * Static environmental messaging section at the bottom of the page.
 * Showcases sustainability commitments inspired by Patagonia's environmental mission.
 * Not flag-controlled -- always visible.
 */

import { Col, Row, Typography } from 'antd';
import { GlobalOutlined, SafetyOutlined, SyncOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export function EnvironmentalBanner() {
  return (
    <div
      style={{
        background: '#1a1a2e',
        padding: '48px 24px',
        marginTop: 48,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <GlobalOutlined style={{ fontSize: 32, color: '#a8d1ab', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#fff', marginBottom: 8, letterSpacing: 1 }}>
                1% FOR THE PLANET
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                We donate 1% of sales to the preservation and restoration of the natural environment.
              </Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <SafetyOutlined style={{ fontSize: 32, color: '#a8d1ab', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#fff', marginBottom: 8, letterSpacing: 1 }}>
                FAIR TRADE CERTIFIED
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                We pay a premium for every Fair Trade Certified item, going directly to the workers who made it.
              </Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <SyncOutlined style={{ fontSize: 32, color: '#a8d1ab', marginBottom: 16 }} />
              <Title level={5} style={{ color: '#fff', marginBottom: 8, letterSpacing: 1 }}>
                WORN WEAR
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                Trade in your used gear for credit. We repair, recycle, and keep gear in play longer.
              </Text>
            </div>
          </Col>
        </Row>

        <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontStyle: 'italic' }}>
            We're in business to save our home planet.
          </Text>
        </div>
      </div>
    </div>
  );
}

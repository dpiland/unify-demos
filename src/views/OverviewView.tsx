/**
 * Overview view — the map. One portfolio, four audiences, four jobs to be done.
 */

import { Typography, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { DEFAULT_USERS, type AudienceView } from '../lib/users';
import { HookBanner, Section, Panel, Pill, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const THEMES = [
  { t: 'Scrappy builder', d: 'I build the function from zero — like this app.' },
  { t: 'Translation is the skill', d: 'Not domain mastery. I make technical truth legible to buyers.' },
  { t: 'Narrative as strategy', d: 'I shape how the market thinks, then arm everyone to repeat it.' },
];

export function OverviewView({ onNavigate }: { onNavigate: (view: AudienceView) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="Drew Piland · Product Marketing"
        jtbd="One portfolio. Four audiences. Four jobs to be done."
        hook="The same app shows each of you the strategic plan I'd own for your function — and the proof I can build it out."
        metrics={[
          { value: 'First PMM', label: 'function built from zero' },
          { value: '4 views', label: 'one app, tailored per function' },
          { value: '3 themes', label: 'scrappy · translation · narrative' },
        ]}
      />

      <Section id="themes" kicker="What threads through all of it" title="Three themes">
        <Row gutter={[16, 16]}>
          {THEMES.map(x => (
            <Col xs={24} md={8} key={x.t}>
              <Panel style={{ height: '100%' }}>
                <Pill color={BRAND.violet}>{x.t}</Pill>
                <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>{x.d}</Paragraph>
              </Panel>
            </Col>
          ))}
        </Row>
      </Section>

      <Section id="views" kicker="Choose a view" title="Built for each of you">
        <Row gutter={[16, 16]}>
          {DEFAULT_USERS.map(u => (
            <Col xs={24} md={12} key={u.id}>
              <button
                onClick={() => onNavigate(u.defaultView)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: '#fff',
                  border: '1px solid #ece8f4',
                  borderRadius: 14,
                  padding: 22,
                  transition: 'border-color 0.15s ease, transform 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = BRAND.violet;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#ece8f4';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong style={{ color: BRAND.ink, fontSize: 16 }}>{u.name}</Text>
                  <ArrowRightOutlined style={{ color: BRAND.violet }} />
                </div>
                <Text style={{ color: BRAND.violetDark, fontSize: 13 }}>{u.role}</Text>
                <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.55, fontSize: 14 }}>
                  {u.description}
                </Paragraph>
              </button>
            </Col>
          ))}
        </Row>
      </Section>
    </div>
  );
}

/**
 * Sales Meeting view — built for Mark Poggi (SVP Commercial).
 * Tools to help sales progress, Cowork projects for self-serve enablement, onboarding.
 */

import { Typography, Row, Col } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Deliverable, Stat, Questions, Tagline, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const COWORK_PROJECTS = [
  { name: 'Field-facing messaging GPT', body: 'On-narrative answers + objection handling in 30 seconds, not by pinging PMM.', tag: 'self-serve' },
  { name: 'Battlecard generator', body: 'Current battlecards from the single source of truth — never stale, never off-narrative.', tag: 'always current' },
  { name: 'Call-prep agent', body: 'Drafts a discovery plan around the "intelligence, not search" reframe by account + stage.', tag: 'discovery motion' },
  { name: 'New-rep onboarding agent', body: 'Walks a hire through the story, proof, and personas — then quizzes them. Faster ramp.', tag: 'ramp' },
];

export function SalesView() {
  const showCowork = useFeatureFlag('showCoworkEnablement');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Mark Poggi · SVP Commercial"
        jtbd="Make the rep's hardest conversation easy — and adoption inevitable."
        hook="PMM as a compounding revenue asset: narrative → enablement → pipeline velocity → win rate."
        metrics={[
          { value: '+272% YoY', label: 'win intel + SDR + scoring' },
          { value: '2 numbers', label: 'pipeline created + won' },
          { value: 'Stage 1–3', label: 'velocity + field adoption' },
        ]}
      />

      <SpeakerTrack>
        Speak revenue, not marketing craft. Open on +272% YoY. Land the two numbers: pipeline created and pipeline won.
        Preempt the "too brand, not commercial enough" objection — lead with the number, then the system.
      </SpeakerTrack>

      <Section id="tools" kicker="Tools to help sales progress" title="Arm reps to create the frame, not just pitch features">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>Unified enablement SSOT</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                One source for messaging, competitive, objections — measured on pipeline velocity, not page views.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>JTBD pitch selector</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                Reps pick the pitch by buyer role — VP R&D / CTO / CIO vs. the bench chemist.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The reframe as a discovery motion</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                "Intelligence, not search" = discovery questions that make the buyer feel the gap before a demo.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>CFO-ready business case</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                The ROI asset (with Brooke) that lets the champion sell internally — every input source-tagged.
              </Paragraph>
            </Panel>
          </Col>
        </Row>
      </Section>

      {showCowork && (
        <Section id="cowork" kicker="Self-serve enablement" title="Cowork projects: enablement reps run themselves">
          <Paragraph style={{ color: '#56506b', lineHeight: 1.55, marginBottom: 16, maxWidth: 760 }}>
            Scale a small PMM function by making enablement AI-native and self-serve — so PMM never becomes the bottleneck.
            (This portfolio app is the same scrappy build.)
          </Paragraph>
          <Row gutter={[16, 16]}>
            {COWORK_PROJECTS.map(p => (
              <Col xs={24} md={12} key={p.name}>
                <Panel accent style={{ height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <Text strong style={{ color: BRAND.ink, fontSize: 15 }}>{p.name}</Text>
                    <Pill>{p.tag}</Pill>
                  </div>
                  <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                    {p.body}
                  </Paragraph>
                </Panel>
              </Col>
            ))}
          </Row>
        </Section>
      )}

      <Section id="onboarding" kicker="Onboarding" title="Ramping a rep to sell a brand-new category">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Deliverable title="Ride the calls" tag="Days 1–30" body="Learn where reps get stuck and where deals stall. Map what data exists and what reps are measured on." />
            <Deliverable title="Build around the real objection" tag="Days 30–60" body="Turn recurring friction into discovery scripts, battlecards, and the field-facing GPT." />
            <Deliverable title="Measure adoption, then expand" tag="Days 60–90" body="Track narrative adoption + Stage 1–3 velocity. Double down on what moves the number." />
          </div>
        </Panel>
      </Section>

      <Section id="measure" kicker="The commercial check" title="How I measure PMM's impact on revenue">
        <Panel accent>
          <Row gutter={[24, 16]}>
            <Col xs={12} md={6}><Stat value="Pipeline created" label="leading: net-new qualified pipeline" /></Col>
            <Col xs={12} md={6}><Stat value="Pipeline won" label="lagging: the C-suite number" /></Col>
            <Col xs={12} md={6}><Stat value="Message lift" label="Wynter test + field adoption" /></Col>
            <Col xs={12} md={6}><Stat value="Win rate" label="target segment, before vs. after" /></Col>
          </Row>
          <Paragraph style={{ marginTop: 16, marginBottom: 8, color: '#3a3450', lineHeight: 1.6 }}>
            A first-PMM hire who's "too brand" is a risk to preempt. I've carried a number —{' '}
            <Text strong style={{ color: BRAND.violetDark }}>+272% YoY</Text> — and I build systems that make reps more
            effective, not just more collateral.
          </Paragraph>
          <Tagline kind="verified">+272% YoY · Lenovo / Microsoft CSP</Tagline>
        </Panel>
      </Section>

      <Questions
        name="Mark"
        items={[
          "What's the hardest part of selling Albert today — the category, the champion, or the economic buyer?",
          'Where do reps lose deals, and where would a PMM make the biggest dent in two quarters?',
          'How do you want to measure whether this PMM hire is working, six months in?',
        ]}
      />
    </div>
  );
}

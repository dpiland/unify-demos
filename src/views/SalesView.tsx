/**
 * Sales Meeting view — built for Mark Poggi (SVP Commercial).
 * Tools to help sales progress, Cowork projects for self-serve enablement, onboarding.
 */

import { Typography, Row, Col } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Deliverable, Stat, Questions, Tagline, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const COWORK_PROJECTS = [
  {
    name: 'Field-facing messaging GPT',
    body: 'A custom GPT trained on the messaging house and competitive SSOT. A rep prepping a call gets the on-narrative answer — and the right objection handling — in 30 seconds, not by pinging PMM.',
    tag: 'self-serve',
  },
  {
    name: 'Battlecard generator',
    body: 'Feed it a competitor or a deal context; it returns a current battlecard built from the single source of truth, so cards never go stale and never contradict the category line.',
    tag: 'always current',
  },
  {
    name: 'Call-prep agent',
    body: 'Pulls the account, the buyer role, and the stage, then drafts a discovery plan around the "intelligence problem, not search problem" reframe — turning the category claim into a repeatable discovery motion.',
    tag: 'discovery motion',
  },
  {
    name: 'New-rep onboarding agent',
    body: 'Walks a new hire through the category story, the proof points, and the buyer personas, then quizzes them — compressing ramp time on a story that\'s hard precisely because the buyer doesn\'t know they have the problem.',
    tag: 'ramp',
  },
];

export function SalesView() {
  const showCowork = useFeatureFlag('showCoworkEnablement');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Mark Poggi · SVP Commercial"
        jtbd="Make the rep's hardest conversation easy — and adoption inevitable."
        hook="PMM is a compounding revenue asset, not a collateral factory: narrative → enablement → pipeline velocity → win rate. Two numbers matter — pipeline created and pipeline won — and everything I build ladders to them. Category sales are hard because the buyer doesn't know they have the problem, so enablement has to arm reps to create the frame, not just pitch features."
        metrics={[
          { value: '+272% YoY', label: 'revenue from win-intelligence + SDR outreach + lead scoring (Lenovo/Microsoft CSP)' },
          { value: '2 numbers', label: 'pipeline created and pipeline won — what everything ladders to' },
          { value: 'Stage 1–3', label: 'velocity + field adoption: how I measure enablement that works' },
        ]}
      />

      <SpeakerTrack>
        Speak revenue, not marketing craft. Open on +272% YoY. Land the two numbers: pipeline created and pipeline won.
        Preempt the "too brand, not commercial enough" objection before he raises it — lead with the number, then the system.
      </SpeakerTrack>

      <Section id="tools" kicker="Tools to help sales progress" title="Arm reps to create the frame, not just pitch features">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>Unified enablement SSOT</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                One source of truth for messaging, competitive, and objection handling — the same system that, at
                CloudBees, was measured on Stage 1–3 pipeline velocity, not page views.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>JTBD pitch selector</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                A tool that lets a rep pick the right pitch by buyer role — VP R&D / CTO / CIO vs. the bench chemist
                champion. (At Lenovo this ran across a 30-vendor portfolio.)
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The reframe as a discovery motion</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                "Intelligence problem, not search problem" isn't a tagline — it's a set of discovery questions that help a
                rep make the buyer feel the gap before a demo ever loads.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>CFO-ready business case</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                The decision-stage ROI asset (built with Brooke) that lets the champion sell internally — every input
                source-labeled so it survives procurement scrutiny.
              </Paragraph>
            </Panel>
          </Col>
        </Row>
      </Section>

      {showCowork && (
        <Section id="cowork" kicker="Self-serve enablement" title="Cowork projects: enablement reps run themselves">
          <Paragraph style={{ color: '#56506b', lineHeight: 1.6, marginBottom: 16, maxWidth: 820 }}>
            The fastest way to scale a small PMM function is to make enablement self-serve and AI-native. These are
            concrete Cowork/agent projects I'd stand up so reps get answers on demand — and so PMM scales without becoming
            the bottleneck. (This portfolio app is itself a working example of the same scrappy, AI-native build.)
          </Paragraph>
          <Row gutter={[16, 16]}>
            {COWORK_PROJECTS.map(p => (
              <Col xs={24} md={12} key={p.name}>
                <Panel accent style={{ height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <Text strong style={{ color: BRAND.ink, fontSize: 15 }}>{p.name}</Text>
                    <Pill>{p.tag}</Pill>
                  </div>
                  <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Deliverable
              title="Ride the calls"
              tag="Days 1–30"
              body="Before imposing any framework, ride sales calls and learn what reps actually get stuck on and where deals stall. Map what data exists and what reps are measured on."
            />
            <Deliverable
              title="Build around the real objection"
              tag="Days 30–60"
              body="Turn the recurring objection into discovery scripts, battlecards, and the field-facing GPT. Enablement built from real friction, not a template."
            />
            <Deliverable
              title="Measure adoption, then expand"
              tag="Days 60–90"
              body="Track whether reps are actually using the new narrative (field adoption) and its effect on Stage 1–3 velocity. Double down on what moves the number; cut what doesn't."
            />
          </div>
        </Panel>
      </Section>

      <Section id="measure" kicker="The commercial check" title="How I measure PMM's impact on revenue">
        <Panel accent>
          <Row gutter={[24, 16]}>
            <Col xs={12} md={6}><Stat value="Pipeline created" label="leading: net-new qualified pipeline influenced by the narrative" /></Col>
            <Col xs={12} md={6}><Stat value="Pipeline won" label="lagging: the number the C-suite actually cares about" /></Col>
            <Col xs={12} md={6}><Stat value="Message lift" label="Wynter test lift + field adoption of new narratives" /></Col>
            <Col xs={12} md={6}><Stat value="Win rate" label="in the target segment, before vs. after enablement" /></Col>
          </Row>
          <Paragraph style={{ marginTop: 16, marginBottom: 8, color: '#3a3450', lineHeight: 1.6 }}>
            Bottom line: a first-PMM hire who's "too brand" is a real risk to preempt. I've carried a number — the{' '}
            <Text strong style={{ color: BRAND.violetDark }}>+272% YoY</Text> at Lenovo was win intelligence, SDR outreach,
            and lead scoring working together — and I build systems that make reps more effective, not just more collateral.
          </Paragraph>
          <Tagline kind="verified">+272% YoY · Lenovo / Microsoft CSP</Tagline>
        </Panel>
      </Section>

      <Questions
        name="Mark"
        items={[
          "What's the hardest part of selling Albert today — the category, the champion, or the economic buyer?",
          'Where do reps lose deals, and where would a PMM make the biggest dent in the next two quarters?',
          'How do you want to measure whether this PMM hire is working, six months in?',
        ]}
      />
    </div>
  );
}

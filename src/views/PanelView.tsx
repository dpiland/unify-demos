/**
 * Panel / Case Study view — built for Dana Barrett (and the case-study panel).
 * Part 1: the launch I led. Part 2: the category narrative for Ask Albert.
 */

import { Typography, Row, Col, Collapse, Tag } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Stat, Questions, Deliverable, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const TITLE_STORY = [
  'The organizations that define the next generation of materials science will be the ones that can learn from every experiment in real time.',
  'Every scientist in your organization is working with a fraction of what your organization already knows.',
  'This is not a search problem. It is an intelligence problem.',
  'Materials science needs an operating system.',
  "This is what it looks like when your organization's chemistry finally knows what it knows.",
  'At scale: three months to two days. 2× speed-to-market. These organizations are not waiting.',
  'The window for building an irreversible advantage is open now. It will not stay open.',
  'The question is not whether to change. The question is whether your organization leads it.',
];

const PUSHBACK = [
  { q: 'Why no stat on slide 2?', a: 'Deliberate — no primary-source R&D time-waste figure survives a CTO. The move: Albert commissions its own study, a data point no competitor can own. Judgment, not a gap.' },
  { q: 'Why no comparison slide vs. LIMS/ELN?', a: 'Naming them concedes the wrong category. Slides 3 and 4 make the distinction felt; the audience draws the conclusion.' },
  { q: "What's your biggest assumption?", a: 'That the aha is breadth of connection, not speed. Speed is a feature argument; connection is a category argument. If it\'s answer quality, slide 5 shifts — I\'d confirm first.' },
  { q: 'Why "Ask Albert" vs "Albert Breakthrough"?', a: "I'll own it: a working label. A messaging + naming SSOT is a first-30-days deliverable I'd lock with product and content. A gap to close, not interchangeable terms." },
  { q: 'What would you cut or change?', a: 'Swap slide 5 for a verbatim customer quote; verify Nouryon/BeautyCreations proof is cleared. A draft pending real inputs — and I know which.' },
];

export function PanelView() {
  const showPushback = useFeatureFlag('showPushbackPrep');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Dana Barrett · VP Marketing & the case-study panel"
        jtbd="The case study, the way I'd present it."
        hook="A launch I led, and the category narrative I'd build for Ask Albert — strategy first, then the build-out."
        metrics={[
          { value: '+90 days', label: 'recovered vs competitors' },
          { value: '3 → 1', label: 'buying centers → one champion' },
          { value: '8 titles', label: '= one complete argument' },
        ]}
      />

      <SpeakerTrack>
        Don't narrate the slides — perform the first 90 seconds as the CEO, then step out to explain the choices. Land the
        numbers: 3 → 1 champion, +90 days. Bridge to Part 2: "read the eight titles in sequence and that IS the argument."
        Slow down; let the lines land.
      </SpeakerTrack>

      <Section id="pt1" kicker="Case Study · Part 1" title="A launch I led: enterprise policy-defined progressive delivery">
        <Panel style={{ marginBottom: 16 }}>
          <Pill color={BRAND.violet}>BLUF</Pill>
          <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#3a3450', fontSize: 15.5, lineHeight: 1.6 }}>
            CloudBees was shipping three differentiated capabilities as separate products — three buying centers for one
            deal. I reframed them as one outcome:{' '}
            <Text strong style={{ color: BRAND.violetDark }}>enterprise policy-defined progressive delivery</Text> — and
            launched on demo-ready state, not GA.
          </Paragraph>
        </Panel>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The strategic insight</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                Policy without workflow = audit tool. Workflow without policy = manual governance. Unified = the first
                platform to <em>enforce</em> progressive delivery, not just manage it.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The bet I drove</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                Trigger on a May 1 demo, not July GA — +90 days. De-risked first: Gong surfaced the need; Wynter confirmed
                the ICP wanted a unified control plane, no forced migration.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>What I'd do differently</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                Run discovery before the offsite — so the reframe lands on validated customer words, not instinct plus
                analyst signal.
              </Paragraph>
            </Panel>
          </Col>
        </Row>

        <Panel accent style={{ marginTop: 16 }}>
          <Text strong style={{ color: BRAND.ink }}>Outcomes</Text>
          <Row gutter={[24, 16]} style={{ marginTop: 12 }}>
            <Col xs={12} md={6}><Stat value="VP Eng + CISO" label="tool → platform conversation" /></Col>
            <Col xs={12} md={6}><Stat value="3 → 1" label="champion, with CISO escalation" /></Col>
            <Col xs={12} md={6}><Stat value="+90 days" label="recovered vs competitors" /></Col>
            <Col xs={12} md={6}><Stat value="Unify AI" label="narrative became its premise" /></Col>
          </Row>
        </Panel>
      </Section>

      <Section id="pt2" kicker="Case Study · Part 2" title="The category narrative for Ask Albert">
        <Paragraph style={{ color: '#56506b', lineHeight: 1.55, marginBottom: 16, maxWidth: 760 }}>
          An 8-slide CEO keynote for CTOs, CIOs, Heads of Research. Problem-aware audience → open on vision, not diagnosis.
          Read the titles in sequence: that's the argument.
        </Paragraph>

        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TITLE_STORY.map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  padding: '12px 0',
                  borderBottom: i < TITLE_STORY.length - 1 ? '1px solid #f0ecf7' : 'none',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: BRAND.violetSoft,
                    color: BRAND.violetDark,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <Text style={{ color: BRAND.ink, fontSize: 15, lineHeight: 1.45 }}>{line}</Text>
              </div>
            ))}
          </div>
        </Panel>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The structural bets</Text>
              <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                <li>Open on vision — no four slides of diagnosis.</li>
                <li>Distinction in the framing, never a comparison slide.</li>
                <li>Keynote register: intellectual, not commercial.</li>
                <li>The chemist-founder credential earns the claim on the proof slide; it doesn't lead.</li>
              </ul>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>For Brooke's lens</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.55, fontSize: 14 }}>
                Title-as-argument cascades: each title → a content pillar. The keynote is the spine of a quarter of content.
              </Paragraph>
              <Tag style={{ borderRadius: 999, border: 'none', background: BRAND.violetSoft, color: BRAND.violetDark, marginTop: 10 }}>
                narrative as strategy
              </Tag>
            </Panel>
          </Col>
        </Row>
      </Section>

      {showPushback && (
        <Section id="pushback" kicker="Q&A prep" title="Anticipated pushback — and the crisp answer">
          <Collapse
            accordion
            expandIconPosition="end"
            items={PUSHBACK.map((p, i) => ({
              key: String(i),
              label: <Text strong style={{ color: BRAND.ink }}>{p.q}</Text>,
              children: <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.55 }}>{p.a}</Paragraph>,
            }))}
          />
        </Section>
      )}

      <Section id="seat" kicker="If I had the seat" title="How the first launch at Albert would run">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Deliverable title="Discovery before the deck" tag="Days 1–30" body="Ride calls, mine Gong, validate category language with real buyers — narrative ships on customer words, not instinct." />
            <Deliverable title="Messaging + naming SSOT, then the keynote" tag="Days 30–60" body="Lock the source of truth, then build the keynote as the spine the whole funnel inherits." />
            <Deliverable title="Launch on demo-ready, measured on pipeline" tag="Days 60–90" body="Pre-GA launch model, instrumented on pipeline created + field adoption from day one." />
          </div>
        </Panel>
      </Section>

      <Questions
        name="Dana"
        items={[
          "Since we last talked, what's gotten sharper about what this first PMM needs to nail in six months?",
          'Which part of this case study would you most want me to go deeper on right now?',
        ]}
      />
    </div>
  );
}

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
  "Every scientist in your organization is working with a fraction of what your organization already knows.",
  'This is not a search problem. It is an intelligence problem.',
  'Materials science needs an operating system.',
  "This is what it looks like when your organization's chemistry finally knows what it knows.",
  'At scale: three months to two days. 2× speed-to-market. These organizations are not waiting.',
  'The window for building an irreversible advantage is open now. It will not stay open.',
  'The question is not whether to change. The question is whether your organization leads it.',
];

const PUSHBACK = [
  {
    q: 'Why no stat on slide 2?',
    a: 'Deliberate. No primary-source figure for R&D time-waste survives a CTO audience; a challenged stat would undermine a category claim. The recommendation: Albert commissions its own study — a data point no competitor can own. That\'s judgment, not a gap.',
  },
  {
    q: 'Why no comparison slide vs. LIMS/ELN?',
    a: 'Naming them as competitors accepts the wrong category frame. Slide 3 ("not a search problem, an intelligence problem") and Slide 4 ("not another ELN, not a LIMS with a chatbot") make the distinction felt without a table. The audience draws the conclusion themselves.',
  },
  {
    q: "What's your biggest assumption?",
    a: 'That the customer aha moment is breadth of data connection, not speed of retrieval. Speed is a feature argument; connection is a category argument. If it\'s actually answer quality, the slide-5 scenario shifts — and I\'d confirm before presenting.',
  },
  {
    q: 'Why does the deck say "Ask Albert" when the product is "Albert Breakthrough"?',
    a: 'I\'ll own it: the deck uses a working label for the conversational layer. A first-PMM deliverable is a single messaging + naming source of truth — naming is exactly what I\'d lock down with product (Oakley) and content (Brooke) in the first 30 days so nothing ships inconsistent. I treat it as a gap to close, not interchangeable terms.',
  },
  {
    q: 'What would you cut or change?',
    a: 'Replace the slide-5 scenario with a real verbatim customer quote, and verify the Nouryon/BeautyCreations proof points are cleared for public use. The deck is a draft pending real customer inputs, and I know which ones.',
  },
];

export function PanelView() {
  const showPushback = useFeatureFlag('showPushbackPrep');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Dana Barrett · VP Marketing & the case-study panel"
        jtbd="The case study, delivered the way I'd present it."
        hook="Two artifacts. Part 1 is a launch I actually led — three roadmap features reframed into one platform strategy that moved the buyer up two levels. Part 2 is the category narrative I'd build for Ask Albert: an eight-slide CEO keynote where the titles, read in sequence, are the entire argument. Impact first; I'll show how the sausage is made after the hook lands."
        metrics={[
          { value: '+90 days', label: 'recovered against competitors by launching on demo-ready, not GA' },
          { value: '3 → 1', label: 'buying-center conversations collapsed into a single champion' },
          { value: '8 titles', label: 'that read in sequence as one complete category argument' },
        ]}
      />

      <SpeakerTrack>
        Don't narrate the slides — perform the first 90 seconds as the CEO, then step out to explain the choices. Land the
        numbers: 3 → 1 champion, +90 days recovered. Bridge to Part 2: "read the eight titles in sequence and that IS the
        argument." Slow down; let the lines land.
      </SpeakerTrack>

      <Section id="pt1" kicker="Case Study · Part 1" title="A launch I led: enterprise policy-defined progressive delivery">
        <Panel style={{ marginBottom: 16 }}>
          <Pill color={BRAND.violet}>BLUF</Pill>
          <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#3a3450', fontSize: 15.5, lineHeight: 1.65 }}>
            CloudBees was launching three of its most differentiated capabilities — release orchestration, feature flags,
            and a new policy engine — as <Text strong>separate products</Text>, forcing sales to win three buying centers
            to close one deal, and arriving 6–9 months after competitors. I reframed them as one buyer outcome:{' '}
            <Text strong style={{ color: BRAND.violetDark }}>enterprise policy-defined progressive delivery</Text> — and
            changed the launch model itself, going to market on demo-ready state instead of GA.
          </Paragraph>
        </Panel>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The strategic insight</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                A policy engine without a workflow is an audit tool. A workflow without policy is manual governance. Flags
                without policy are just deployment switches. Unified, they were the first platform to <em>enforce</em>{' '}
                progressive delivery rather than leave teams to manage it.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>The bet I drove</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                Move the launch trigger from a July GA to a demo recorded May 1 — recovering 90 days. I de-risked it first:
                Gong call review surfaced the policy engine as a recurring requirement, and Wynter surveys of our ICP
                confirmed enterprises wanted a unified control plane without a forced toolchain migration.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={8}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>What I'd do differently</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                Run customer discovery <em>before</em> the offsite, so the reframe lands on validated customer language from
                day one — not instinct plus analyst signal. The argument holds better when you can say "three customers
                described this as their actual problem."
              </Paragraph>
            </Panel>
          </Col>
        </Row>

        <Panel accent style={{ marginTop: 16 }}>
          <Text strong style={{ color: BRAND.ink }}>Outcomes</Text>
          <Row gutter={[24, 16]} style={{ marginTop: 12 }}>
            <Col xs={12} md={6}><Stat value="VP Eng + CISO" label="elevated from a CI/CD tool to a platform conversation" /></Col>
            <Col xs={12} md={6}><Stat value="3 → 1" label="champion: one release manager with a built-in CISO escalation" /></Col>
            <Col xs={12} md={6}><Stat value="+90 days" label="recovered against embedded competitors" /></Col>
            <Col xs={12} md={6}><Stat value="Unify AI" label="the control-plane narrative became its strategic premise" /></Col>
          </Row>
        </Panel>
      </Section>

      <Section id="pt2" kicker="Case Study · Part 2" title="The category narrative for Ask Albert">
        <Paragraph style={{ color: '#56506b', lineHeight: 1.6, marginBottom: 16, maxWidth: 820 }}>
          An eight-slide CEO keynote for CTOs, CIOs, and Heads of Research. The structural bet: this audience is
          problem-aware, so the deck opens on the vision, not four slides of diagnosis. Read the titles in sequence and
          you have the complete argument — which is exactly what makes it cascade into content modules.
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
                  padding: '14px 0',
                  borderBottom: i < TITLE_STORY.length - 1 ? '1px solid #f0ecf7' : 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
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
                <Text style={{ color: BRAND.ink, fontSize: 15.5, lineHeight: 1.5 }}>{line}</Text>
              </div>
            ))}
          </div>
        </Panel>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>Market bets that shaped the deck</Text>
              <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, color: '#56506b', lineHeight: 1.7, fontSize: 14 }}>
                <li>Open on the vision — a problem-aware audience needs a reframe, not a diagnosis.</li>
                <li>Competitor distinction belongs in the framing, never a comparison slide.</li>
                <li>CEO-keynote register: intellectual, not commercial — no CTAs, no pricing.</li>
                <li>The credential (built by chemists from Dow, BASF, PPG, Henkel) earns the claim on the proof slide — it doesn't lead.</li>
              </ul>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.ink }}>For Brooke's lens</Text>
              <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                The title-as-argument structure is designed to cascade: each of the eight titles becomes a content pillar —
                bylines, social, webinar abstracts, sales one-pagers — so the keynote isn't a one-off, it's the spine of a
                quarter of content. <Tag style={{ borderRadius: 999, border: 'none', background: BRAND.violetSoft, color: BRAND.violetDark, marginTop: 10 }}>narrative as strategy</Tag>
              </Paragraph>
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
              children: (
                <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>{p.a}</Paragraph>
              ),
            }))}
          />
        </Section>
      )}

      <Section id="seat" kicker="If I had the seat" title="How the first launch at Albert would run">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Deliverable
              title="Discovery before the deck"
              tag="Days 1–30"
              body="The lesson from Part 1: run customer discovery first. Ride calls, mine Gong, and validate the category language with real buyers before a single slide — so the narrative ships on customer words, not instinct."
            />
            <Deliverable
              title="Messaging + naming SSOT, then the keynote"
              tag="Days 30–60"
              body="Lock the single source of truth (closing the Breakthrough vs. Ask Albert gap), then build the keynote as the argument spine the whole funnel inherits."
            />
            <Deliverable
              title="Launch on demo-ready, measured on pipeline"
              tag="Days 60–90"
              body="Apply the pre-GA launch model — go to market when it's demoable — and instrument it against pipeline created and field adoption from day one, the way you'd want it shown to the C-suite."
            />
          </div>
        </Panel>
      </Section>

      <Questions
        name="Dana"
        items={[
          "Since we last talked, what's gotten sharper for you about what this first PMM needs to nail in the first six months?",
          'Which part of this case study would you most want me to go deeper on right now?',
        ]}
      />
    </div>
  );
}

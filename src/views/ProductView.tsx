/**
 * Product Meeting view — built for Oakley Reid (AI/ML PM).
 * Vision-led: the category opportunity, testing the message, analyst strategy, build-out.
 */

import { Typography, Row, Col, Steps } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Deliverable, Questions, Tagline, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const TESTS = [
  { method: 'Wynter message testing', use: 'Test the "intelligence, not search" line on real R&D leaders before it ships.' },
  { method: 'Gong voice-of-customer', use: "Mine calls for the buyer's own words; build the claim from them." },
  { method: 'Analyst inquiries', use: 'Paid, bidirectional. Survives Shanler → survives a CTO.' },
  { method: 'End-user inquiry volume', use: 'The real scoreboard: buyers calling Gartner in our words.' },
];

export function ProductView() {
  const showAnalyst = useFeatureFlag('showAnalystStrategy');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Oakley Reid · AI/ML Product"
        jtbd="Materials science is getting a new foundation. Albert can own the category."
        hook="My job is translation — make the product's truth legible to buyers, pull market signal into your roadmap, and manufacture the three signals that make a category real."
        metrics={[
          { value: 'Once a decade', label: 'category windows open — this is the one' },
          { value: 'No MQ yet', label: 'Materials Informatics is still forming' },
          { value: '3 signals', label: 'demand · data · peer proof' },
        ]}
      />

      <SpeakerTrack>
        Lead with translation as a strength, not an apology — "DevSecOps and zero-trust were foreign before CloudBees and
        IBM." Land: there's no Magic Quadrant yet, and that absence is the opening. Then be the first to name the weakness
        (the "operating system" compounding bet) — before he does.
      </SpeakerTrack>

      <Section id="vision" kicker="The vision" title="A new foundation, the way cloud and mobile reset their industries">
        <Panel accent>
          <Paragraph style={{ marginBottom: 14, color: '#3a3450', lineHeight: 1.6, fontSize: 15.5 }}>
            The winners won't have the most scientists — they'll have scientists who learn from every experiment in real
            time. That needs an <Text strong style={{ color: BRAND.violetDark }}>AI-native operating system, not a better
            tool</Text>. The category has no name yet. Defining it before the market does is the whole opportunity.
          </Paragraph>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Pill>Cloud · 2008–11</Pill>
            <Pill>Mobile · 2010–13</Pill>
            <Pill color={BRAND.violet}>Materials AI · 2024–27?</Pill>
          </div>
        </Panel>
      </Section>

      <Section id="market" kicker="Market awareness" title="The shelf to refuse — and the one to define">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#ffccc7', background: '#fff1f0', height: '100%' }}>
              <Text strong style={{ color: '#a8071a', fontSize: 15 }}>Wrong frame</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#5c2b28', lineHeight: 1.55 }}>
                The market's reflex: shelve Albert in lab/R&D informatics (LIMS + ELN). It concedes the category. "Not a
                search problem — an intelligence problem."
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel accent style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.violetDark, fontSize: 15 }}>The real opening</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#3a3450', lineHeight: 1.55 }}>
                Gartner's emerging Materials Informatics Market Guide — no Magic Quadrant yet, no settled definition. We
                shape it. Analyst: <Text strong>Michael Shanler</Text> (Gartner).
              </Paragraph>
              <div style={{ marginTop: 10 }}>
                <Tagline kind="verified">covering analyst confirmed Jun 2026</Tagline>
              </div>
            </Panel>
          </Col>
        </Row>
      </Section>

      <Section id="test" kicker="Test the message" title="Ship the category claim on evidence, not instinct">
        <Row gutter={[16, 16]}>
          {TESTS.map(m => (
            <Col xs={24} md={12} key={m.method}>
              <Panel style={{ height: '100%' }}>
                <Pill color={BRAND.violet}>{m.method}</Pill>
                <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                  {m.use}
                </Paragraph>
              </Panel>
            </Col>
          ))}
        </Row>
      </Section>

      {showAnalyst && (
        <Section id="analyst" kicker="Analyst strategy" title="The flywheel that manufactures a category">
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} md={12}>
              <Panel style={{ height: '100%' }}>
                <Text strong style={{ color: BRAND.ink }}>Briefing</Text> <Pill>you teach the analyst</Pill>
                <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                  Plant the category language, on cadence and around launches.
                </Paragraph>
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel style={{ height: '100%' }}>
                <Text strong style={{ color: BRAND.ink }}>Inquiry</Text> <Pill>the analyst teaches you</Pill>
                <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#56506b', lineHeight: 1.5, fontSize: 14 }}>
                  Pressure-test the line; learn the real buyer questions. The gaps are gold for product too.
                </Paragraph>
              </Panel>
            </Col>
          </Row>

          <Panel>
            <Steps
              direction="vertical"
              size="small"
              current={-1}
              items={[
                { title: 'Seed the language', description: 'Brief analysts on the thesis, on cadence.' },
                { title: 'Pressure-test', description: 'Paid inquiries stress the claim.' },
                { title: 'Arm references', description: 'Customers describe Albert to analysts in our terms.' },
                { title: 'Inquiry volume rises', description: 'Buyers call Gartner about the problem in our words.' },
                { title: 'The analyst writes it down', description: 'Note, Hype Cycle, or Market Guide — our framing.' },
              ]}
            />
            <Paragraph style={{ marginTop: 12, marginBottom: 0, color: '#6b6480', fontSize: 13, fontStyle: 'italic' }}>
              Agency owns the motion; I own the narrative — and I'm in the briefings, because the claim only survives if its
              author defends it.
            </Paragraph>
          </Panel>
        </Section>
      )}

      <Section id="weakest" kicker="Staying honest" title="Where the category claim is weakest">
        <Panel style={{ borderColor: '#ffe58f', background: '#fffbe6' }}>
          <div style={{ marginBottom: 10 }}>
            <Tagline kind="hypothesis" />
          </div>
          <Paragraph style={{ marginBottom: 0, color: '#5c4a1f', lineHeight: 1.6 }}>
            "Operating system" is the boldest bet — it holds only if every capability makes the others smarter. Proof must
            be real customer breadth, not a demo. No MQ yet; that absence is the opening, not a weakness. I validate every
            claim through product before it ships — analysts catch the gap before buyers do.
          </Paragraph>
        </Panel>
      </Section>

      <Section id="ar90" kicker="First 90 days" title="How I'd stand up analyst relations">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Deliverable title="Map analysts, brief Shanler first" tag="Days 1–30" body="Confirm the map (Gartner primary; Forrester, Cambashi, ARC secondary); plant the language with the analyst who owns the shelf." />
            <Deliverable title="Open a paid inquiry" tag="Days 30–60" body='Stress the "AI-native OS" line; feed the gaps back to you and the roadmap.' />
            <Deliverable title="Arm references, watch inquiry volume" tag="Days 60–90" body="Equip customers to brief analysts in our terms; track inquiry volume as the leading indicator." />
          </div>
        </Panel>
      </Section>

      <Questions
        name="Oakley"
        items={[
          "Where does the 'AI-native OS, not a tool' claim feel most true — and where is it still aspirational?",
          "What's the hardest thing for the market to understand about what Ask Albert does?",
          'How do you want PMM to feed market signal back into your roadmap?',
        ]}
      />
    </div>
  );
}

/**
 * Product Meeting view — built for Oakley Reid (AI/ML PM).
 * Market awareness, testing the category message, and analyst strategy.
 */

import { Typography, Row, Col, Steps } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Deliverable, Questions, Tagline, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const TEST_METHODS = [
  {
    method: 'Wynter message testing',
    use: 'Put the "intelligence problem, not search problem" line in front of the actual ICP (R&D leaders) and measure clarity, relevance, and differentiation before it ships in a keynote.',
  },
  {
    method: 'Gong voice-of-customer',
    use: 'Mine sales and onboarding calls for the language customers already use for the problem. The category claim has to be built from their words, not ours.',
  },
  {
    method: 'Analyst inquiries',
    use: 'A paid, bidirectional seat where the analyst pressure-tests the positioning and tells us what end-user clients are actually asking about. If the line survives Shanler, it survives a CTO.',
  },
  {
    method: 'End-user inquiry volume',
    use: 'The real scoreboard: buyers calling Gartner asking "who connects all our R&D data with AI" in our words is worth more than ten vendor briefings.',
  },
];

export function ProductView() {
  const showAnalyst = useFeatureFlag('showAnalystStrategy');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Oakley Reid · AI/ML Product"
        jtbd="You can't pay an analyst to invent a category."
        hook="My value here is translation, not domain mastery — and I'll own that as a strength. I make the product's hard-won technical truth legible to buyers, and I bring market signal back into your roadmap. Analysts and the category move on three signals: end-user demand in your language, data, and peer validation. The PMM job is to manufacture those signals — and to keep the category claim honest enough to survive contact with the person who builds the thing."
        metrics={[
          { value: '3 signals', label: 'end-user demand, data, peer validation — what actually moves analysts' },
          { value: 'No MQ yet', label: 'Materials Informatics has a Market Guide but no Magic Quadrant — the opening' },
          { value: '1 analyst', label: 'Michael Shanler (Gartner) owns the shelf — the primary target' },
        ]}
      />

      <SpeakerTrack>
        Lead with translation as a strength, not an apology — "I've done this before; DevSecOps and zero-trust were foreign
        before CloudBees and IBM." Land: there's no Magic Quadrant yet, and that absence is the opening. Then be the first
        to name the weakness (the "operating system" compounding bet) — before he does.
      </SpeakerTrack>

      <Section id="market" kicker="Market awareness" title="Where Albert sits today — and the shelf to refuse">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#ffccc7', background: '#fff1f0', height: '100%' }}>
              <Text strong style={{ color: '#a8071a', fontSize: 15 }}>The wrong frame (the market's reflex)</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#5c2b28', lineHeight: 1.6 }}>
                The reflex is to shelve Albert in <Text strong>lab/R&D informatics</Text> — the LIMS + ELN + scientific
                data management cluster. That's the frame the case study refuses: naming those tools as competitors
                concedes the wrong category. "Not a search problem, an intelligence problem."
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel accent style={{ height: '100%' }}>
              <Text strong style={{ color: BRAND.violetDark, fontSize: 15 }}>The real opening</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#3a3450', lineHeight: 1.6 }}>
                Gartner already has an emerging <Text strong>"Materials Informatics Solutions" Market Guide</Text> and a
                Peer Insights market — but no Magic Quadrant yet and no settled definition. We don't invent a shelf from
                nothing; we shape the definition of one that's forming. Covering analyst:{' '}
                <Text strong>Michael Shanler, Distinguished VP Analyst</Text> (Gartner Life Science CIO team; authored the
                2025 LIMS and ELN Market Guides).
              </Paragraph>
              <div style={{ marginTop: 10 }}>
                <Tagline kind="verified">covering analyst confirmed Jun 2026</Tagline>
              </div>
            </Panel>
          </Col>
        </Row>
      </Section>

      <Section id="test" kicker="Ways to test the message" title="Don't ship the category claim on instinct — test it">
        <Row gutter={[16, 16]}>
          {TEST_METHODS.map(m => (
            <Col xs={24} md={12} key={m.method}>
              <Panel style={{ height: '100%' }}>
                <Pill color={BRAND.violet}>{m.method}</Pill>
                <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
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
                <Text strong style={{ color: BRAND.ink }}>Briefing</Text>{' '}
                <Pill>you teach the analyst</Pill>
                <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                  Vendor-initiated, free, ~30 min, one-directional. Purpose: plant and reinforce the category language, get
                  on the radar, influence how they write. Run on cadence and around launches.
                </Paragraph>
              </Panel>
            </Col>
            <Col xs={24} md={12}>
              <Panel style={{ height: '100%' }}>
                <Text strong style={{ color: BRAND.ink }}>Inquiry</Text>{' '}
                <Pill>the analyst teaches you</Pill>
                <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#56506b', lineHeight: 1.6, fontSize: 14 }}>
                  Client-initiated, paid seat, bidirectional. Purpose: test the positioning, hear what end-user clients are
                  actually asking, get coached on MQ / Market Guide criteria. The gaps it surfaces are gold for PMM <em>and</em> product.
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
                { title: 'Seed the language', description: 'Brief analysts on the category thesis on a regular cadence.' },
                { title: 'Pressure-test & refine', description: 'Use paid inquiries to stress the claim and learn the real buyer questions.' },
                { title: 'Arm customers & champions', description: 'Equip references to describe Albert to analysts in our terms.' },
                { title: 'End-user inquiry volume rises', description: 'Buyers start calling Gartner about the problem in our words.' },
                { title: 'The analyst writes it down', description: 'The framing lands in a note, Hype Cycle, or the Materials Informatics Market Guide.' },
              ]}
            />
            <Paragraph style={{ marginTop: 12, marginBottom: 0, color: '#6b6480', fontSize: 13, fontStyle: 'italic' }}>
              Division of labor: the AR agency owns the motion (mapping, scheduling, prep, tracking). I own the narrative
              and strategy — and I'm in the briefings personally, because the category claim only survives if the person
              who built it defends it.
            </Paragraph>
          </Panel>
        </Section>
      )}

      <Section id="weakest" kicker="Staying honest in the room" title="Where the category claim is weakest">
        <Panel style={{ borderColor: '#ffe58f', background: '#fffbe6' }}>
          <div style={{ marginBottom: 10 }}>
            <Tagline kind="hypothesis" />
          </div>
          <Paragraph style={{ marginBottom: 0, color: '#5c4a1f', lineHeight: 1.65 }}>
            The boldest bet — and the easiest to challenge — is "operating system." It holds only if{' '}
            <Text strong>every new capability makes every other capability smarter</Text> (the compounding / network-effect
            argument). The narrative leans on that, and the proof has to be real customer data breadth, not a demo. I won't
            claim Albert is already "in" a category — there's no Materials Informatics MQ yet. That absence is the
            opportunity, not a weakness, and I'd say exactly that to an analyst.
          </Paragraph>
        </Panel>
        <div style={{ marginTop: 16 }}>
          <Panel>
            <Deliverable
              title="How I'd partner with you, not market over you"
              body="Validate every external claim through product before it ships. Treat analyst inquiries as a forcing function — they catch the gap before buyers do. Bring the market's pull; you own the build; the customer is the tiebreaker. The questions I'd ask your Forward Deployed Science team in week one are the same ones I asked IBM's engineers in 2018."
            />
          </Panel>
        </div>
      </Section>

      <Section id="ar90" kicker="First 90 days" title="How I'd stand up analyst relations">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Deliverable
              title="Map the analysts, brief Shanler first"
              tag="Days 1–30"
              body="Confirm the analyst map (Gartner primary; Forrester, Cambashi, ARC secondary) and run the first briefing to plant the category language with the person who owns the shelf."
            />
            <Deliverable
              title="Open a paid inquiry to pressure-test"
              tag="Days 30–60"
              body="Use an inquiry to stress the 'AI-native OS' line and learn the real end-user questions — then feed those gaps straight back to you and the roadmap."
            />
            <Deliverable
              title="Arm references, watch inquiry volume"
              tag="Days 60–90"
              body="Equip customers to describe Albert to analysts in our terms, and track end-user inquiry volume as the leading indicator the category is forming."
            />
          </div>
        </Panel>
      </Section>

      <Questions
        name="Oakley"
        items={[
          "Where does the 'AI-native OS, not a tool' claim feel most true on the product side — and where is it still aspirational?",
          'What\'s the hardest thing for the market to understand about what Ask Albert actually does?',
          'How do you want PMM to feed market signal back into your roadmap?',
        ]}
      />
    </div>
  );
}

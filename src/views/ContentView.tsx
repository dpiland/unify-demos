/**
 * Content Marketing view — built for Brooke Kuei.
 * Customer journey + content audit + the gaps a first PMM closes.
 */

import { useState } from 'react';
import { Typography, Row, Col, Collapse, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { HookBanner, SpeakerTrack, Section, Panel, Pill, Deliverable, Stat, Questions, BRAND } from '../components/ui';

const { Text, Paragraph } = Typography;

const ROI_URL = 'https://albert-roi-spark.lovable.app';
const ROI_PREVIEW =
  'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/088b6710-cb29-4d21-8139-cb70f714db45/id-preview-ecc4147c--49914c73-9a7a-4775-9b62-ccb48d65f9b0.lovable.app-1782220887556.png';

const JOURNEY = [
  {
    stage: 'Awareness',
    frame: 'Problem-frame',
    economic: 'Category POV / manifesto, CEO keynote cascaded into modules, exec bylines ("why AI pilots fail"), analyst-seeded content.',
    champion: 'Short video, educational webinars, "is my lab day actually broken?" content.',
    weight: 'Top-heavy — this is where the category is won',
  },
  {
    stage: 'Consideration',
    frame: 'Solution-fit',
    economic: 'Platform pages, "not another ELN/LIMS" framing, ROI / business-case templates.',
    champion: 'Explainer + demo video, industry use-cases (coatings, adhesives, battery, personal care).',
    weight: 'Translate the category into a buyable solution',
  },
  {
    stage: 'Decision',
    frame: 'Proof',
    economic: 'Case studies with hard numbers, security + data-isolation one-pagers, pilot/POV frameworks.',
    champion: 'Reference videos/quotes, technical deep-dives.',
    weight: 'Albert is strong here today',
  },
  {
    stage: 'Adoption',
    frame: 'Make it stick',
    economic: 'Change-management playbooks, executive adoption dashboards.',
    champion: 'Enablement + training, champion enablement kits.',
    weight: 'The differentiator — barely productized today',
  },
  {
    stage: 'Expansion',
    frame: 'Advocacy',
    economic: 'Expansion playbooks, ROI realized stories.',
    champion: 'User community, reference program.',
    weight: 'Turn adopters into the next proof points',
  },
];

export function ContentView() {
  const showRoi = useFeatureFlag('showRoiLeaveBehind');
  const [showCalc, setShowCalc] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Brooke Kuei · Content Marketing"
        jtbd="PMM owns the argument. Content owns the reach."
        hook="My job is to hand you a point of view so strong that a quarter of content writes itself — and the discipline to retire what no longer fits. You're not downstream of PMM; you're in the room when the category story gets built, because you'll find where it breaks when it has to scale to fifty pieces."
        metrics={[
          { value: '5', label: 'journey stages mapped for both the buyer and the bench chemist' },
          { value: '2', label: 'live assets that argue against the new category — retire before we write new' },
          { value: '1', label: 'messaging + naming source of truth so you never guess which term is current' },
        ]}
      />

      <SpeakerTrack>
        Open with the line — "PMM owns the argument, content owns the reach." Land the number: two live assets that argue
        against the new category. Transition: "so before we write anything new, you and I decide what to retire." Keep it
        peer-to-peer, never a critique of her library.
      </SpeakerTrack>

      <Section
        id="journey"
        kicker="Where I'd start"
        title="The customer journey — and why Albert's is non-standard"
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} md={12}>
            <Panel accent>
              <Pill color={BRAND.violet}>Non-standard #1</Pill>
              <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>
                <Text strong style={{ color: BRAND.ink }}>It's a dual-audience journey at every stage.</Text> The economic
                buyer (VP R&D / CTO / CIO) is buying transformation, ROI, and risk. The day-to-day champion (the bench
                chemist) is asking "does this make my lab day better?" — and that's where adoption actually lives.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel accent>
              <Pill color={BRAND.violet}>Non-standard #2</Pill>
              <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>
                <Text strong style={{ color: BRAND.ink }}>It's a category-creation journey, so the front is top-heavy.</Text>{' '}
                The buyer doesn't yet know the problem is "an intelligence problem, not a search problem." Content does the
                heavy lifting <em>before</em> sales can even engage.
              </Paragraph>
            </Panel>
          </Col>
        </Row>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {JOURNEY.map((s, i) => (
            <Panel key={s.stage} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div
                  style={{
                    width: 132,
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${BRAND.violet} 0%, ${BRAND.violetDark} 100%)`,
                    color: '#fff',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{`Stage ${i + 1}`}</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{s.stage}</div>
                  <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{s.frame}</div>
                </div>
                <div style={{ padding: '14px 18px', flex: 1 }}>
                  <Row gutter={[16, 8]}>
                    <Col xs={24} md={12}>
                      <Text style={{ fontSize: 11, fontWeight: 700, color: BRAND.violetDark, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Economic buyer
                      </Text>
                      <Paragraph style={{ marginBottom: 0, marginTop: 2, color: '#56506b', fontSize: 13.5, lineHeight: 1.5 }}>
                        {s.economic}
                      </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                      <Text style={{ fontSize: 11, fontWeight: 700, color: BRAND.violetDark, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Day-to-day champion
                      </Text>
                      <Paragraph style={{ marginBottom: 0, marginTop: 2, color: '#56506b', fontSize: 13.5, lineHeight: 1.5 }}>
                        {s.champion}
                      </Paragraph>
                    </Col>
                  </Row>
                  <div style={{ marginTop: 8 }}>
                    <Pill>{s.weight}</Pill>
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </Section>

      <Section id="audit" kicker="What I see today" title="Content audit: strong from the middle down, thin at the top">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#b7eb8f', background: '#f6ffed' }}>
              <Text strong style={{ color: '#237804', fontSize: 15 }}>What's working</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#3f5436', lineHeight: 1.6 }}>
                Strong bottom and middle of funnel: case studies (Henkel 2,800 scientists / weeks-to-hours, Applied
                Molecules months-to-days, Nouryon/BeautyCreations, Chemours, Solenis, Kenvue), a thought-leadership blog,
                webinars, and heavy press ($22.5M raise, Breakthrough launch, J.P. Morgan growth investment). The proof
                exists and it's good.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#ffd591', background: '#fff7e6' }}>
              <Text strong style={{ color: '#ad6800', fontSize: 15 }}>The gap (and the job)</Text>
              <Paragraph style={{ marginTop: 8, marginBottom: 0, color: '#5c4a1f', lineHeight: 1.6 }}>
                Thin at the top: no crisp, repeated category thesis cascading across everything. There's proof the product
                works, but no single argument for <em>why this is a new category</em>. That top-of-funnel thesis is the
                first-PMM job — and it's the spine I hand you to build on.
              </Paragraph>
            </Panel>
          </Col>
        </Row>
      </Section>

      <Section id="findings" kicker="Two findings to raise with you" title="Where I'd add value in week one">
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition="end"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <Text strong style={{ color: BRAND.ink }}>1. Existing content contradicts the new category</Text>
                </span>
              ),
              children: (
                <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>
                  Albert's own resource "Why a Unified ELN and LIMS is Essential for Modern Chemical R&D" leans <em>into</em>{' '}
                  the exact frame the new positioning rejects. This is a narrative-migration problem, not a criticism:
                  before we produce new pieces, you and I decide what we retire or re-frame — because some of the current
                  library argues against where we're taking the category. Peer decision, made together.
                </Paragraph>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <Text strong style={{ color: BRAND.ink }}>2. The naming isn't settled</Text>
                </span>
              ),
              children: (
                <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.6 }}>
                  Press says "Albert Breakthrough"; the deck says "Ask Albert." A first-PMM deliverable is a messaging +
                  naming source of truth (Notion/Confluence, plus a trained GPT) so you — and demand gen, and the field —
                  get a reliable answer on which term is current in 30 seconds, and never have to guess.
                </Paragraph>
              ),
            },
          ]}
        />
      </Section>

      <Section id="ship" kicker="First 90 days" title="What I'd ship for you">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Deliverable
              title="Messaging & naming source of truth"
              tag="Days 1–30"
              body="One living doc + a trained custom GPT on messaging and competitive. Anyone — content, demand gen, the field — gets a consistent, on-narrative answer in seconds. Kills the 'which term do we use?' tax."
            />
            <Deliverable
              title="Category thesis cascaded into content modules"
              tag="Days 30–60"
              body="The 8-title keynote argument (see Dana's view) broken into reusable modules: each slide title becomes a content pillar you can spin into bylines, social, webinar abstracts, and sales one-pagers."
            />
            <Deliverable
              title="Content migration plan"
              tag="Days 30–60"
              body="A short retire / re-frame / keep list for the existing library, so new content doesn't have to fight old content for the category line."
            />
            <Deliverable
              title="Champion enablement kit"
              tag="Days 60–90"
              body="The adoption-stage asset almost no one in the category produces — arming the bench chemist to sell the tool internally. This is where your reach and my narrative compound."
            />
          </div>
        </Panel>
      </Section>

      {showRoi && (
        <Section id="roi" kicker="Leave-behind · live prototype" title="The ROI calculator — built, not just described">
          <Panel accent>
            <Paragraph style={{ color: '#56506b', lineHeight: 1.6, marginBottom: 16 }}>
              The decision-stage "CFO-ready business case" asset — already a working first pass. Every default is labeled{' '}
              <Pill>Albert-published</Pill> <Pill>market estimate</Pill> or <Pill>illustrative</Pill>, so the champion can
              replace placeholders with their own numbers live. That source discipline is the point: it demonstrates PMM
              craft without asserting a stat that can't survive a CTO.
            </Paragraph>
            <Row gutter={[24, 12]} style={{ marginBottom: 20 }}>
              <Col xs={12} md={6}><Stat value="≈ $400K/yr" label="modeled return on the illustrative defaults" /></Col>
              <Col xs={12} md={6}><Stat value="$2M/yr" label="cost of standing still, before any uplift" /></Col>
              <Col xs={12} md={6}><Stat value="3 mo → 2 days" label="Albert-published proof point in the model" /></Col>
              <Col xs={12} md={6}><Stat value="100%" label="of inputs source-tagged for credibility" /></Col>
            </Row>

            {!showCalc ? (
              <div
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #e6ddf7',
                  cursor: 'pointer',
                }}
                onClick={() => setShowCalc(true)}
              >
                <img
                  src={ROI_PREVIEW}
                  alt="Albert R&D Operating System ROI Calculator preview"
                  style={{ width: '100%', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(26,10,56,0) 35%, rgba(26,10,56,0.82) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 10,
                    padding: 24,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={e => {
                      e.stopPropagation();
                      setShowCalc(true);
                    }}
                    style={{ fontWeight: 600 }}
                  >
                    Launch the ROI calculator
                  </Button>
                  <a
                    href={ROI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ color: '#e4ccfe', fontSize: 13 }}
                  >
                    or open in a new tab <ExportOutlined />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: '#6b6480', fontSize: 12 }}>
                    Live · albert-roi-spark.lovable.app
                  </Text>
                  <span style={{ display: 'flex', gap: 14 }}>
                    <a href={ROI_URL} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.violet, fontSize: 13 }}>
                      Open in new tab <ExportOutlined />
                    </a>
                    <a
                      onClick={() => setShowCalc(false)}
                      style={{ color: '#8c8c8c', fontSize: 13, cursor: 'pointer' }}
                    >
                      Collapse
                    </a>
                  </span>
                </div>
                <iframe
                  title="Albert ROI Calculator"
                  src={ROI_URL}
                  style={{
                    width: '100%',
                    height: 760,
                    border: '1px solid #e6ddf7',
                    borderRadius: 12,
                    background: '#fff',
                  }}
                />
                <Text style={{ color: '#9a8bc4', fontSize: 12, display: 'block', marginTop: 8 }}>
                  Doesn't load inline? Some hosts block embedding — use "Open in new tab" above.
                </Text>
              </div>
            )}
          </Panel>
        </Section>
      )}

      <Questions
        name="Brooke"
        items={[
          'What does the content engine look like today — and where do you feel the narrative is missing or contested?',
          'When PMM and content disagree on a story, how do you like to resolve it?',
          'What would make me a great partner to you in the first 90 days?',
        ]}
      />
    </div>
  );
}

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
  { stage: 'Awareness', frame: 'Problem-frame', economic: 'Category POV, CEO keynote, exec bylines, analyst-seeded content.', champion: 'Short video, webinars, "is my lab day broken?" content.', weight: 'Top-heavy — the category is won here' },
  { stage: 'Consideration', frame: 'Solution-fit', economic: '"Not another ELN/LIMS" platform pages, ROI templates.', champion: 'Explainer + demo video, industry use-cases.', weight: 'Category → buyable solution' },
  { stage: 'Decision', frame: 'Proof', economic: 'Case studies w/ numbers, security one-pagers, POV frameworks.', champion: 'Reference videos, technical deep-dives.', weight: 'Albert is strong here' },
  { stage: 'Adoption', frame: 'Make it stick', economic: 'Change-mgmt playbooks, adoption dashboards.', champion: 'Training, champion enablement kits.', weight: 'The differentiator — barely built today' },
  { stage: 'Expansion', frame: 'Advocacy', economic: 'Expansion playbooks, ROI-realized stories.', champion: 'User community, reference program.', weight: 'Adopters → next proof points' },
];

export function ContentView() {
  const showRoi = useFeatureFlag('showRoiLeaveBehind');
  const [showCalc, setShowCalc] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <HookBanner
        eyebrow="For Brooke Kuei · Content Marketing"
        jtbd="PMM owns the argument. Content owns the reach."
        hook="Hand you a POV so strong a quarter of content writes itself — plus the discipline to retire what no longer fits."
        metrics={[
          { value: '5', label: 'stages, mapped for buyer + champion' },
          { value: '2', label: 'assets to retire first' },
          { value: '1', label: 'messaging + naming SSOT' },
        ]}
      />

      <SpeakerTrack>
        Open: "PMM owns the argument, content owns the reach." You're not downstream of PMM — you're in the room when the
        story gets built, because you'll find where it breaks at fifty pieces. Land the number: two live assets contradict
        the new category. Transition: "before we write anything new, you and I decide what to retire." Peer, not critique.
      </SpeakerTrack>

      <Section id="journey" kicker="Where I'd start" title="The journey — and why Albert's is non-standard">
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} md={12}>
            <Panel accent>
              <Pill color={BRAND.violet}>Dual-audience, every stage</Pill>
              <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.55, fontSize: 14 }}>
                Economic buyer (VP R&D / CTO / CIO) buys transformation + ROI. Champion (bench chemist) buys a better lab
                day — where adoption lives.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel accent>
              <Pill color={BRAND.violet}>Category-creation, so top-heavy</Pill>
              <Paragraph style={{ marginTop: 10, marginBottom: 0, color: '#56506b', lineHeight: 1.55, fontSize: 14 }}>
                The buyer doesn't yet know it's an intelligence problem, not a search problem. Content carries it before
                sales can engage.
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
                        Buyer
                      </Text>
                      <Paragraph style={{ marginBottom: 0, marginTop: 2, color: '#56506b', fontSize: 13, lineHeight: 1.45 }}>
                        {s.economic}
                      </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                      <Text style={{ fontSize: 11, fontWeight: 700, color: BRAND.violetDark, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Champion
                      </Text>
                      <Paragraph style={{ marginBottom: 0, marginTop: 2, color: '#56506b', fontSize: 13, lineHeight: 1.45 }}>
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

      <Section id="audit" kicker="What I see today" title="Strong from the middle down, thin at the top">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#b7eb8f', background: '#f6ffed' }}>
              <Text strong style={{ color: '#237804', fontSize: 15 }}>What's working</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#3f5436', lineHeight: 1.55 }}>
                Strong mid/bottom funnel — case studies (Henkel, Nouryon, Chemours, Solenis, Kenvue), blog, webinars,
                heavy press. The proof is good.
              </Paragraph>
            </Panel>
          </Col>
          <Col xs={24} md={12}>
            <Panel style={{ borderColor: '#ffd591', background: '#fff7e6' }}>
              <Text strong style={{ color: '#ad6800', fontSize: 15 }}>The gap (= the job)</Text>
              <Paragraph style={{ marginTop: 6, marginBottom: 0, color: '#5c4a1f', lineHeight: 1.55 }}>
                No repeated category thesis at the top. That spine is the first-PMM job — and what I hand you.
              </Paragraph>
            </Panel>
          </Col>
        </Row>
      </Section>

      <Section id="findings" kicker="Two findings" title="Where I'd add value in week one">
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition="end"
          items={[
            {
              key: '1',
              label: <Text strong style={{ color: BRAND.ink }}>1. Existing content contradicts the new category</Text>,
              children: (
                <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.55 }}>
                  Albert's "Unified ELN + LIMS" resource argues for the frame the new positioning rejects. Before new
                  content, we decide what to retire or re-frame — together.
                </Paragraph>
              ),
            },
            {
              key: '2',
              label: <Text strong style={{ color: BRAND.ink }}>2. The naming isn't settled</Text>,
              children: (
                <Paragraph style={{ marginBottom: 0, color: '#56506b', lineHeight: 1.55 }}>
                  "Albert Breakthrough" (press) vs "Ask Albert" (deck). A messaging + naming SSOT (+ trained GPT) so no one
                  guesses which term is current.
                </Paragraph>
              ),
            },
          ]}
        />
      </Section>

      <Section id="ship" kicker="First 90 days" title="What I'd ship for you">
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Deliverable title="Messaging & naming SSOT" tag="Days 1–30" body="One doc + a trained GPT. On-narrative answers in seconds; kills the 'which term?' tax." />
            <Deliverable title="Category thesis → content modules" tag="Days 30–60" body="Each of the 8 keynote titles becomes a content pillar: bylines, social, webinars, one-pagers." />
            <Deliverable title="Content migration plan" tag="Days 30–60" body="A retire / re-frame / keep list so new content doesn't fight old content." />
            <Deliverable title="Champion enablement kit" tag="Days 60–90" body="The adoption asset few produce — arm the bench chemist to sell internally." />
          </div>
        </Panel>
      </Section>

      {showRoi && (
        <Section id="roi" kicker="Leave-behind · live prototype" title="The ROI calculator — built, not just described">
          <Panel accent>
            <Paragraph style={{ color: '#56506b', lineHeight: 1.55, marginBottom: 16 }}>
              The decision-stage CFO business case — a working first pass. Inputs tagged <Pill>Albert-published</Pill>{' '}
              <Pill>market estimate</Pill> <Pill>illustrative</Pill>, so the champion swaps in their own numbers live.
            </Paragraph>
            <Row gutter={[24, 12]} style={{ marginBottom: 20 }}>
              <Col xs={12} md={6}><Stat value="≈ $400K/yr" label="modeled annual return" /></Col>
              <Col xs={12} md={6}><Stat value="$2M/yr" label="cost of standing still" /></Col>
              <Col xs={12} md={6}><Stat value="3 mo → 2 days" label="Albert-published proof" /></Col>
              <Col xs={12} md={6}><Stat value="100%" label="inputs source-tagged" /></Col>
            </Row>

            {!showCalc ? (
              <div
                style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #e6ddf7', cursor: 'pointer' }}
                onClick={() => setShowCalc(true)}
              >
                <img src={ROI_PREVIEW} alt="Albert ROI Calculator preview" style={{ width: '100%', display: 'block' }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(26,10,56,0) 35%, rgba(26,10,56,0.82) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 10,
                    padding: 24,
                  }}
                >
                  <Button type="primary" size="large" onClick={e => { e.stopPropagation(); setShowCalc(true); }} style={{ fontWeight: 600 }}>
                    Launch the ROI calculator
                  </Button>
                  <a href={ROI_URL} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: '#e4ccfe', fontSize: 13 }}>
                    or open in a new tab <ExportOutlined />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: '#6b6480', fontSize: 12 }}>Live · albert-roi-spark.lovable.app</Text>
                  <span style={{ display: 'flex', gap: 14 }}>
                    <a href={ROI_URL} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.violet, fontSize: 13 }}>
                      Open in new tab <ExportOutlined />
                    </a>
                    <a onClick={() => setShowCalc(false)} style={{ color: '#8c8c8c', fontSize: 13, cursor: 'pointer' }}>Collapse</a>
                  </span>
                </div>
                <iframe
                  title="Albert ROI Calculator"
                  src={ROI_URL}
                  style={{ width: '100%', height: 760, border: '1px solid #e6ddf7', borderRadius: 12, background: '#fff' }}
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
          'What does the content engine look like today — and where is the narrative missing or contested?',
          'How are you approaching AEO and SEO — getting Albert cited in AI answer engines, not just ranked in search, as buyers shift where they research?',
          'When PMM and content disagree on a story, how do you like to resolve it?',
          'What would make me a great partner to you in the first 90 days?',
        ]}
      />
    </div>
  );
}

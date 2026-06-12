/**
 * Novus Demo - "The Pre-Ship UX Gap"
 *
 * Demonstrates the problem Pendo Novus solves using a live CloudBees FM flag.
 * Feature flags tell you WHEN to release. Novus tells you WHETHER the UX is safe.
 *
 * Variant A (novusDemoVariant = false): working 3-step onboarding
 * Variant B (novusDemoVariant = true):  broken flow, dead-end CTA at step 2
 *
 * Built by Drew Piland with CloudBees FM + Claude Code.
 */

import { useState, useCallback, useEffect } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Space,
  Steps,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import {
  BranchesOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { theme as antdTheme } from 'antd';

const { Title, Paragraph, Text } = Typography;

// ── Analytics ──────────────────────────────────────────────────────────────

interface AnalyticsEvent {
  event: string;
  step?: number;
  label?: string;
  variant: string;
  ts: string;
}

function track(
  event: string,
  props: Omit<AnalyticsEvent, 'event' | 'ts'>,
  push: (e: AnalyticsEvent) => void
) {
  const entry: AnalyticsEvent = { event, ts: new Date().toLocaleTimeString(), ...props };
  console.log('[analytics]', entry);
  push(entry);
}

// ── Working Flow (Variant A) ────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    label: 'Connect your repo',
    detail: 'Authorize GitHub and select the repo you want to instrument.',
    cta: 'Connect GitHub',
  },
  {
    id: 2,
    label: 'Instrument your flows',
    detail: 'Novus scans your codebase and maps existing user flows automatically.',
    cta: 'Run instrumentation',
  },
  {
    id: 3,
    label: 'See your first insight',
    detail: 'Your first PR review is ready. Novus flagged a potential drop-off in the checkout flow.',
    cta: 'View insight',
  },
];

function WorkingFlow({
  onComplete,
  onEvent,
}: {
  onComplete: () => void;
  onEvent: (e: AnalyticsEvent) => void;
}) {
  const [current, setCurrent] = useState(0);

  function advance() {
    const step = STEPS[current];
    track('cta_clicked', { step: step.id, label: step.cta, variant: 'control' }, onEvent);

    if (current < STEPS.length - 1) {
      track('step_completed', { step: step.id, variant: 'control' }, onEvent);
      setCurrent(c => c + 1);
    } else {
      track('flow_completed', { variant: 'control' }, onEvent);
      onComplete();
    }
  }

  const step = STEPS[current];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Steps
        current={current}
        items={STEPS.map(s => ({ title: s.label }))}
        size="small"
      />
      <Card size="small">
        <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>
          Step {step.id} of {STEPS.length}
        </Text>
        <Title level={4} style={{ margin: '8px 0' }}>{step.label}</Title>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>{step.detail}</Paragraph>
        <Button type="primary" onClick={advance} icon={<RightOutlined />} iconPosition="end">
          {step.cta}
        </Button>
      </Card>
      <Tag color="success" icon={<CheckCircleOutlined />}>
        Variant A (control): all steps working correctly
      </Tag>
    </Space>
  );
}

// ── Broken Flow (Variant B) ─────────────────────────────────────────────────

function BrokenFlow({ onEvent }: { onEvent: (e: AnalyticsEvent) => void }) {
  const [step, setStep] = useState(0);
  const [deadEnd, setDeadEnd] = useState(false);
  const { token } = antdTheme.useToken();

  function advanceStep1() {
    track('cta_clicked', { step: 1, label: 'Connect GitHub', variant: 'treatment' }, onEvent);
    track('step_completed', { step: 1, variant: 'treatment' }, onEvent);
    setStep(1);
  }

  function triggerDeadEnd() {
    track('cta_clicked', { step: 2, label: 'Run instrumentation', variant: 'treatment' }, onEvent);
    // UX regression: event fires but redirect is missing. No step_completed. User stuck.
    track('flow_abandoned', { step: 2, variant: 'treatment' }, onEvent);
    setDeadEnd(true);
  }

  if (deadEnd) {
    return (
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Steps
          current={1}
          status="error"
          items={STEPS.map(s => ({ title: s.label }))}
          size="small"
        />
        <Card
          size="small"
          style={{ borderColor: token.colorError, background: token.colorErrorBg }}
        >
          <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>
            Step 2 of 3
          </Text>
          <Title level={4} style={{ margin: '8px 0', color: token.colorError }}>
            Instrument your flows
          </Title>
          <Paragraph style={{ color: token.colorError }}>Running instrumentation...</Paragraph>
          <Space style={{ marginBottom: 12 }}>
            <LoadingOutlined style={{ color: token.colorError }} />
            <Text style={{ color: token.colorError, fontSize: 13 }}>
              This has been spinning for 47 seconds. Nothing is happening.
            </Text>
          </Space>
          <Alert
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            message="Dead-end CTA"
            description="The button fired. The event tracked. But the redirect to step 3 is missing from this build. There is no back button. The user is stuck."
            style={{ marginBottom: 12 }}
          />
          <code
            style={{
              display: 'block',
              background: token.colorErrorBg,
              border: `1px solid ${token.colorErrorBorder}`,
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: 12,
              color: token.colorError,
              fontFamily: 'monospace',
            }}
          >
            analytics: flow_abandoned &nbsp;|&nbsp; step: 2 &nbsp;|&nbsp; reason: dead_end_cta
          </code>
        </Card>
        <Tag color="error" icon={<CloseCircleOutlined />}>
          Variant B (treatment): UX regression at step 2. This is what Novus catches at PR review time.
        </Tag>
      </Space>
    );
  }

  if (step === 0) {
    return (
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Steps
          current={0}
          items={STEPS.map(s => ({ title: s.label }))}
          size="small"
        />
        <Card size="small">
          <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>Step 1 of 3</Text>
          <Title level={4} style={{ margin: '8px 0' }}>Connect your repo</Title>
          <Paragraph type="secondary" style={{ marginBottom: 16 }}>
            Authorize GitHub and select the repo you want to instrument.
          </Paragraph>
          <Button type="primary" onClick={advanceStep1} icon={<RightOutlined />} iconPosition="end">
            Connect GitHub
          </Button>
        </Card>
        <Tag color="warning">Variant B (treatment): step 1 looks identical to control</Tag>
      </Space>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Steps
        current={1}
        items={STEPS.map(s => ({ title: s.label }))}
        size="small"
      />
      <Card size="small">
        <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>Step 2 of 3</Text>
        <Title level={4} style={{ margin: '8px 0' }}>Instrument your flows</Title>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Novus scans your codebase and maps existing user flows automatically.
        </Paragraph>
        <Button type="primary" onClick={triggerDeadEnd} icon={<RightOutlined />} iconPosition="end">
          Run instrumentation
        </Button>
      </Card>
      <Tag color="warning">Variant B (treatment): this CTA is about to hit a dead end</Tag>
    </Space>
  );
}

// ── Event Feed ──────────────────────────────────────────────────────────────

function EventFeed({ events }: { events: AnalyticsEvent[] }) {
  if (events.length === 0) {
    return (
      <Card size="small" title="Behavioral event stream">
        <Text type="secondary" style={{ fontSize: 12, fontStyle: 'italic' }}>
          No events yet. Interact with the flow.
        </Text>
      </Card>
    );
  }

  return (
    <Card size="small" title="Behavioral event stream">
      <Timeline
        style={{ marginTop: 8 }}
        items={events.map(e => ({
          dot:
            e.event === 'flow_abandoned' ? (
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            ) : e.event === 'flow_completed' ? (
              <CheckCircleFilled style={{ color: '#52c41a' }} />
            ) : undefined,
          color:
            e.event === 'flow_abandoned'
              ? 'red'
              : e.event === 'flow_completed'
              ? 'green'
              : 'blue',
          children: (
            <Space size={4} wrap>
              <Text style={{ fontSize: 11, fontFamily: 'monospace', color: '#999' }}>{e.ts}</Text>
              <Text
                strong
                style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  color:
                    e.event === 'flow_abandoned'
                      ? '#ff4d4f'
                      : e.event === 'flow_completed'
                      ? '#52c41a'
                      : '#1677ff',
                }}
              >
                {e.event}
              </Text>
              {e.step && (
                <Text style={{ fontSize: 11, color: '#999' }}>step {e.step}</Text>
              )}
            </Space>
          ),
        }))}
      />
    </Card>
  );
}

// ── Novus Callout ───────────────────────────────────────────────────────────

function NovusCallout({ isTreatment }: { isTreatment: boolean }) {
  return (
    <Alert
      type={isTreatment ? 'info' : 'info'}
      showIcon
      icon={<BranchesOutlined />}
      message="Where Novus fits"
      description={
        isTreatment ? (
          <Text style={{ fontSize: 13 }}>
            The <code>flow_abandoned</code> event fires after a real user hits the dead end.
            Novus would have flagged this at PR review time, before the flag was ever toggled,
            using behavioral pattern data from similar flows.
          </Text>
        ) : (
          <Text style={{ fontSize: 13 }}>
            Toggle to Variant B to see the regression. Novus evaluates the PR that introduced
            Variant B before any flag rollout begins, using behavioral data to predict: "this
            path resembles a pattern with a 40% drop-off rate."
          </Text>
        )
      }
    />
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────

export function NovusDemo() {
  const isTreatmentFromFlag = useFeatureFlag('novusDemoVariant');
  const [localOverride, setLocalOverride] = useState<boolean | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [completed, setCompleted] = useState(false);
  const [flowKey, setFlowKey] = useState(0);

  // Local override lets you toggle without touching the CloudBees dashboard (for interview demos)
  const isTreatment = localOverride !== null ? localOverride : isTreatmentFromFlag;

  const pushEvent = useCallback((e: AnalyticsEvent) => {
    setEvents(prev => [e, ...prev].slice(0, 12));
  }, []);

  useEffect(() => {
    track('demo_loaded', { variant: isTreatment ? 'treatment' : 'control' }, pushEvent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset(nextTreatment: boolean) {
    setCompleted(false);
    setFlowKey(k => k + 1);
    setEvents([]);
    track('demo_loaded', { variant: nextTreatment ? 'treatment' : 'control' }, pushEvent);
  }

  function handleToggle(checked: boolean) {
    setLocalOverride(checked);
    reset(checked);
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">

      {/* Header */}
      <Card>
        <Row align="middle" justify="space-between" gutter={[16, 8]}>
          <Col xs={24} md={16}>
            <Space align="center" size="small">
              <BranchesOutlined style={{ fontSize: 20, color: '#1677ff' }} />
              <Title level={4} style={{ margin: 0 }}>The Pre-Ship UX Gap</Title>
              <Badge
                count="Demo"
                style={{ backgroundColor: '#1677ff', fontSize: 10 }}
              />
            </Space>
            <Paragraph type="secondary" style={{ margin: '4px 0 0', fontSize: 13 }}>
              Built by Drew Piland with CloudBees FM + Claude Code
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Text type="secondary" style={{ fontSize: 13 }}>Active variant:</Text>
              <Tag
                color={isTreatment ? 'error' : 'success'}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handleToggle(!isTreatment)}
              >
                {isTreatment ? 'B: treatment (broken)' : 'A: control (working)'}
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>click to toggle</Text>
            </Space>
            {localOverride !== null && (
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Local override active.{' '}
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0, fontSize: 11 }}
                    onClick={() => { setLocalOverride(null); reset(isTreatmentFromFlag); }}
                  >
                    Reset to flag value
                  </Button>
                </Text>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      {/* Narrative */}
      <Alert
        type="info"
        showIcon={false}
        message={
          <Text strong style={{ fontSize: 15 }}>
            Feature flags tell you when to release. Not whether it is safe.
          </Text>
        }
        description={
          <Text style={{ fontSize: 13 }}>
            A product engineer ships this onboarding flow behind a flag. They control who sees it and when.
            But the flag has no opinion about what is inside the flow. That is the gap.{' '}
            {isTreatment
              ? 'You are now looking at Variant B. Click through the steps to see what the analytics dashboard would catch three days too late.'
              : 'You are looking at Variant A (control). Everything works. Toggle to Variant B to see the regression.'}
          </Text>
        }
      />

      {/* Main content: flow + sidebar */}
      <Row gutter={[24, 16]}>
        <Col xs={24} lg={15}>
          {completed ? (
            <Card>
              <Space direction="vertical" align="center" style={{ width: '100%', padding: '24px 0' }}>
                <CheckCircleFilled style={{ fontSize: 40, color: '#52c41a' }} />
                <Title level={4} style={{ margin: 0 }}>Flow complete</Title>
                <Paragraph type="secondary">
                  All behavioral events fired correctly. No regressions detected.
                </Paragraph>
                <Button onClick={() => { setCompleted(false); setFlowKey(k => k + 1); setEvents([]); }}>
                  Reset flow
                </Button>
              </Space>
            </Card>
          ) : (
            <div key={flowKey}>
              {isTreatment
                ? <BrokenFlow onEvent={pushEvent} />
                : <WorkingFlow onComplete={() => setCompleted(true)} onEvent={pushEvent} />}
            </div>
          )}
        </Col>

        <Col xs={24} lg={9}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <EventFeed events={events} />
            <NovusCallout isTreatment={isTreatment} />
          </Space>
        </Col>
      </Row>

      {/* Category framing footer */}
      <Card size="small" style={{ background: '#f0f5ff', borderColor: '#adc6ff' }}>
        <Row gutter={[16, 8]}>
          <Col xs={24} md={8}>
            <Text strong style={{ color: '#1d39c4', fontSize: 13 }}>The category claim</Text>
            <Paragraph style={{ fontSize: 12, marginTop: 4, marginBottom: 0, color: '#2f54eb' }}>
              Post-deploy analytics tells you what happened. Novus tells you what is going to happen,
              at the moment of build.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Text strong style={{ color: '#1d39c4', fontSize: 13 }}>The buyer</Text>
            <Paragraph style={{ fontSize: 12, marginTop: 4, marginBottom: 0, color: '#2f54eb' }}>
              Product engineers. Not product managers. The person who owns the PR, the flag rollout,
              and the incident at 2am.
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Text strong style={{ color: '#1d39c4', fontSize: 13 }}>PLG activation moment</Text>
            <Paragraph style={{ fontSize: 12, marginTop: 4, marginBottom: 0, color: '#2f54eb' }}>
              The first time a PR review surfaces a predicted UX regression before any user sees it.
              That is the aha moment.
            </Paragraph>
          </Col>
        </Row>
      </Card>

    </Space>
  );
}

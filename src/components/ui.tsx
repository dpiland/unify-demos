/**
 * Shared presentational building blocks for the Albert Invent PMM portfolio.
 *
 * Voice rule baked into the layout: every view leads with a HookBanner (the
 * exec-summary line + the job to be done + the headline numbers) BEFORE any
 * tactical detail. Lead with impact, then show how the sausage is made.
 */

import type { ReactNode } from 'react';
import { Typography, Tag, Collapse } from 'antd';

const { Title, Text, Paragraph } = Typography;

export const BRAND = {
  violet: '#7D19FE',
  violetDark: '#5511b0',
  violetSoft: '#f3eafe',
  ink: '#1a1430',
};

/** The molecular-strand mark used across the app. */
export function MolecularMark({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="9" r="4" fill={color} />
      <circle cx="9" cy="30" r="4" fill={color} />
      <circle cx="35" cy="30" r="4" fill={color} />
      <circle cx="22" cy="22" r="3" fill={color} opacity={0.7} />
      <line x1="22" y1="9" x2="22" y2="22" stroke={color} strokeWidth="2" />
      <line x1="22" y1="22" x2="9" y2="30" stroke={color} strokeWidth="2" />
      <line x1="22" y1="22" x2="35" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

/** The exec-summary hero at the top of every view. */
export function HookBanner({
  eyebrow,
  jtbd,
  hook,
  metrics,
}: {
  eyebrow: string;
  jtbd: string;
  hook: string;
  metrics: { value: string; label: string }[];
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: '32px 36px',
        color: '#fff',
        background:
          'radial-gradient(900px 400px at 90% -40%, rgba(173,115,254,0.55), transparent), linear-gradient(135deg, #7D19FE 0%, #4a0c95 100%)',
        boxShadow: '0 18px 40px rgba(125,25,254,0.28)',
      }}
    >
      <Text style={{ color: '#e4ccfe', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
        {eyebrow}
      </Text>
      <Title level={2} style={{ color: '#fff', marginTop: 8, marginBottom: 12, fontWeight: 700, lineHeight: 1.2 }}>
        {jtbd}
      </Title>
      <Paragraph style={{ color: '#efe6ff', fontSize: 16, maxWidth: 820, marginBottom: 24, lineHeight: 1.6 }}>
        {hook}
      </Paragraph>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
        {metrics.map(m => (
          <div key={m.label}>
            <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{m.value}</div>
            <div style={{ color: '#d8c6fb', fontSize: 13, marginTop: 6, maxWidth: 200 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A titled content section with an anchor id. */
export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 88 }}>
      {kicker && (
        <Text style={{ color: BRAND.violet, fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
          {kicker}
        </Text>
      )}
      <Title level={3} style={{ marginTop: kicker ? 4 : 0, marginBottom: 16, color: BRAND.ink }}>
        {title}
      </Title>
      {children}
    </section>
  );
}

/** A simple white card container. */
export function Panel({
  children,
  style,
  accent,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${accent ? BRAND.violet : '#ece8f4'}`,
        borderRadius: 14,
        padding: 24,
        boxShadow: '0 1px 3px rgba(26,20,48,0.05)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Small labelled stat. */
export function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || BRAND.violet, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6b6480', marginTop: 4 }}>{label}</div>
    </div>
  );
}

/** A pill tag. */
export function Pill({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <Tag
      style={{
        borderRadius: 999,
        padding: '2px 12px',
        fontSize: 12,
        border: 'none',
        background: color || BRAND.violetSoft,
        color: color ? '#fff' : BRAND.violetDark,
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}

/** Discreet, collapsed-by-default presenter note (the 30–45s talk track). */
export function SpeakerTrack({ children }: { children: ReactNode }) {
  return (
    <Collapse
      ghost
      expandIconPosition="start"
      style={{ background: '#1a0a38', borderRadius: 12 }}
      items={[
        {
          key: '1',
          label: (
            <Text style={{ color: '#cdbff0', fontSize: 13, fontWeight: 600 }}>
              Presenter notes · ~30–45s (for you, not the panel)
            </Text>
          ),
          children: (
            <Paragraph style={{ color: '#e4ccfe', marginBottom: 0, lineHeight: 1.65, fontSize: 14 }}>
              {children}
            </Paragraph>
          ),
        },
      ]}
    />
  );
}

/** Tiny credibility tag: 'fact' (violet), 'hypothesis' (dashed), or 'verified' (green, custom text). */
export function Tagline({ kind, children }: { kind: 'fact' | 'hypothesis' | 'verified'; children?: ReactNode }) {
  const styles =
    kind === 'fact'
      ? { background: BRAND.violet, color: '#fff', border: 'none' }
      : kind === 'verified'
      ? { background: '#f6ffed', color: '#237804', border: '1px solid #b7eb8f' }
      : { background: '#fff', color: BRAND.violetDark, border: `1px dashed ${BRAND.violet}` };
  const text = kind === 'fact' ? 'Albert-published' : kind === 'hypothesis' ? 'my hypothesis' : children;
  return (
    <Tag style={{ borderRadius: 999, padding: '1px 10px', fontSize: 11, margin: 0, ...styles }}>{text}</Tag>
  );
}

/** Closing "questions I'd ask you" block — turns the view into a conversation. */
export function Questions({ name, items }: { name: string; items: string[] }) {
  return (
    <Section id="questions" kicker="Where I'd want your read" title={`Questions I'd ask you, ${name}`}>
      <Panel style={{ background: BRAND.violetSoft, borderColor: '#e0d2fb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: BRAND.violet, fontWeight: 800, fontSize: 18, lineHeight: 1.4 }}>?</span>
              <Text style={{ color: BRAND.ink, fontSize: 15, lineHeight: 1.55 }}>{q}</Text>
            </div>
          ))}
        </div>
      </Panel>
    </Section>
  );
}

/** A two-line "what I'd ship" deliverable row. */
export function Deliverable({ title, body, tag }: { title: string; body: string; tag?: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: BRAND.violet,
          marginTop: 8,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Text strong style={{ color: BRAND.ink, fontSize: 15 }}>
            {title}
          </Text>
          {tag && <Pill>{tag}</Pill>}
        </div>
        <Paragraph style={{ color: '#56506b', marginBottom: 0, marginTop: 4, lineHeight: 1.6 }}>{body}</Paragraph>
      </div>
    </div>
  );
}

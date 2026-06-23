/**
 * LoginPage — Albert Invent PMM Portfolio
 *
 * The entry point to the portfolio. Each panelist selects their name and is taken
 * to the experience built for their function. The selection sets CloudBees custom
 * properties (panelistId / audience) that route the audienceView flag.
 */

import { Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { OVERVIEW_USER, DEFAULT_USERS, getUserInitials, type User } from '../lib/users';

const { Title, Text } = Typography;

interface LoginPageProps {
  onSelectUser: (user: User) => void;
}

function MolecularMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="9" r="4" fill="#7D19FE" />
      <circle cx="9" cy="30" r="4" fill="#7D19FE" />
      <circle cx="35" cy="30" r="4" fill="#7D19FE" />
      <circle cx="22" cy="22" r="3" fill="#ad73fe" />
      <line x1="22" y1="9" x2="22" y2="22" stroke="#7D19FE" strokeWidth="2" />
      <line x1="22" y1="22" x2="9" y2="30" stroke="#7D19FE" strokeWidth="2" />
      <line x1="22" y1="22" x2="35" y2="30" stroke="#7D19FE" strokeWidth="2" />
    </svg>
  );
}

export function LoginPage({ onSelectUser }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(1200px 600px at 80% -10%, rgba(125,25,254,0.18), transparent), linear-gradient(135deg, #160a2e 0%, #0a0518 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 920 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <MolecularMark size={56} />
          </div>
          <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 700, letterSpacing: -0.5 }}>
            Product Marketing, built for Albert Invent
          </Title>
          <Text style={{ color: '#cdbff0', fontSize: 16, display: 'block', marginTop: 8 }}>
            One portfolio, tailored to each of you. Choose your name to see the work I'd own for your team.
          </Text>
          <Text style={{ color: '#8b7bb8', fontSize: 13, display: 'block', marginTop: 6 }}>
            Prepared by Drew Piland · Round 5 Panel · June 25, 2026
          </Text>
        </div>

        {/* Panelist cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 16,
          }}
        >
          {DEFAULT_USERS.map(user => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user)}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid rgba(125,25,254,0.35)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(6px)',
                borderRadius: 16,
                padding: 20,
                color: '#fff',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                transition: 'transform 0.15s ease, border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#7D19FE';
                e.currentTarget.style.background = 'rgba(125,25,254,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(125,25,254,0.35)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: user.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {getUserInitials(user.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text strong style={{ color: '#fff', fontSize: 17 }}>
                    {user.name}
                  </Text>
                  <ArrowRightOutlined style={{ color: '#ad73fe' }} />
                </div>
                <Text style={{ color: '#b9a8e0', fontSize: 13, display: 'block' }}>{user.role}</Text>
                <Text style={{ color: '#9a8bc4', fontSize: 13, display: 'block', marginTop: 8, lineHeight: 1.5 }}>
                  {user.description}
                </Text>
              </div>
            </button>
          ))}
        </div>

        {/* Overview link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => onSelectUser(OVERVIEW_USER)}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: '#b9a8e0',
              fontSize: 14,
            }}
          >
            Or start with the overview — the map of all four views &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

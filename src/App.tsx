/**
 * App — Albert Invent Product Marketing Portfolio
 *
 * One application, four tailored audience experiences. The signed-in panelist's
 * defaultView (or the CloudBees `audienceView` flag, if targeted) selects which
 * experience renders. Feature management is the mechanism; the content is the point.
 */

import { useState } from 'react';
import { Layout, Typography, Segmented, Dropdown, Avatar, Grid } from 'antd';
import type { MenuProps } from 'antd';
import { useFeatureFlagString } from './hooks/useFeatureFlag';
import { setUserProperties } from './lib/featureFlags';
import {
  ALL_USERS,
  getUserInitials,
  type User,
  type AudienceView,
} from './lib/users';
import { MolecularMark, BRAND } from './components/ui';
import { OverviewView } from './views/OverviewView';
import { ContentView } from './views/ContentView';
import { PanelView } from './views/PanelView';
import { ProductView } from './views/ProductView';
import { SalesView } from './views/SalesView';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const VALID_VIEWS: AudienceView[] = ['overview', 'content', 'panel', 'product', 'sales'];

const VIEW_LABEL: Record<AudienceView, string> = {
  overview: 'Overview',
  content: 'Content · Brooke',
  panel: 'Case Study · Dana',
  product: 'Product · Oakley',
  sales: 'Sales · Mark',
};

const VIEW_GREETING: Record<AudienceView, string> = {
  overview: 'The map — one portfolio, four audiences',
  content: 'The Content Marketing experience · built for Brooke Kuei',
  panel: 'The Case Study walkthrough · built for Dana Barrett',
  product: 'The Product Meeting experience · built for Oakley Reid',
  sales: 'The Sales Meeting experience · built for Mark Poggi',
};

interface AppProps {
  currentUser: User;
  userMenuItems: MenuProps['items'];
}

export default function App({ currentUser, userMenuItems }: AppProps) {
  const screens = useBreakpoint();
  const flagView = useFeatureFlagString('audienceView');

  // CloudBees can force a view via the flag; otherwise defer to the persona.
  const initialView: AudienceView =
    flagView && flagView !== 'auto' && (VALID_VIEWS as string[]).includes(flagView)
      ? (flagView as AudienceView)
      : currentUser.defaultView;

  const [activeView, setActiveView] = useState<AudienceView>(initialView);

  const handleNavigate = (view: AudienceView) => {
    setActiveView(view);
    // Keep CloudBees targeting context in sync with the audience being viewed.
    const match = ALL_USERS.find(u => u.defaultView === view);
    if (match) setUserProperties(match);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (activeView) {
      case 'content':
        return <ContentView />;
      case 'panel':
        return <PanelView />;
      case 'product':
        return <ProductView />;
      case 'sales':
        return <SalesView />;
      default:
        return <OverviewView onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#faf8fe' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          background: 'linear-gradient(135deg, #2a0856 0%, #1a0a38 100%)',
          padding: screens.md ? '0 28px' : '0 16px',
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <MolecularMark size={28} />
          <div style={{ lineHeight: 1.1, minWidth: 0 }}>
            <Text style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Albert Invent</Text>
            <div style={{ color: '#b9a8e0', fontSize: 11 }}>Product Marketing · Drew Piland</div>
          </div>
        </div>

        {screens.lg && (
          <Segmented
            value={activeView}
            onChange={val => handleNavigate(val as AudienceView)}
            options={VALID_VIEWS.map(v => ({ label: VIEW_LABEL[v], value: v }))}
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
        )}

        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            {screens.md && (
              <div style={{ textAlign: 'right', lineHeight: 1.1 }}>
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{currentUser.name}</Text>
                <div style={{ color: '#b9a8e0', fontSize: 11 }}>{currentUser.role}</div>
              </div>
            )}
            <Avatar style={{ background: currentUser.accent, fontWeight: 700 }}>
              {getUserInitials(currentUser.name)}
            </Avatar>
          </div>
        </Dropdown>
      </Header>

      {/* Greeting / context strip */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #efeaf8',
          padding: screens.md ? '10px 28px' : '10px 16px',
        }}
      >
        <Text style={{ color: BRAND.violetDark, fontSize: 13, fontWeight: 600 }}>{VIEW_GREETING[activeView]}</Text>
      </div>

      {/* Mobile / tablet segmented */}
      {!screens.lg && (
        <div style={{ background: '#fff', padding: '10px 16px', borderBottom: '1px solid #efeaf8', overflowX: 'auto' }}>
          <Segmented
            value={activeView}
            onChange={val => handleNavigate(val as AudienceView)}
            options={VALID_VIEWS.map(v => ({ label: VIEW_LABEL[v], value: v }))}
          />
        </div>
      )}

      <Content style={{ padding: screens.md ? '32px 28px 48px' : '20px 14px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>{renderView()}</div>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'transparent', color: '#9a8bc4', fontSize: 12 }}>
        One codebase · four audiences · tailored with CloudBees Feature Management — the mechanism, not the message.
      </Footer>
    </Layout>
  );
}

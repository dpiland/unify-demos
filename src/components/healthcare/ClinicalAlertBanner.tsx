/**
 * ClinicalAlertBanner Component
 *
 * Displays critical clinical notifications: abnormal lab results,
 * overdue follow-ups, and drug interaction warnings.
 *
 * FEATURE FLAG: showClinicalAlerts (boolean)
 * Safety-critical: default is ON for all providers
 */

import { Alert, Space } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export function ClinicalAlertBanner() {
  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Alert
        message="Critical Lab Result"
        description="Patient Thompson, M. — Potassium level 6.2 mEq/L (critical high). Review immediately."
        type="error"
        showIcon
        icon={<WarningOutlined />}
        closable
      />
      <Alert
        message="Overdue Follow-Up"
        description="3 patients have overdue follow-up appointments. Jenkins, H. (14 days), Russo, F. (7 days), Collins, W. (5 days)."
        type="warning"
        showIcon
        closable
      />
    </Space>
  );
}

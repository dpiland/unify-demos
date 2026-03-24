/**
 * Mortgage Simulator Page
 *
 * Payment calculator, term comparison (15 vs 30 year), amortization breakdown,
 * and pre-qualification prompt. Controlled by enableMortgageSimulator boolean flag.
 */

import { useState } from 'react';
import { Button, Card, Col, Divider, InputNumber, Row, Slider, Space, Statistic, Table, Tag, Typography } from 'antd';
import {
  HomeOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { theme as antdTheme } from 'antd';

const { Title, Text, Paragraph } = Typography;

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function generateAmortization(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  let balance = principal;
  const rows = [];

  for (let year = 1; year <= Math.min(years, 30); year++) {
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    for (let month = 0; month < 12; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      yearlyInterest += interest;
      yearlyPrincipal += principalPaid;
      balance -= principalPaid;
    }
    rows.push({
      year,
      principal: yearlyPrincipal,
      interest: yearlyInterest,
      balance: Math.max(0, balance),
    });
  }
  return rows;
}

export function MortgageSimulator() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const bgSubtle = isDark ? '#1f1f1f' : '#fafafa';

  const [homePrice, setHomePrice] = useState(425000);
  const [downPayment, setDownPayment] = useState(85000);
  const [rate30, setRate30] = useState(6.75);
  const [rate15, setRate15] = useState(5.99);
  const [showPreQual, setShowPreQual] = useState(false);

  const loanAmount = homePrice - downPayment;
  const downPercent = homePrice > 0 ? Math.round((downPayment / homePrice) * 100) : 0;

  const monthly30 = calculateMonthlyPayment(loanAmount, rate30, 30);
  const monthly15 = calculateMonthlyPayment(loanAmount, rate15, 15);
  const totalCost30 = monthly30 * 360;
  const totalCost15 = monthly15 * 180;
  const totalInterest30 = totalCost30 - loanAmount;
  const totalInterest15 = totalCost15 - loanAmount;

  const amortization30 = generateAmortization(loanAmount, rate30, 30);

  const amortColumns = [
    { title: 'Year', dataIndex: 'year', key: 'year', width: 70 },
    {
      title: 'Principal',
      dataIndex: 'principal',
      key: 'principal',
      align: 'right' as const,
      render: (v: number) => `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      align: 'right' as const,
      render: (v: number) => `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    },
    {
      title: 'Remaining Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right' as const,
      render: (v: number) => <Text strong>${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <HomeOutlined style={{ fontSize: 24, color: '#1a3c5e' }} />
        <Title level={3} style={{ marginBottom: 0 }}>Mortgage Simulator</Title>
      </div>

      {/* Calculator Inputs */}
      <Card title={<Space><CalculatorOutlined /><span>Loan Calculator</span></Space>}>
        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 20 }}>
              <Text strong>Home Price</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <Slider
                  min={100000}
                  max={1500000}
                  step={5000}
                  value={homePrice}
                  onChange={setHomePrice}
                  style={{ flex: 1 }}
                />
                <InputNumber
                  min={100000}
                  max={1500000}
                  step={5000}
                  value={homePrice}
                  onChange={v => v && setHomePrice(v)}
                  formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: 140 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Text strong>Down Payment ({downPercent}%)</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <Slider
                  min={0}
                  max={homePrice}
                  step={5000}
                  value={downPayment}
                  onChange={setDownPayment}
                  style={{ flex: 1 }}
                />
                <InputNumber
                  min={0}
                  max={homePrice}
                  step={5000}
                  value={downPayment}
                  onChange={v => v != null && setDownPayment(v)}
                  formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{ width: 140 }}
                />
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div style={{ marginBottom: 20 }}>
              <Text strong>30-Year Rate (%)</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <Slider
                  min={3}
                  max={10}
                  step={0.05}
                  value={rate30}
                  onChange={setRate30}
                  style={{ flex: 1 }}
                />
                <InputNumber
                  min={3}
                  max={10}
                  step={0.05}
                  value={rate30}
                  onChange={v => v && setRate30(v)}
                  formatter={v => `${v}%`}
                  style={{ width: 100 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Text strong>15-Year Rate (%)</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <Slider
                  min={3}
                  max={10}
                  step={0.05}
                  value={rate15}
                  onChange={setRate15}
                  style={{ flex: 1 }}
                />
                <InputNumber
                  min={3}
                  max={10}
                  step={0.05}
                  value={rate15}
                  onChange={v => v && setRate15(v)}
                  formatter={v => `${v}%`}
                  style={{ width: 100 }}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]} style={{ textAlign: 'center' }}>
          <Col xs={24} sm={6}>
            <Statistic
              title="Loan Amount"
              value={loanAmount}
              prefix="$"
              precision={0}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic
              title="Down Payment"
              value={downPercent}
              suffix="%"
            />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic title="30-Year Monthly" value={monthly30} prefix="$" precision={2} />
          </Col>
          <Col xs={24} sm={6}>
            <Statistic title="15-Year Monthly" value={monthly15} prefix="$" precision={2} />
          </Col>
        </Row>
      </Card>

      {/* Term Comparison */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={<Space><span>30-Year Fixed</span><Tag color="blue">{rate30}% APR</Tag></Space>}
            style={{ height: '100%' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Statistic title="Monthly Payment" value={monthly30} prefix="$" precision={2} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Total Interest Paid</Text>
                <Text style={{ color: '#f5222d' }}>${totalInterest30.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Total Cost of Loan</Text>
                <Text strong>${totalCost30.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={<Space><span>15-Year Fixed</span><Tag color="green">{rate15}% APR</Tag></Space>}
            style={{ height: '100%' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Statistic title="Monthly Payment" value={monthly15} prefix="$" precision={2} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Total Interest Paid</Text>
                <Text style={{ color: '#f5222d' }}>${totalInterest15.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Total Cost of Loan</Text>
                <Text strong>${totalCost15.toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text>
              </div>
              <div style={{ padding: '8px 12px', background: isDark ? '#162312' : '#f6ffed', borderRadius: 6 }}>
                <Text style={{ color: '#52c41a' }}>
                  You save <Text strong style={{ color: '#52c41a' }}>${(totalInterest30 - totalInterest15).toLocaleString('en-US', { maximumFractionDigits: 0 })}</Text> in interest with the 15-year term
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Amortization Schedule */}
      <Card title="Amortization Schedule (30-Year)">
        <Table
          dataSource={amortization30}
          columns={amortColumns}
          rowKey="year"
          pagination={{ pageSize: 10, size: 'small' }}
          size="small"
          scroll={{ x: 500 }}
        />
      </Card>

      {/* Pre-Qualification CTA */}
      <Card style={{ background: isDark ? '#1f1f1f' : bgSubtle, textAlign: 'center' }}>
        {showPreQual ? (
          <Space direction="vertical" size="middle">
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <Title level={4}>Pre-Qualification Request Submitted</Title>
            <Paragraph type="secondary">
              A Horizon Bank mortgage specialist will contact you within 1 business day
              to discuss your options and next steps.
            </Paragraph>
          </Space>
        ) : (
          <Space direction="vertical" size="middle">
            <HomeOutlined style={{ fontSize: 48, color: '#1a3c5e' }} />
            <Title level={4}>Ready to Take the Next Step?</Title>
            <Paragraph type="secondary" style={{ maxWidth: 480, margin: '0 auto' }}>
              Get pre-qualified in minutes with no impact to your credit score.
              See how much home you can afford with Horizon Bank.
            </Paragraph>
            <Button type="primary" size="large" onClick={() => setShowPreQual(true)}>
              Get Pre-Qualified
            </Button>
          </Space>
        )}
      </Card>
    </Space>
  );
}

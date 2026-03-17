/**
 * PatientMessagingInbox Component
 *
 * Secure patient-provider messaging inbox with threaded conversations.
 * Two-column layout: thread list (left) and selected thread detail (right).
 *
 * FEATURE FLAG: enablePatientMessaging (boolean)
 * DOUBLE-GATE: Also requires !isResident user property
 */

import { useState } from 'react';
import { Badge, Button, Card, Col, Input, List, Row, Space, Tag, Typography } from 'antd';
import {
  MessageOutlined,
  PaperClipOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  sender: 'patient' | 'provider';
  text: string;
  time: string;
}

interface Thread {
  id: string;
  patientName: string;
  subject: string;
  preview: string;
  lastMessageTime: string;
  unread: boolean;
  urgent: boolean;
  messages: Message[];
}

const THREADS: Thread[] = [
  {
    id: 't-1',
    patientName: 'Dorothy Price',
    subject: 'Medication Side Effects',
    preview: 'I\'ve been experiencing dizziness since starting the new...',
    lastMessageTime: '15 min ago',
    unread: true,
    urgent: true,
    messages: [
      { id: 'm-1', sender: 'patient', text: 'Dr. Chen, I\'ve been experiencing dizziness since starting the new blood pressure medication last week. It happens mostly in the morning when I stand up quickly. Should I be concerned?', time: '15 min ago' },
      { id: 'm-2', sender: 'provider', text: 'Thank you for letting me know, Dorothy. Orthostatic dizziness can be a side effect of Amlodipine. Please try standing up slowly and stay hydrated. If it persists for more than a few days or gets worse, we should adjust your dosage. Can you monitor your blood pressure at home this week?', time: '10 min ago' },
      { id: 'm-3', sender: 'patient', text: 'Yes, I have a home monitor. I\'ll track it daily and send you the readings. Thank you for the quick response!', time: '5 min ago' },
    ],
  },
  {
    id: 't-2',
    patientName: 'Robert Garcia',
    subject: 'Lab Results Question',
    preview: 'I saw my lab results in the portal and had a question about...',
    lastMessageTime: '2 hours ago',
    unread: true,
    urgent: false,
    messages: [
      { id: 'm-4', sender: 'patient', text: 'I saw my lab results in the portal and had a question about my HbA1c. It says 6.8% — is that good? I\'ve been really trying with the diet changes.', time: '2 hours ago' },
      { id: 'm-5', sender: 'provider', text: 'Great news, Robert! Your HbA1c dropped from 7.2% to 6.8% — that\'s excellent progress. Your dietary changes are clearly working. Keep it up, and we\'ll recheck in 3 months.', time: '1 hour ago' },
    ],
  },
  {
    id: 't-3',
    patientName: 'Margaret Wilson',
    subject: 'Appointment Reschedule',
    preview: 'Can I move my follow-up from March 18 to the following...',
    lastMessageTime: '1 day ago',
    unread: false,
    urgent: false,
    messages: [
      { id: 'm-6', sender: 'patient', text: 'Can I move my follow-up from March 18 to the following week? I have a conflict that day.', time: '1 day ago' },
      { id: 'm-7', sender: 'provider', text: 'Of course, Margaret. I have availability on March 24 at 10:00 AM or March 25 at 2:30 PM. Which works better for you?', time: '1 day ago' },
      { id: 'm-8', sender: 'patient', text: 'March 24 at 10 AM works perfectly. Thank you!', time: '23 hours ago' },
    ],
  },
  {
    id: 't-4',
    patientName: 'Frank Russo',
    subject: 'Prescription Refill',
    preview: 'I\'m running low on my Atorvastatin. Can you send a refill...',
    lastMessageTime: '2 days ago',
    unread: false,
    urgent: false,
    messages: [
      { id: 'm-9', sender: 'patient', text: 'I\'m running low on my Atorvastatin. Can you send a refill to my pharmacy? Walgreens on Main Street.', time: '2 days ago' },
      { id: 'm-10', sender: 'provider', text: 'Refill sent to Walgreens on Main Street. It should be ready within 24 hours. Remember, your next lipid panel is due in April — please schedule that lab work before your next visit.', time: '2 days ago' },
    ],
  },
  {
    id: 't-5',
    patientName: 'Lisa Park',
    subject: 'Post-Op Recovery Update',
    preview: 'Wanted to update you on my knee recovery. Physical therapy...',
    lastMessageTime: '3 days ago',
    unread: false,
    urgent: false,
    messages: [
      { id: 'm-11', sender: 'patient', text: 'Wanted to update you on my knee recovery. Physical therapy is going well — I can bend to 120 degrees now. The swelling has gone down a lot.', time: '3 days ago' },
      { id: 'm-12', sender: 'provider', text: 'That\'s wonderful progress, Lisa! 120 degrees at this stage is ahead of schedule. Keep up with the PT exercises, and I\'ll see you at your follow-up on March 23.', time: '3 days ago' },
    ],
  },
  {
    id: 't-6',
    patientName: 'Harold Jenkins',
    subject: 'Glucose Readings',
    preview: 'Attached my glucose log from this week. A few readings...',
    lastMessageTime: '4 days ago',
    unread: false,
    urgent: false,
    messages: [
      { id: 'm-13', sender: 'patient', text: 'Attached my glucose log from this week. A few readings were above 200 after meals. I\'m not sure what I\'m doing wrong with the diet.', time: '4 days ago' },
      { id: 'm-14', sender: 'provider', text: 'Thank you for sharing those readings, Harold. The post-meal spikes suggest we may need to adjust your mealtime insulin. I\'d like to discuss this at your visit on March 18. In the meantime, try eating smaller portions and including more fiber with each meal.', time: '4 days ago' },
    ],
  },
];

export function PatientMessagingInbox() {
  const [selectedThread, setSelectedThread] = useState<string>(THREADS[0].id);
  const activeThread = THREADS.find(t => t.id === selectedThread)!;
  const unreadCount = THREADS.filter(t => t.unread).length;

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Title level={5} style={{ margin: 0 }}>Secure Messages</Title>
          {unreadCount > 0 && <Badge count={unreadCount} style={{ backgroundColor: '#0891b2' }} />}
        </Space>
        <Button type="primary" icon={<MessageOutlined />} size="small">
          New Message
        </Button>
      </div>

      <Row gutter={16}>
        {/* Thread List */}
        <Col xs={24} md={9}>
          <Card size="small" bodyStyle={{ padding: 0 }}>
            <List
              size="small"
              dataSource={THREADS}
              renderItem={(thread) => (
                <List.Item
                  onClick={() => setSelectedThread(thread.id)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    background: thread.id === selectedThread ? '#ecfeff' : thread.unread ? '#fafafa' : 'transparent',
                    borderLeft: thread.id === selectedThread ? '3px solid #0891b2' : '3px solid transparent',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <Space size={4}>
                        <Text strong={thread.unread} style={{ fontSize: 13 }}>{thread.patientName}</Text>
                        {thread.urgent && <Tag color="red" style={{ fontSize: 10, lineHeight: '16px' }}>URGENT</Tag>}
                      </Space>
                      {thread.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891b2' }} />}
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: thread.unread ? 600 : 400 }}>{thread.subject}</Text>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary" style={{ fontSize: 11 }} ellipsis>{thread.preview}</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 10 }}>{thread.lastMessageTime}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Thread Detail */}
        <Col xs={24} md={15}>
          <Card
            size="small"
            title={
              <Space>
                <UserOutlined />
                <span>{activeThread.patientName}</span>
                <Text type="secondary" style={{ fontWeight: 400 }}>— {activeThread.subject}</Text>
              </Space>
            }
          >
            <div style={{ maxHeight: 350, overflowY: 'auto', marginBottom: 16 }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {activeThread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'provider' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '10px 14px',
                        borderRadius: msg.sender === 'provider' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                        background: msg.sender === 'provider' ? '#0891b2' : '#f5f5f5',
                        color: msg.sender === 'provider' ? '#fff' : 'inherit',
                      }}
                    >
                      <Text style={{ fontSize: 13, color: msg.sender === 'provider' ? '#fff' : 'inherit' }}>
                        {msg.text}
                      </Text>
                      <br />
                      <Text
                        style={{
                          fontSize: 10,
                          color: msg.sender === 'provider' ? 'rgba(255,255,255,0.7)' : '#8c8c8c',
                        }}
                      >
                        {msg.sender === 'provider' ? 'You' : activeThread.patientName} — {msg.time}
                      </Text>
                    </div>
                  </div>
                ))}
              </Space>
            </div>

            {/* Reply area */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
              <TextArea
                placeholder="Type a secure message..."
                rows={2}
                disabled
                style={{ marginBottom: 8 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button icon={<PaperClipOutlined />} size="small" disabled>Attach</Button>
                <Button type="primary" icon={<SendOutlined />} size="small" disabled>Send</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

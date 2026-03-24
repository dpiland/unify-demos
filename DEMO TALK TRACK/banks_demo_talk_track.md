# Horizon Bank Demo — Talk Track & Persona Playbook

**Purpose:** Guide for agency partners running the Horizon Bank demo in demand generation campaigns, ABM outreach, and live/recorded demo sequences. This document maps each feature flag to buyer personas, provides ready-to-use messaging, and outlines recommended demo flows.

**Demo App:** Horizon Bank — a consumer banking application built on React with CloudBees Feature Management controlling key features in real time.

---

## Table of Contents

1. [Demo Overview](#demo-overview)
2. [Feature Flag Inventory](#feature-flag-inventory)
3. [User Personas in the Demo](#user-personas-in-the-demo)
4. [Buyer Persona Alignment](#buyer-persona-alignment)
   - [CTO](#cto--strategic-risk--innovation-velocity)
   - [VP Software Delivery](#vp-software-delivery--throughput-stability-and-dora-metrics)
   - [Engineering Manager](#engineering-manager--team-productivity--developer-experience)
   - [Release Manager](#release-manager--control-auditability-and-incident-response)
   - [CPO / VP Product](#cpo--vp-product--customer-experience--experimentation)
5. [Recommended Demo Flows](#recommended-demo-flows)
6. [ABM Outreach Playbook](#abm-outreach-playbook)
7. [Objection Handling](#objection-handling)
8. [Key Messaging Themes](#key-messaging-themes)

---

## Demo Overview

Horizon Bank is a fully functional consumer banking UI with sidebar navigation, multiple pages (Account Summary, Transfer & Pay, Investments, Rewards & Offers), and realistic mock data. It looks and behaves like a real banking application — not a "feature flags demo."

Under the hood, **7 feature flags** control key capabilities. Toggling these flags in the CloudBees platform changes the application in real time — no code change, no deployment, no page refresh required.

The demo also includes **4 customer personas** that showcase user-level targeting. Switching personas changes which flags activate, demonstrating how the same application delivers different experiences to different customer segments.

### Core Value Proposition

> Ship features safely. Control who sees what. Empower every team to move faster — without increasing risk.

---

## Feature Flag Inventory

| Flag Name | Type | Values | What It Controls |
|-----------|------|--------|-----------------|
| `showFraudAlerts` | Boolean | on/off | Red fraud detection alert banner on Account Summary with suspicious transaction details and "Was this you?" prompt |
| `enableChatSupport` | Boolean | on/off | Floating chat support widget (bottom-right corner) with live conversation UI |
| `promotionalBanner` | String | `none`, `mortgage-refi`, `travel-rewards`, `savings-bonus` | Marketing campaign banner across the top of every page |
| `enableInstantTransfers` | Boolean | on/off | "Instant" transfer speed option on the Transfer & Pay page (lightning bolt icon, "funds arrive in seconds") |
| `showInvestmentPortfolio` | Boolean | on/off | Entire "Investments" navigation item and page — appears/disappears from the sidebar |
| `dashboardLayout` | String | `classic`, `modern`, `compact` | Account Summary page layout — different card arrangements and density |
| `recentTransactionsToShow` | Number | 5, 10, 25, 50 | Number of transactions displayed in the Recent Activity table |

---

## User Personas in the Demo

The demo login screen presents four banking customer personas. Each has different properties that drive feature flag targeting rules.

| Persona | Role | Key Properties | Demo Purpose |
|---------|------|---------------|--------------|
| **Sarah Everyday** | Standard checking customer | Basic tier, low balance ($4,250), 18-month tenure | Baseline experience — minimal features enabled |
| **Marcus Premier** | Premier banking customer | Premium tier, high balance ($187,500), investment accounts, 72-month tenure | Premium experience — shows targeting by customer value |
| **Dev Tester** | Internal beta tester | Beta tier, investment accounts, mid-balance ($12,800) | Beta/canary releases — shows internal testing workflows |
| **Priya Newmember** | New customer | New user, low balance ($1,500), 2-month tenure | Onboarding experience — shows new user targeting |

**Key demo move:** Log in as Sarah (baseline), show the standard experience, then switch to Marcus and watch the app transform — same code, same deployment, completely different experience.

---

## Buyer Persona Alignment

### CTO — Strategic Risk & Innovation Velocity

**What keeps them up at night:** Board-level accountability for both speed of innovation and protection of the business. Explaining to regulators why a security response took 48 hours. Justifying why a new product launch slipped another quarter.

**Lead with these flags:**

#### `showFraudAlerts` — Incident Response Without a Release Cycle

> "When your fraud detection system flags a suspicious transaction at 2:47 AM, how fast does that warning reach affected customers? Today, that's a hotfix, an emergency deploy, and an on-call engineer. With Feature Management, it's a toggle. Your response time is decoupled from your release cycle. That's a governance capability — not just a developer tool."

- **Pain point:** Slow incident response, compliance exposure, customer trust erosion
- **Value:** Reduce incident response from hours to seconds. Audit trail for every change. No emergency deploys.

#### `showInvestmentPortfolio` — Derisking Major Product Launches

> "You're launching a new investment platform — a $10M initiative. Do you flip the switch for all 5 million customers on day one? Or do you stage it — beta testers this month, premier clients next month, general availability next quarter — all from one codebase, deployed once? Feature Management turns a high-stakes launch into a controlled rollout."

- **Pain point:** Big-bang releases of strategic initiatives, inability to stage launches
- **Value:** Phased rollout of major capabilities, reduced blast radius, data-driven expansion decisions

**CTO-level questions to anticipate:**
- "How does this fit into our existing governance and compliance model?"
- "What's the blast radius if something goes wrong?"
- "Is this SOC 2 / regulatory compliant?"
- "How does this compare to what we're doing with LaunchDarkly / homegrown flags?"

---

### VP Software Delivery — Throughput, Stability, and DORA Metrics

**What keeps them up at night:** DORA metrics (deployment frequency, lead time, change failure rate, MTTR). Deployment freezes before holidays. The tension between "ship faster" and "don't break things."

**Lead with these flags:**

#### `enableInstantTransfers` — Decoupling Deploy from Release

> "Your team deployed instant transfers three weeks ago. It's been sitting in production behind a flag, fully tested, zero customer exposure. Today you flip it on for premier customers. No new deployment. No change window. No CAB approval. Your deployment frequency stays high because features merge to main continuously. Your change failure rate stays low because release is a separate, controlled decision."

- **Pain point:** Deployment and release are coupled, creating bottlenecks and risk
- **Value:** Ship code continuously, release on business timelines, maintain high DORA scores

#### `enableChatSupport` — Progressive Delivery and Instant Rollback

> "New chat widget is live in production but dark. You turn it on for 5% of traffic, watch error rates and support ticket volume for an hour, then ramp to 25%, then 100%. If something breaks at any point, you kill it in seconds — not a rollback deploy, not downtime, just a flag flip. Your MTTR for this feature is measured in seconds, not minutes or hours."

- **Pain point:** All-or-nothing releases, slow rollback, high MTTR
- **Value:** Canary releases, instant kill switch, MTTR reduction from minutes/hours to seconds

**VP Software Delivery questions to anticipate:**
- "How does this integrate with our CI/CD pipeline (Jenkins, GitHub Actions, ArgoCD)?"
- "Can we tie flag state changes to our observability stack (Datadog, Splunk, PagerDuty)?"
- "What's the impact on our change failure rate?"
- "Can we automate flag changes based on metrics (auto-rollback)?"

---

### Engineering Manager — Team Productivity & Developer Experience

**What keeps them up at night:** Long-lived feature branches and merge conflicts. Being the bottleneck between product requests and engineering capacity. Team velocity that doesn't match headcount investment.

**Lead with these flags:**

#### `dashboardLayout` — Eliminating Branch-Based Feature Development

> "Three teams are building three layout variants for the dashboard — classic, modern, and compact. Without flags, that's three long-lived branches, weeks of parallel work, and a painful merge at the end. Then someone has to pick a winner based on gut feel. With Feature Management, all three variants merge to main behind flags on day one. They coexist in production. Product runs an experiment, measures for two weeks, and data picks the winner. Your team stops being the bottleneck for business decisions."

- **Pain point:** Long-lived branches, merge conflicts, engineering as decision bottleneck
- **Value:** Trunk-based development, reduced merge overhead, teams unblocked from business decisions

#### `enableInstantTransfers` — Shipping Without Waiting for Launch

> "Your team finishes the instant transfer feature on Tuesday. Product isn't ready to launch until next month — they're waiting on marketing assets and legal review. Without flags, that code sits in a branch for four weeks, accumulating merge debt. With flags, it merges to main, deploys to production, and waits — invisible to users but tested in the real environment. Your team moves on to the next priority immediately."

- **Pain point:** Code sitting in branches waiting for business readiness, WIP accumulation
- **Value:** Continuous integration without premature exposure, reduced WIP, faster team throughput

**Engineering Manager questions to anticipate:**
- "How does this affect our branching strategy?"
- "Can developers create and manage flags self-service?"
- "What's the SDK performance overhead?"
- "How do we prevent flag debt / stale flags?"

---

### Release Manager — Control, Auditability, and Incident Response

**What keeps them up at night:** The 2 AM phone call. Coordinating release windows across teams. Audit trails for compliance. The question "who changed what and when?"

**Lead with these flags:**

#### `showFraudAlerts` — Emergency Response Without Emergency Deploys

> "It's 2 AM. The fraud team detects a pattern and needs a customer-facing alert pushed immediately. Today that's a hotfix branch, an emergency deploy, a rushed QA pass, and a prayer. With Feature Management, you flip a flag. Full audit trail — who changed it, when, and why. Instant rollback if the alert copy is wrong or the targeting is off. Your incident runbook for customer-facing changes just went from 12 steps to 2."

- **Pain point:** Emergency deploys are risky and slow, lack of audit trail, stressful on-call rotations
- **Value:** Instant, auditable, reversible changes to production behavior

#### `promotionalBanner` — Scheduled Releases Without Deployments

> "Marketing wants to swap the promotional campaign Thursday at noon — mortgage refinance for homeowners, travel rewards for high-spenders. Today that's a deploy during business hours, which means a change window, a risk assessment, and you holding your breath. With Feature Management, it's a scheduled flag change. You can set it to auto-activate at 12:00 PM Thursday. You approve it once, it executes on schedule, and there's a full audit log."

- **Pain point:** Routine content changes requiring deployments, coordination overhead with marketing
- **Value:** Scheduled flag changes, approval workflows, reduced coordination tax

#### `enableChatSupport` — Kill Switch for Every Feature

> "The new chat widget went live Monday morning. By 10 AM, support ticket volume is spiking — the bot is giving bad answers. With Feature Management, you kill it immediately. Not a rollback deploy. Not 'we'll fix it in the next release.' You flip the flag, the widget disappears, customers see zero downtime. You just bought your team time to fix the root cause without customer impact."

- **Pain point:** No way to quickly disable a problematic feature, rollback requires deployment
- **Value:** Instant kill switch for any flagged feature, zero-downtime incident response

**Release Manager questions to anticipate:**
- "Is there a full audit log of every flag change?"
- "Can I require approvals before production flag changes?"
- "Can I schedule flag changes for specific times?"
- "Who has permission to toggle flags in production? Can I control that?"
- "Does this integrate with ServiceNow / Jira for change management?"

---

### CPO / VP Product — Customer Experience & Experimentation

**What keeps them up at night:** Moving slower than competitors. Debates about what to build that end in opinion, not data. The inability to personalize experiences at scale. Filing Jira tickets for things that shouldn't require engineering.

**Lead with these flags:**

#### `promotionalBanner` — Segment-Level Personalization Without Engineering

> "You have three marketing campaigns ready to go: mortgage refinance, travel rewards, and a savings bonus for new accounts. Today you can run one at a time, for everyone. With Feature Management, you run all three simultaneously — mortgage-refi targeted to homeowners, travel-rewards to high-spenders, savings-bonus to new accounts. You just tripled your campaign throughput without a single line of code."

- **Pain point:** One-size-fits-all experiences, marketing bottlenecked by engineering
- **Value:** Segment-based personalization, marketing self-service, increased campaign velocity

#### `dashboardLayout` — From Opinions to Experiments

> "You think the modern layout will increase engagement. Your VP of Design prefers classic. The CEO saw something 'compact' at a conference. Stop debating — run the experiment. 50% classic, 50% modern for two weeks. Measure session duration, transactions completed, NPS. Let data decide. Feature Management makes experimentation a product habit, not a quarterly engineering project."

- **Pain point:** Opinion-driven product decisions, slow experimentation cycles, HiPPO culture
- **Value:** Rapid experimentation, data-driven decisions, reduced time-to-learning

#### `showInvestmentPortfolio` — Controlled Go-to-Market

> "You're launching investments as a new product line. Feature Management lets you soft-launch to your 100 most engaged customers, gather qualitative feedback, iterate on the UI, then expand to premier, then GA. You control the go-to-market timeline from the CloudBees dashboard — no engineering tickets, no sprint planning, no waiting."

- **Pain point:** All-or-nothing product launches, slow feedback loops, product team dependent on engineering for release timing
- **Value:** Product-led rollouts, fast feedback loops, self-service release control

**CPO questions to anticipate:**
- "Can my product managers manage flags without engineering?"
- "Can we target by user segment, geography, account type?"
- "How do we measure experiment results? Does this integrate with our analytics?"
- "What's the learning curve for non-technical users?"

---

## Recommended Demo Flows

### Flow A: The Full Story (8-10 minutes)

Best for: Live demos, recorded walkthroughs, executive briefings

| Step | Action | Narration |
|------|--------|-----------|
| 1 | Log in as **Sarah Everyday** | "This is the standard experience for an everyday banking customer. Clean, functional, nothing extra." |
| 2 | Point out: no fraud alert, no chat widget, no promo banner, no Investments nav | "Notice what's NOT here. No alerts, no chat, no promotional offers, no investment section. This is the baseline." |
| 3 | Open CloudBees. Toggle `showFraudAlerts` ON | "Fraud team just detected a suspicious transaction. Watch the dashboard." |
| 4 | Return to app — fraud alert appears | "That alert is live. No deployment. No code change. In a real incident, this is the difference between a 2-hour response and a 2-second response." |
| 5 | Toggle `enableChatSupport` ON | "Product wants to roll out chat support. Let's turn it on." |
| 6 | Return to app — chat widget appears | "Chat support is live. If CSAT drops or tickets spike, we kill it instantly." |
| 7 | Switch `promotionalBanner` to `travel-rewards` | "Marketing wants to run a travel rewards campaign." |
| 8 | Return to app — banner appears at top | "Live. No Jira ticket. No sprint. No deploy." |
| 9 | **Switch user to Marcus Premier** | "Now let's see what a premier customer sees." |
| 10 | Toggle `enableInstantTransfers` ON, `showInvestmentPortfolio` ON | "Premier customers get instant transfers and the investment portfolio." |
| 11 | Navigate to Transfer & Pay — show instant option | "Same app, same deployment. Completely different experience based on who the customer is." |
| 12 | Navigate to Investments (now visible in sidebar) | "An entire product surface — navigation, page, data — controlled by a flag." |
| 13 | Switch `dashboardLayout` to `modern` | "And we're A/B testing layouts. This is the modern variant. Data will tell us which wins." |

### Flow B: The 3-Minute Hook (Video ads, event booths)

Best for: Short-form content, trade show loops, social clips

| Step | Action | Narration |
|------|--------|-----------|
| 1 | Show app as Sarah — baseline | "Standard banking experience." |
| 2 | Toggle `showFraudAlerts` ON — alert appears | "Fraud detected. Alert pushed in seconds. No deploy." |
| 3 | Toggle `enableChatSupport` ON — widget appears | "New feature. Rolled out instantly. Kill switch ready." |
| 4 | Switch to Marcus — toggle `showInvestmentPortfolio` ON | "Different customer. Different experience. Same codebase." |
| 5 | Close with tagline | "Ship safely. Release confidently. CloudBees Feature Management." |

### Flow C: Persona-Specific Deep Dive (5 minutes)

Best for: Targeted ABM outreach, persona-specific landing pages

Pick 2-3 flags aligned to the target persona (see alignment section above) and demo only those, spending more time on the "why it matters" narration than the mechanics.

---

## ABM Outreach Playbook

### Multi-Threaded Campaign Sequence

For targeting multiple personas within a single account simultaneously:

| Week | Persona | Lead Flag | Subject Line / Hook |
|------|---------|-----------|-------------------|
| 1 | Engineering Manager | `dashboardLayout` | "Your team is still merging feature branches. There's a better way." |
| 1 | Release Manager | `showFraudAlerts` | "What's your MTTR when a customer-facing change needs to roll back?" |
| 2 | VP Software Delivery | `enableInstantTransfers` | "Decouple deploy from release. Here's what that actually looks like." |
| 2 | CPO | `promotionalBanner` | "Your marketing team shouldn't need a sprint to change a banner." |
| 3 | CTO | `showInvestmentPortfolio` | "How do you derisk a new product launch without slowing it down?" |

### Email Copy Frameworks

**For technical personas (EM, VP Delivery, Release Manager):**

> Problem statement referencing their daily pain -> One-sentence description of the flag behavior -> Link to 90-second persona-specific demo clip -> CTA: "See how [Company] could ship faster without increasing risk"

**For business personas (CTO, CPO):**

> Strategic question they're accountable for -> Business outcome the flag enables -> Social proof or analyst stat -> Link to 3-minute executive demo -> CTA: "15 minutes to see how this applies to [Company]"

---

## Objection Handling

| Objection | Response |
|-----------|----------|
| "We already have feature flags — we built our own." | "Most teams start there. Homegrown flags work until you need targeting rules, audit trails, scheduled rollouts, and cross-team governance. That's where teams spend 6-12 months building infrastructure instead of shipping product. CloudBees gives you that platform on day one." |
| "This looks like just a UI toggle." | "The toggle is the surface. Underneath is targeting (who sees what), scheduling (when it activates), audit logging (who changed it), approval workflows (who can change production), and analytics integration (what happened after the change). That's the platform." |
| "We use LaunchDarkly already." | "Great — you already understand the value of feature management. The conversation is about whether your current platform integrates with your full delivery pipeline — CI/CD, observability, compliance. CloudBees connects feature management to the rest of your software delivery lifecycle." |
| "Our compliance team won't allow runtime changes to production." | "Feature Management actually strengthens compliance. Every change has an audit trail, approval workflows, and instant rollback. Compare that to an emergency hotfix deploy at 2 AM with no review. Which one does your compliance team prefer?" |
| "This seems like it adds complexity." | "It replaces complexity. Instead of long-lived branches, merge conflicts, deployment coordination, and rollback procedures, you get a single deployment with runtime control. The flag is simpler than the alternative." |

---

## Key Messaging Themes

Use these across all personas and channels:

| Theme | One-Liner |
|-------|-----------|
| **Speed** | "From flag flip to customer impact in seconds — no deploy required." |
| **Safety** | "Ship boldly because you can roll back instantly." |
| **Autonomy** | "Let product and marketing move without waiting on engineering." |
| **Precision** | "The right experience for the right customer at the right time." |
| **Control** | "Every change audited, approved, and reversible." |
| **Intelligence** | "Stop debating. Start experimenting. Let data decide." |

---

## Appendix: Flag-to-Persona Quick Reference

| Flag | CTO | VP Delivery | EM | Release Mgr | CPO |
|------|:---:|:-----------:|:--:|:-----------:|:---:|
| `showFraudAlerts` | PRIMARY | | | PRIMARY | |
| `enableChatSupport` | | PRIMARY | | SECONDARY | |
| `promotionalBanner` | | | | SECONDARY | PRIMARY |
| `enableInstantTransfers` | | PRIMARY | SECONDARY | | |
| `showInvestmentPortfolio` | PRIMARY | | | | SECONDARY |
| `dashboardLayout` | | | PRIMARY | | PRIMARY |
| `recentTransactionsToShow` | | | | | |

*PRIMARY = Lead with this flag for the persona. SECONDARY = Use as supporting proof point.*

---

## Mobile vs Web Demo Notes

The app runs on both web (browser) and iOS (Capacitor). Some behaviors differ by platform, controlled by the `platform` and `isMobile` custom properties sent to CloudBees automatically.

### Mobile-Specific Defaults (Code-Level)

| Behavior | Web | Mobile | Why |
|----------|-----|--------|-----|
| `enableChatSupport` | Respects flag | Always OFF | Floating chat covers too much screen on phone |
| `enableSmartBudgetInsights` | Respects flag | Always OFF | Large AI card takes up too much real estate |
| `enableCryptoTrading` | Respects flag | Always OFF | Wide table with buy/sell doesn't fit small screens |
| `dashboardLayout` | Respects flag | Always `compact` | Compact layout is the only one that works on narrow screens |
| Navigation | Left sidebar | Bottom tab bar + "More" drawer | Standard mobile nav pattern |

### Student Persona — Platform Differences

When demoing the **Jamie College (student)** persona, note these differences between web and mobile:

- **Layout:** Mobile forces `compact` layout; web shows whatever `dashboardLayout` is set to (classic by default)
- **Welcome banner:** The student-focused welcome experience only renders on web; mobile skips it due to compact layout
- **Card Controls:** Available in the "More" drawer on mobile — this is a strong mobile-specific demo point ("student loses their debit card at a coffee shop, freezes it from their phone instantly")
- **No credit card:** Student persona has no credit card on either platform — only Horizon Checking ($5,000) and Horizon Savings ($10,000)
- **Student loans:** Shows on both web and mobile when `showStudentLoans` flag is enabled with `customerSegment == "student"` targeting
- **Budget insights & credit score:** Hidden for students on both platforms

### Demo Tip: Mobile + Web Side-by-Side

For maximum impact, show the app on a phone and laptop simultaneously:

1. Log in as **Jamie College** on both devices
2. Toggle `showStudentLoans` ON in CloudBees — loan card appears on both
3. Point out: "Same flag, same targeting rule, both platforms update in real time"
4. Toggle `enableCardControls` ON — appears in mobile "More" menu
5. Freeze the card on mobile: "Student lost their card. One tap to freeze — no branch visit, no phone call"

This demonstrates cross-platform feature management from a single control plane.

---

*Document version: March 2026. For questions or updates, contact the demo engineering team.*

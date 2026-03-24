# HiveAir Airline Demo — Talk Track & Demand Gen Playbook

> **Audience:** Agency partners, field marketing, demand gen teams
> **Demo application:** HiveAir Airlines Passenger Portal (CloudBees Feature Management)
> **Last updated:** March 2026

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Demo Overview](#demo-overview)
3. [Feature Flags at a Glance](#feature-flags-at-a-glance)
4. [The Three Core Narratives](#the-three-core-narratives)
5. [Persona Alignment](#persona-alignment)
6. [Recommended Demo Flow (5 Minutes)](#recommended-demo-flow-5-minutes)
7. [Recommended Demo Flow (15 Minutes)](#recommended-demo-flow-15-minutes)
8. [Demand Gen Campaign Mapping](#demand-gen-campaign-mapping)
9. [Persona-Specific Outreach Angles](#persona-specific-outreach-angles)
10. [Objection Handling](#objection-handling)
11. [Appendix: Flag Reference](#appendix-flag-reference)

---

## Executive Summary

The HiveAir demo is a fully functional airline passenger portal that uses CloudBees Feature Management to control features, personalize experiences, and run campaigns — all without code deployments. It is designed to look and feel like a real airline application, not a "feature flags demo."

The demo tells one overarching story: **the business moves at the speed of decisions, not deployments.**

It supports five buyer personas (Engineering Manager, Release Manager, CTO, VP Software Delivery, CPO) and maps to three demand gen narratives: revenue agility, passenger personalization, and operational responsiveness.

---

## Demo Overview

### What the Audience Sees

- A branded airline portal ("HiveAir") with BeeMiles loyalty program
- Tabbed navigation: flights, bookings, loyalty, seat selection, lounge access
- Five selectable passenger personas with different loyalty tiers and properties
- Real-time feature changes when flags are toggled in CloudBees — no page refresh

### What Makes It Compelling

- Features appear and disappear in real time based on flag state
- Switching passenger personas shows different experiences (targeting)
- Seasonal themes transform the entire site with a single toggle
- Every flag maps to a clear business outcome (revenue, CX, operations)

### Passenger Personas Available

| Persona | Tier | Key Trait | Demo Role |
|---------|------|-----------|-----------|
| **Emma Economy** | Basic BeeMiles | Leisure traveler, no credit card | Baseline experience — shows what standard passengers see |
| **Bryan Business** | Gold BeeMiles | Corporate traveler, has credit card | Premium experience — lounge, priority, referral promo |
| **Olivia Elite** | Diamond BeeMiles | First Class, HiveAir Lounge Ambassador | Full-featured experience — everything enabled |
| **Drew Beta** | Silver BeeMiles | Beta tester | Testing & progressive rollout story |
| **Alex Staff** | HiveAir Employee | Internal staff, standby travel | Employee-specific experience |

---

## Feature Flags at a Glance

### Boolean Flags (Toggle Features On/Off)

| Flag | What It Controls |
|------|-----------------|
| `enableSeatSelection` | Interactive seat map for choosing seats |
| `enableLoungeAccess` | HiveAir Lounge details and amenities section |
| `enablePriorityBoarding` | Priority boarding, fast-track security, premium baggage |
| `showFlightAlerts` | Real-time gate changes, delays, boarding notifications |
| `enableMobileCheckin` | Mobile check-in and digital boarding pass |
| `enableStPatricksDay` | Site-wide green theme with shamrock decorations |
| `enableMemorialDay` | Patriotic red/white/blue theme with military discount banner |

### String Flags (A/B Test Variants)

| Flag | Variants | What It Controls |
|------|----------|-----------------|
| `showCreditCardPromo` | `off` / `signup` / `referral` | Co-brand credit card promotion targeting |
| `dashboardLayout` | `classic` / `modern` / `compact` | Dashboard layout arrangement |
| `flightDisplayMode` | `timeline` / `card` / `list` | How upcoming flights are displayed |
| `upgradePromptStyle` | `subtle` / `prominent` / `modal` | Cabin upgrade offer presentation |

### Number Flags (Runtime Configuration)

| Flag | Options | What It Controls |
|------|---------|-----------------|
| `recentBookingsToShow` | 2 / 3 / 5 / 8 | Number of upcoming flights on dashboard |
| `flightStatusRefreshInterval` | 30s / 60s / 120s / 300s | How often flight status updates |
| `loyaltyPointsMultiplier` | 1x / 1.5x / 2x / 3x | Bonus BeeMiles earning rate |

---

## The Three Core Narratives

Every flag in this demo maps to one of three stories. Choose which narrative to lead with based on your audience.

### Narrative 1: "Instant Campaigns, Zero Deploys" — Revenue & Marketing Agility

**The problem:** Marketing and revenue teams depend on engineering release cycles for every promotion, campaign change, and A/B test. Campaigns miss windows. Engineering burns cycles on non-engineering work.

**The flags that tell this story:**

| Flag | Demo Moment |
|------|-------------|
| `showCreditCardPromo` | Log in as Emma Economy (no credit card) — she sees "Apply for the HiveAir Card — 20% off award travel." Switch to Bryan Business (has credit card) — he sees "Refer a friend, earn 100k BeeMiles." Change the flag to `off` — promo disappears for everyone. No deploy. No rollback. |
| `loyaltyPointsMultiplier` | Flip from 1x to 3x. "Triple BeeMiles weekend. Marketing launched it in 5 seconds. Monday morning, back to 1x." |
| `upgradePromptStyle` | Flip between `subtle`, `prominent`, and `modal`. "Which upgrade prompt drives more Comfort+ purchases? Test it, don't debate it." |

**Key talking point:** "Your co-brand card team, loyalty program, and ancillary revenue managers shouldn't need a Jira ticket to launch a promotion."

**Why `showCreditCardPromo` is the strongest flag in the demo:**
- Three distinct variants with clear business logic (acquisition vs. retention vs. off)
- Direct line to measurable revenue (co-brand card sign-ups, referral conversions)
- Persona switching makes targeting immediately visible
- Kill switch to `off` demonstrates instant campaign control

---

### Narrative 2: "Personalized Experiences at Scale" — Passenger Segmentation & Loyalty

**The problem:** Every passenger sees the same generic portal regardless of loyalty status, cabin class, or value to the airline. The digital experience doesn't reflect what the loyalty program promises.

**The flags that tell this story:**

| Flag | Demo Moment |
|------|-------------|
| `enableLoungeAccess` | Visible for Bryan Business and Olivia Elite. Hidden for Emma Economy. "Diamond members see lounge details. Economy passengers see a clean, uncluttered dashboard." |
| `enablePriorityBoarding` | Same targeting pattern. "Priority boarding, fast-track security, premium baggage — visible only to passengers who qualify." |
| `enableSeatSelection` | Toggle on for select tiers. "You're rolling out the new seat map. Start with Diamond, validate, expand to Gold, then everyone." |
| `recentBookingsToShow` | 3 for leisure travelers, 5 for road warriors. "Same product, different density." |

**The demo move that sells this narrative:**
1. Log in as Emma Economy — clean, simple dashboard. No lounge, no priority, no seat selector.
2. Switch to Olivia Elite — lounge access appears, priority services appear, seat selection unlocks, more trips visible.
3. That contrast, in two clicks, is the entire value proposition.

**Key talking point:** "You invested millions in your loyalty program. Feature Management makes the digital experience match the promise."

---

### Narrative 3: "Moments That Matter" — Real-Time Operations & Seasonal Agility

**The problem:** Reacting to operational events (IROPS, weather, system issues) requires emergency deploys. Seasonal campaigns are multi-week projects for a single day of impact.

**The flags that tell this story:**

| Flag | Demo Moment |
|------|-------------|
| `enableStPatricksDay` | Toggle ON — the entire portal transforms to green with shamrock decorations. "One flag. Every color, every decoration, every banner. Today only. Tomorrow, one toggle and it's back." |
| `enableMemorialDay` | Same pattern, patriotic theme with military discount banner. "Memorial Day weekend campaign — enabled Friday, disabled Monday." |
| `showFlightAlerts` | Toggle ON mid-demo. "A winter storm is disrupting operations. Your IROPS team pushes gate changes and delay notifications to every passenger — instantly." |
| `flightStatusRefreshInterval` | Dial from 60s to 30s. "During irregular ops, passengers need real-time updates. During normal ops, dial it back to save API load and battery." |

**Why the seasonal themes are the strongest visual moment:**
- The entire site changes appearance with a single boolean toggle
- Non-technical stakeholders understand it immediately
- It photographs well for case studies, decks, and social content
- It demonstrates that Feature Management isn't just for developers — it's for the whole business

**Key talking point:** "Your IROPS response time should be measured in seconds, not sprint cycles."

---

## Persona Alignment

### Engineering Manager

**Cares about:** Team velocity, deployment risk, incident reduction, developer experience

**Fears:** Botched releases, weekend war rooms, feature rollbacks requiring hotfixes

| Lead Flag | Story |
|-----------|-------|
| `enableSeatSelection` | "Your team built the new seat map. Deploy dark, enable for 1% of passengers, watch error rates, ramp to 100%. If something breaks, disable in seconds — no rollback, no hotfix, no incident review." |
| `enableMobileCheckin` | "Mobile check-in ships on a tight deadline. Code merges Thursday, QA validates Friday, product enables Monday. Decouple deploy from release." |
| `showFlightAlerts` | "Flight alerts are spiking API errors. One toggle to suppress. Your team debugs calmly instead of in crisis mode." |

**Outreach hook:** "Your team ships code every day. How many of those deploys keep someone up at night?"

**Metric they respond to:** Reduced rollback frequency, fewer incident escalations, faster MTTR

---

### Release Manager

**Cares about:** Release coordination, change management, environment promotion, compliance/audit trails

**Fears:** Coordinating multiple teams for a release window, manual go/no-go calls, "who turned that on?" with no audit trail

| Lead Flag | Story |
|-----------|-------|
| `showCreditCardPromo` | "The co-brand card campaign involves marketing, legal, and engineering. Engineering deploys with the flag OFF. Legal approves the copy. Marketing enables it — on their timeline, with a full audit trail in CloudBees." |
| `enableStPatricksDay` / `enableMemorialDay` | "Seasonal campaigns used to require a release window. Now they're scheduled flag changes with approvals. Who enabled it, when, and for which segments — all tracked." |
| `enableLoungeAccess` + `enablePriorityBoarding` | "Rolling out to Diamond first, then Gold, then all. Each stage is a targeting rule — not a new deploy. Manage the rollout plan from CloudBees, not a spreadsheet." |

**Outreach hook:** "How many hours does your team spend coordinating release windows for changes that aren't actually code changes?"

**Metric they respond to:** Fewer release coordination meetings, decoupled deploy/release cycles, auditable change history

---

### CTO

**Cares about:** Technical strategy, platform reliability, build-vs-buy, engineering leverage

**Fears:** Architectural fragility, vendor lock-in, teams moving too slowly for the business

| Lead Flag | Story |
|-----------|-------|
| `showCreditCardPromo` + `loyaltyPointsMultiplier` + `upgradePromptStyle` | "Marketing and revenue teams are filing Jira tickets for every promotion and campaign variant. Feature Management gives the business self-service over configuration — and gives your engineers their time back." |
| `enableSeatSelection` | "You're modernizing from a monolith to microservices. Feature flags let you ship incremental changes behind toggles, migrate traffic gradually, and roll back without redeploying." |
| `flightStatusRefreshInterval` | "Runtime configuration managed as a feature flag — not buried in a config file. Ops adjusts API polling frequency without a deploy. That's operational leverage." |

**Outreach hook:** "Your engineers are the most expensive people in the building. How much of their time is spent on things that aren't actually engineering?"

**Metric they respond to:** Engineering hours reclaimed, deployment frequency increase, platform reliability

---

### VP Software Delivery

**Cares about:** DORA metrics, delivery throughput, cycle time, organizational scaling

**Fears:** Slow delivery pipelines, high change failure rates, inability to measure improvement

| Lead Flag | Story |
|-----------|-------|
| `enableSeatSelection` + `enableMobileCheckin` | "Deployment frequency goes up because teams stop batching changes into risky mega-releases. Every feature ships behind a flag. Deploys become boring — which is exactly what you want." |
| `showFlightAlerts` + `enableSeatSelection` (kill switch) | "Change failure rate drops because 'failure' no longer means 'rollback.' It means 'disable the flag.' MTTR goes from hours to seconds." |
| `enableStPatricksDay` | "This entire theme shipped as a single flag. Deployed last week. Enabled today. That's the separation of deploy and release that drives elite delivery performance." |

**Outreach hook:** "What would your DORA metrics look like if every release had a built-in kill switch and every rollback took 5 seconds?"

**Metric they respond to:** Deployment frequency, change failure rate, MTTR, lead time for changes

---

### CPO (Chief Product Officer)

**Cares about:** Customer experience, experimentation velocity, data-driven decisions, time to value

**Fears:** Shipping the wrong thing, inability to experiment fast enough, one-size-fits-all experiences

| Lead Flag | Story |
|-----------|-------|
| `upgradePromptStyle` | "Your product team has a hypothesis: a full-screen upgrade comparison converts better than a banner. Instead of debating, test `subtle` vs. `prominent` vs. `modal` with real passengers. Data decides, not opinions." |
| `enableLoungeAccess` + `enablePriorityBoarding` + `recentBookingsToShow` | "Emma Economy and Olivia Elite use the same product but have completely different needs. One codebase, personalized experience." |
| `showCreditCardPromo` | "Sign-up offer vs. referral bonus — which drives more co-brand card revenue? Run both variants simultaneously, read the results." |
| `loyaltyPointsMultiplier` | "Does 2x or 3x BeeMiles drive more bookings on the new SFO-NRT route? Run the experiment for two weeks, measure, decide — without touching the product backlog." |

**Outreach hook:** "How many product decisions at your company are made by data vs. by the loudest voice in the room?"

**Metric they respond to:** Experiment velocity, personalization coverage, feature adoption rates, conversion lift

---

## Recommended Demo Flow (5 Minutes)

Use this sequence when time is limited. It covers all three flag types, demonstrates persona targeting, and hits every buyer persona in the room.

| Step | Duration | Flag | Action | What You Say |
|------|----------|------|--------|-------------|
| 1 | 45s | `enableStPatricksDay` | Toggle ON | "One flag. The entire portal transforms. No deploy, no build, no PR. And tonight, we turn it off the same way." |
| 2 | 60s | `showCreditCardPromo` | Switch Emma to Bryan | "Emma sees a sign-up offer. Bryan sees a referral bonus. Same page, different message, targeted by customer data. Marketing controls this — not engineering." |
| 3 | 60s | `enableLoungeAccess` + `enablePriorityBoarding` | Switch Emma to Olivia | "Emma sees a clean dashboard. Olivia sees lounge access, priority boarding, premium services. The experience adapts to who the passenger is." |
| 4 | 45s | `loyaltyPointsMultiplier` | Flip 1x to 3x | "Triple BeeMiles weekend. Marketing launched it in 5 seconds. Monday morning, back to 1x. No sprint, no ticket, no meeting." |
| 5 | 30s | `upgradePromptStyle` | Flip `subtle` to `modal` | "Which upgrade prompt converts better? Don't guess — test it with real passengers." |

**Closing line:** "Everything you just saw happened without a single code deployment. The business moves at the speed of decisions, not deployments."

---

## Recommended Demo Flow (15 Minutes)

Use this for deeper engagements where you can walk through targeting rules and discuss architecture.

| Step | Duration | Flag(s) | Action | Narrative |
|------|----------|---------|--------|-----------|
| 1 | 1m | `enableStPatricksDay` | Toggle ON in CloudBees | **Open with the wow.** "Today is St. Patrick's Day. Watch what happens when I flip one flag." Let the visual land. |
| 2 | 2m | Persona walkthrough | Log in as each persona | **Establish the cast.** Walk through Emma, Bryan, and Olivia. Explain their loyalty tiers and properties. Set up the targeting story. |
| 3 | 2m | `showCreditCardPromo` | Toggle variants, switch personas | **Revenue story.** Show `signup` for Emma, `referral` for Bryan, `off` for kill switch. Explain targeting rules. |
| 4 | 2m | `enableLoungeAccess` + `enablePriorityBoarding` + `enableSeatSelection` | Toggle all three, switch personas | **Personalization story.** Build up Olivia's experience piece by piece. Each toggle adds a section. |
| 5 | 1.5m | `loyaltyPointsMultiplier` | Flip 1x to 2x to 3x | **Promotion story.** "Double miles weekend. Actually, let's make it triple. Done." |
| 6 | 1.5m | `upgradePromptStyle` | Cycle through all three variants | **Experimentation story.** Show subtle, prominent, modal. Discuss which might convert better and how you'd measure it. |
| 7 | 1.5m | `showFlightAlerts` + `flightStatusRefreshInterval` | Toggle alerts ON, change interval | **Operations story.** "Winter storm. IROPS. Passengers need real-time updates now." |
| 8 | 1m | `dashboardLayout` | Flip classic to modern to compact | **UX optimization story.** "A/B test your next redesign before committing." |
| 9 | 1.5m | `recentBookingsToShow` | Change from 3 to 8 | **Configuration story.** "Power users need density. Casual travelers need simplicity. One flag." |
| 10 | 1m | Wrap-up | Turn off St. Patrick's Day theme | **Close the loop.** "The holiday is over. One toggle. Back to normal. No deploy tomorrow either." |

---

## Demand Gen Campaign Mapping

Use this table to align email campaigns, ad copy, and content assets to specific flag stories.

| Campaign Theme | Lead Flag | Supporting Flags | Subject Line Angle | Target Personas |
|---|---|---|---|---|
| **Ancillary Revenue** | `showCreditCardPromo` | `upgradePromptStyle`, `loyaltyPointsMultiplier` | "Your co-brand card team shouldn't need a sprint to launch a promotion" | CPO, CTO |
| **Passenger Experience** | `enableLoungeAccess` | `enablePriorityBoarding`, `enableSeatSelection`, `recentBookingsToShow` | "Diamond members and economy passengers shouldn't see the same portal" | CPO, Engineering Manager |
| **Operational Agility** | `showFlightAlerts` | `flightStatusRefreshInterval` | "When IROPS hits, your response time is measured in seconds — not release cycles" | VP Software Delivery, Engineering Manager |
| **Brand & Seasonal** | `enableStPatricksDay` | `enableMemorialDay` | "What if your next seasonal campaign was a toggle, not a project?" | Release Manager, CTO |
| **Speed to Market** | `enableSeatSelection` | `enableMobileCheckin` | "Roll out your new seat map to 1% of passengers before you commit to 100%" | Engineering Manager, VP Software Delivery |
| **Experimentation** | `upgradePromptStyle` | `dashboardLayout`, `flightDisplayMode` | "Stop guessing what your passengers want. Test it." | CPO |
| **DORA Metrics** | `enableSeatSelection` | `showFlightAlerts` (kill switch) | "What would your DORA metrics look like if every rollback took 5 seconds?" | VP Software Delivery |

---

## Persona-Specific Outreach Angles

### One-Liner Hooks (for Email Subject Lines or Ad Copy)

| Persona | Hook |
|---------|------|
| Engineering Manager | "Your team ships code every day. How many of those deploys keep someone up at night?" |
| Release Manager | "How many hours does your team spend coordinating release windows for changes that aren't code changes?" |
| CTO | "Your engineers are the most expensive people in the building. How much of their time is spent on things that aren't engineering?" |
| VP Software Delivery | "What would your DORA metrics look like if every release had a kill switch and every rollback took 5 seconds?" |
| CPO | "How many product decisions at your company are made by data vs. by the loudest voice in the room?" |

### Expanded Value Propositions (for Landing Pages or One-Pagers)

**Engineering Manager:**
Feature Management decouples deployment from release. Your team ships code continuously behind feature flags, validates with a subset of users, and rolls back in seconds — not hours. No more batching risky changes into mega-releases. No more weekend war rooms.

**Release Manager:**
Feature Management replaces release coordination spreadsheets with auditable, self-service flag controls. Marketing enables their campaign. Legal approves their copy. Engineering deploys their code. Each team operates on their own timeline, with every change tracked — who, when, what, and for whom.

**CTO:**
Feature Management gives your business teams self-service over the configuration layer — promotions, campaigns, feature rollouts, A/B tests — without consuming engineering cycles. Your engineers stop being ticket-takers for marketing and start building platform capabilities.

**VP Software Delivery:**
Feature Management directly improves your four DORA metrics. Deployment frequency increases because deploys are decoupled from releases. Change failure rate decreases because every feature has a kill switch. MTTR drops from hours to seconds. Lead time shrinks because features ship incrementally behind flags.

**CPO:**
Feature Management turns your product team into an experimentation engine. Test three upgrade prompt variants with real passengers. Personalize the experience by loyalty tier. Run a triple-miles promotion for two weeks and measure the impact. Every decision is backed by data, not debate.

---

## Objection Handling

| Objection | Response | Demo Proof Point |
|-----------|----------|-----------------|
| "We already have feature flags in our codebase" | "Homegrown flags give you toggles. CloudBees gives you targeting, audit trails, scheduled rollouts, and self-service for non-engineers. Your co-brand card team can't use a JSON config file." | Show `showCreditCardPromo` targeting rules in CloudBees UI |
| "This is just for developers" | "Watch this." Toggle `enableStPatricksDay`. "A brand manager did that. No code. No CLI. No deploy." | Seasonal theme toggle |
| "We use LaunchDarkly / Split / etc." | Focus on the CloudBees platform story — Feature Management integrated with CI/CD, release orchestration, and compliance in one platform. Don't lead with flag-vs-flag. | Show how flags connect to the broader CloudBees delivery pipeline |
| "Feature flags add technical debt" | "Flags are temporary by design. CloudBees tracks flag lifecycle — creation, usage, staleness. You get cleanup alerts, not forgotten toggles." | Show flag management dashboard in CloudBees UI |
| "We don't have the engineering bandwidth to implement this" | "The SDK integration is a few lines of code. The value is immediate — your first flag can be a promotional banner that marketing controls. Start small, expand as you see ROI." | Show the simplicity of `loyaltyPointsMultiplier` — one line of code, instant business value |
| "How is this different from A/B testing tools like Optimizely?" | "A/B testing tools optimize content. Feature Management controls the entire feature lifecycle — rollout, targeting, kill switch, configuration. The upgrade prompt A/B test is one use case. The IROPS kill switch is another. Same platform." | Show `upgradePromptStyle` (experimentation) followed by `showFlightAlerts` (operational) |

---

## Appendix: Flag Reference

### Complete Flag Inventory

| Flag Name | Type | Default | Variants/Options | Primary Narrative |
|-----------|------|---------|-------------------|-------------------|
| `enableSeatSelection` | Boolean | `false` | — | Personalization, Speed to Market |
| `enableLoungeAccess` | Boolean | `false` | — | Personalization |
| `enablePriorityBoarding` | Boolean | `false` | — | Personalization |
| `showFlightAlerts` | Boolean | `true` | — | Operations |
| `enableMobileCheckin` | Boolean | `true` | — | Speed to Market |
| `enableStPatricksDay` | Boolean | `false` | — | Seasonal / Brand |
| `enableMemorialDay` | Boolean | `false` | — | Seasonal / Brand |
| `showCreditCardPromo` | String | `signup` | `off`, `signup`, `referral` | Revenue |
| `dashboardLayout` | String | `modern` | `classic`, `modern`, `compact` | Experimentation |
| `flightDisplayMode` | String | `timeline` | `timeline`, `card`, `list` | Experimentation |
| `upgradePromptStyle` | String | `prominent` | `subtle`, `prominent`, `modal` | Revenue, Experimentation |
| `recentBookingsToShow` | Number | `3` | 2, 3, 5, 8 | Personalization |
| `flightStatusRefreshInterval` | Number | `60` | 30, 60, 120, 300 | Operations |
| `loyaltyPointsMultiplier` | Number | `1` | 1, 1.5, 2, 3 | Revenue |

### Persona-to-Flag Quick Reference

| Flag | Eng. Manager | Release Manager | CTO | VP Delivery | CPO |
|------|:---:|:---:|:---:|:---:|:---:|
| `enableSeatSelection` | **Lead** | | Secondary | **Lead** | |
| `enableLoungeAccess` | | Secondary | | | **Lead** |
| `enablePriorityBoarding` | | Secondary | | | **Lead** |
| `showFlightAlerts` | Secondary | | | Secondary | |
| `enableMobileCheckin` | Secondary | | | | |
| `enableStPatricksDay` | | **Lead** | | Secondary | |
| `enableMemorialDay` | | Secondary | | | |
| `showCreditCardPromo` | | **Lead** | **Lead** | | Secondary |
| `dashboardLayout` | | | | | Secondary |
| `flightDisplayMode` | | | | | Secondary |
| `upgradePromptStyle` | | | Secondary | | **Lead** |
| `recentBookingsToShow` | | | | | Secondary |
| `flightStatusRefreshInterval` | | | Secondary | | |
| `loyaltyPointsMultiplier` | | | **Lead** | | Secondary |

---

*Generated for CloudBees demand generation. Adapt language and emphasis based on account context, industry vertical, and buyer stage.*

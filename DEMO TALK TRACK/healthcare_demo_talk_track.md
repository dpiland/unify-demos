# MedConnect Healthcare Demo — Talk Track

## Campaign Context

**Primary Champion:** Engineering Managers in healthcare IT
**Downstream Buyers:** CMIO/CTO, COO/VP Operations, CMO/VP Clinical, VP Digital Health
**Core Product:** CloudBees Feature Management
**Demo Application:** MedConnect Provider Portal (React-based healthcare dashboard)

---

## Overarching Narrative

**"Decouple deployment from release — ship every day, release on your terms."**

In healthcare, the cost of getting a release wrong isn't a bad review — it's patient safety. Engineering teams are caught between pressure to ship faster and the regulatory reality that every change carries clinical risk. Feature management resolves that tension: engineers deploy continuously, but the business controls when features go live, who sees them, and how quickly they roll back if something goes wrong.

---

## The Demo Application

MedConnect is a provider portal used by physicians, nurse practitioners, and residents. It uses CloudBees Feature Management to control which clinical features each provider sees based on their role, department, and experience level — all without code changes or redeployments.

### User Personas (Built Into the Demo)

| Persona | Role | Key Properties | What They See |
|---------|------|---------------|---------------|
| **Dr. Sarah Chen** | Primary Care Physician | Attending, can prescribe, telemedicine access | Full clinical toolset |
| **Dr. James Morton** | Orthopedic Surgeon | Attending, admin access, telemedicine access | Full toolset + admin views |
| **Maria Lopez, NP** | Nurse Practitioner | Can prescribe, telemedicine access, not attending | Most features, no AI summary |
| **Dr. Anil Patel** | Resident (PGY-2) | No prescribing, no telemedicine, no admin | Restricted experience |

---

## Recommended Demo Flow

### Step 1: Establish the Baseline

**Action:** Log in as Dr. Sarah Chen. All feature flags are OFF (default values).

**Talk track:**
> "This is MedConnect — a provider portal that physicians, NPs, and residents use every day. Right now you're looking at the baseline experience. It's stable, it's what's in production, and it works. But the clinical team has been building new capabilities — AI documentation, telemedicine, secure messaging — and the question is: how do we get those features to the right providers safely?"

**What's on screen:** Clean dashboard with patient list, schedule, lab results, and quality metrics. No advanced features visible.

---

### Step 2: Release an AI Feature — No Deploy Required

**Action:** Toggle `enableAIClinicalSummary` to ON in CloudBees.

**Talk track:**
> "The team just shipped an AI-powered clinical summary tool. It auto-generates visit notes, assessment plans, and follow-up recommendations. In a traditional release process, turning this on would mean a deploy, a change review board, a rollback plan. With feature management, I just turned it on. But here's the important part — look who sees it."

**What's on screen:** AI Clinical Summary panel appears with a purple "AI" tag. Shows generated visit notes for the current patient.

**Key point:** The feature appeared instantly. No page reload, no deployment, no release train.

---

### Step 3: Show Role-Based Targeting

**Action:** Switch persona to Dr. Anil Patel (resident).

**Talk track:**
> "Now I'm logged in as a second-year resident. Same application, same build artifact, same deployment. But the AI summary is gone. So are telemedicine, prescriptions, and secure messaging. The resident gets a focused, appropriate experience — and nobody wrote an if-statement for that. The targeting rules in CloudBees handle it. The engineering team built the feature once. Who sees it is a configuration decision, not a code decision."

**What's on screen:** Stripped-down dashboard. AI summary, telemedicine, prescriptions, and Messages tab are all absent. Patient list and schedule remain.

**Key point for EMs:** "Your team builds the feature. Targeting decides who gets it. That's less code to maintain, fewer tests to write, fewer edge cases to debug."

---

### Step 4: Instant Rollback — The 3-Second Kill Switch

**Action:** Switch back to Dr. Chen. Then toggle `enableAIClinicalSummary` to OFF.

**Talk track:**
> "Let's say compliance flags an issue with the AI-generated notes — maybe it's hallucinating a medication, maybe there's a regulatory question. In a traditional setup, that's a hotfix branch, a code review, a CI pipeline, a staging deploy, a sign-off, and a production deploy. Call it four hours on a good day. With feature management, I just turned it off. Three seconds. Every provider, globally. The code is still deployed — nothing changed in the build. We just stopped showing it. When compliance clears it, we turn it back on. Same three seconds."

**What's on screen:** AI Clinical Summary panel disappears instantly.

**Key point:** The difference between a 3-second toggle and a 4-hour fire drill is the difference between a non-event and an incident.

---

### Step 5: A/B Test a Clinical Workflow

**Action:** Change `clinicalWorkflow` from `standard` to `streamlined`, then to `guided`.

**Talk track (streamlined):**
> "Now here's a different use of feature management — experimentation. Provider burnout from documentation is the number one reason physicians leave health systems. The product team wants to test whether a streamlined workflow — with smart defaults and auto-populated fields — reduces documentation time. I didn't build a test harness. I changed a string value."

**What's on screen:** Blue banner appears: "Streamlined Workflow Active — Smart defaults enabled, fields auto-populate from patient history."

**Talk track (guided):**
> "And for residents or newly onboarded providers, there's a guided workflow with a step-by-step encounter checklist. Same feature, different variant, targeted to the people who need structure. Product can measure which workflow performs best — and the engineering team didn't build three separate UIs. They built one UI that responds to a configuration value."

**What's on screen:** Encounter Checklist Steps component appears (Review Chart > Chief Complaint > Examination > Assessment > Plan & Orders > Sign Note).

**Key point:** A/B testing clinical workflows is a C-suite question ("which workflow reduces burnout?") answered without engineering sprints.

---

### Step 6: Operational Agility — Real-Time Capacity Management

**Action:** Change `maxConcurrentTelehealthSessions` from 2 to 5.

**Talk track:**
> "Last example — and this one is for the operations leaders. It's flu season, telehealth demand just spiked. The COO needs every provider running more concurrent virtual visits. In the old world, that's an infrastructure ticket, a config change, a deploy. Here, I changed a number. Every provider's telehealth capacity just went from two concurrent sessions to five. When the surge passes, dial it back. No ticket, no deploy, no engineer pulled off their sprint."

**What's on screen:** Telemedicine panel shows updated session capacity.

**Key point:** Feature flags aren't just on/off switches. Number flags give operational teams real-time knobs without engineering tickets.

---

## Flags Reference — What to Show and Why

### Tier 1: Must-Show (Core Demo)

| Flag | Type | Story | Buyer It Resonates With |
|------|------|-------|------------------------|
| `enableAIClinicalSummary` | Boolean | Safe AI rollout with role-based targeting and instant rollback | EM (release safety), CMIO (compliance) |
| `clinicalWorkflow` | String | A/B test documentation workflows to reduce burnout | EM (no test harness), CMO (burnout metrics) |
| `maxConcurrentTelehealthSessions` | Number | Real-time capacity management without deploys | EM (fewer interrupts), COO (operational agility) |

### Tier 2: Strong Supporting Flags

| Flag | Type | Story | Buyer It Resonates With |
|------|------|-------|------------------------|
| `enablePatientMessaging` | Boolean | Compliance-gated rollout; Messages tab disappears for residents | EM (governance without code), CMIO (HIPAA) |
| `showPatientInsights` + `riskScoreThreshold` | Boolean + Number | Tunable clinical sensitivity by department | VP Digital (configurable experiences) |
| `enableTelemedicine` | Boolean | Double-gated with user property `hasTelemedicineAccess` | EM (targeting replaces code branching) |

### Tier 3: Nice-to-Have (If Time Allows)

| Flag | Type | Story |
|------|------|-------|
| `patientChartView` | String | Switch patient list between table, card, and compact views |
| `appointmentViewMode` | String | Switch scheduling view between calendar, list, and timeline |
| `qualityDashboardView` | String | Admin vs. clinician quality metrics views |
| `enablePatientIntake` | Boolean | Digital intake workflow replacing paper forms |
| `enableNotificationCenter` + `notificationDisplayCount` | Boolean + Number | Alert fatigue management — "how many notifications before fatigue sets in?" |

---

## Persona Switching — The Visual Proof

The most powerful demo moment is switching personas. Each switch visually proves that feature management delivers different experiences from the same codebase.

### Dr. Sarah Chen (PCP) vs. Dr. Anil Patel (Resident)

| Feature | Dr. Chen | Dr. Patel |
|---------|----------|-----------|
| AI Clinical Summary | Visible | Hidden |
| Telemedicine | Visible | Hidden |
| Prescriptions | Visible | Hidden |
| Messages Tab | Visible | Hidden |
| Care Plans | Visible | Visible |
| Patient List | Full | Full |
| Guided Workflow | Off (experienced) | Could be targeted ON |

**One sentence:** "Same app. Same deploy. Completely different experience. Zero code branching."

---

## Messaging by Buyer Persona

Use these talking points when the EM champions the tool internally.

### To the CMIO / CTO
> "Feature management gives us compliance-gated releases. Nothing goes live without explicit activation. AI features are restricted to senior attendings by targeting rules — not by code that could have bugs. And if anything goes wrong, we kill it in seconds, not hours."

### To the COO / VP Operations
> "We can adjust telehealth capacity, notification density, and clinical thresholds in real-time — no engineering ticket, no deploy window. When flu season hits or a new mandate drops, we respond in minutes."

### To the CMO / VP Clinical
> "We can A/B test clinical workflows — standard vs. streamlined vs. guided — and measure which one actually reduces documentation time. That's burnout reduction driven by data, not guesswork."

### To the VP Digital Health
> "Every department, every role, every care setting can have a tailored experience — configured, not coded. Primary care sees one workflow. The ED sees another. Residents get guardrails. All from one codebase."

### To the Engineering Manager (The Champion)
> "My team ships code when it's ready. The business releases features when they're ready. Those are two different decisions and they should happen on two different timelines. Feature management makes that possible. My engineers build features instead of managing releases. Stakeholders get control without filing tickets. And when something needs to come down, it's a toggle — not a war room."

---

## Objection Handling

### "We already use environment variables / config files."
> "Config files require a redeploy to change. Feature flags are runtime — change takes effect in seconds, with targeting rules, percentage rollouts, and instant rollback. You also get audit trails and approval workflows built in."

### "This adds complexity to the codebase."
> "It actually removes complexity. Without feature management, teams build role-checking logic, A/B test harnesses, and environment-specific branching into application code. Feature flags replace all of that with a single hook call and a configuration decision."

### "We can't put patient safety behind a flag."
> "You're already putting it behind a deploy. A flag gives you more control, not less. You get targeting (only senior physicians see high-risk features), instant rollback (seconds vs. hours), and audit trails (who turned what on, when). That's strictly safer than a deployment-coupled release."

### "Our change review board won't approve this."
> "Feature management actually strengthens change governance. Every flag change is audited. You can require approvals before activation. And the blast radius of any change is controlled by targeting — you're not releasing to everyone at once."

---

## Campaign Tagline Options

- **"Your engineers should be building features, not managing releases."**
- "In healthcare, move fast and break nothing."
- "Deploy continuously. Release selectively. Roll back instantly."
- "The distance between 'code complete' and 'patient-facing' should be a decision, not a deployment."
- "Ship AI safely. Scale telehealth instantly. Test workflows without sprints."

---

## Technical Notes for Agency

- The demo runs locally or can be deployed to any static hosting
- All data is synthetic — no real patient information
- Persona switching is built into the app (dropdown in the header)
- Feature flags connect to CloudBees Feature Management via SDK key in `.env`
- Flags can be toggled live in the CloudBees Unify UI during the demo
- No backend required — all flag evaluation happens client-side
- The app works with default values even without a CloudBees connection (flags default to OFF)

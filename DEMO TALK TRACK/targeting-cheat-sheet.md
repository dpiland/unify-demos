# Horizon Bank: CloudBees Targeting Configuration Cheat Sheet

This guide shows how to configure targeting rules in CloudBees Feature Management so that **switching personas creates a visually dramatic, instant transformation** of the app.

---

## Quick Reference: Persona-to-Flag Matrix

| Flag | Jamie (Student) | Pat (Mortgage) | Morgan (Premier) | Alex (Standard) | Dana (Admin) |
|------|:---:|:---:|:---:|:---:|:---:|
| `showStudentLoans` | ON | off | off | off | ON |
| `showMortgageAccount` | off | ON | ON | off | ON |
| `showInvestmentPortfolio` | off | off | ON | off | ON |
| `showFraudAlerts` | off | off | ON | off | ON |
| `enableInstantTransfers` | off | off | ON | off | ON |
| `promotionalBanner` | savings-bonus | mortgage-refi | travel-rewards | none | none |
| `enableChatSupport` | off | ON | ON | off | ON |
| `dashboardLayout` | classic | classic | modern | classic | modern |
| `recentTransactionsToShow` | 5 | 10 | 25 | 10 | 50 |
| `welcomeExperience` | student-focused | homeowner | wealth-management | standard | standard |
| `enableSmartBudgetInsights` | ON | ON | ON | ON | ON |
| `enableRedesignedAccountCards` | off | off | ON | off | off |
| `enableRewardsRedemption` | off | off | ON | ON | ON |
| `systemAlert` | none | none | none | none | none |
| `dailyTransferLimit` | 2500 | 5000 | 25000 | 2500 | 25000 |
| `showCreditScore` | off | off | ON | off | ON |
| `themeMode` | light | light | light | light | light |

---

## Targeting Rules to Create in CloudBees

### Boolean Flags

**1. `showStudentLoans`**
- Default: `false`
- Rule: `true` when `isStudent == true`

**2. `showMortgageAccount`**
- Default: `false`
- Rule: `true` when `hasMortgage == true` OR `customerSegment == "financial-planning"`

**3. `showInvestmentPortfolio`**
- Default: `false`
- Rule: `true` when `hasInvestmentAccount == true`

**4. `showFraudAlerts`**
- Default: `false`
- Rule: `true` when `accountBalance > 50000`

**5. `enableInstantTransfers`**
- Default: `false`
- Rule: `true` when `isPremiumCustomer == true`

**6. `enableChatSupport`**
- Default: `false`
- Rule: `true` when `userTier == "premier"` OR `hasMortgage == true`

**7. `enableSmartBudgetInsights`** (Kill Switch Demo)
- Default: `true` (enable for everyone initially)
- Demo action: Toggle OFF live to demonstrate instant kill switch

**8. `enableRedesignedAccountCards`** (A/B Test Demo)
- Default: `false`
- Rule: `true` when `isPremiumCustomer == true` (or use % rollout)
- Demo action: Toggle ON/OFF to show both card variants

**9. `enableRewardsRedemption`** (Regional Rollout Demo)
- Default: `false`
- Rule: `true` when `region == "us-west"`

**10. `showCreditScore`** (Entitlement Gating Demo)
- Default: `false`
- Rule: `true` when `isPremiumCustomer == true`
- Flag ON: Full credit score dashboard with score, factors, and tips
- Flag OFF: Upsell card prompting upgrade to Premier

### String Flags

**10. `promotionalBanner`**
- Default: `none`
- Rules (evaluated in order):
  1. `savings-bonus` when `isStudent == true`
  2. `mortgage-refi` when `hasMortgage == true`
  3. `travel-rewards` when `isPremiumCustomer == true`
  4. `none` (default)

**11. `dashboardLayout`**
- Default: `classic`
- Rule: `modern` when `isPremiumCustomer == true`

**12. `systemAlert`** (Ops/Incident Demo)
- Default: `none`
- Set globally (no targeting — all users see ops alerts)
- Values: `maintenance-scheduled`, `zelle-degraded`, `rate-limit-active`
- Demo action: Flip to any value to show instant incident communication

**13. `themeMode`** (Accessibility/Dark Mode Demo)
- Default: `light`
- Rule: `dark` when `isBetaTester == true` (beta rollout)
- Values: `light`, `dark`, `high-contrast`
- Demo action: Switch to show entire app theme transformation

**14. `welcomeExperience`**
- Default: `standard`
- Rules (evaluated in order):
  1. `student-focused` when `isStudent == true`
  2. `wealth-management` when `isPremiumCustomer == true` AND `hasInvestmentAccount == true`
  3. `homeowner` when `hasMortgage == true`
  4. `standard` (default)

### Number Flags

**16. `recentTransactionsToShow`**
- Default: `10`
- Rules:
  1. `25` when `isPremiumCustomer == true`
  2. `5` when `isStudent == true`

**17. `dailyTransferLimit`** (Business Rule Demo)
- Default: `2500`
- Rules:
  1. `25000` when `isPremiumCustomer == true`
  2. `5000` when `customerTenureMonths > 12`
  3. `2500` (default)

---

## Demo Scenarios

### Scenario 1: Persona-Based Personalization
**Story:** "Every customer gets a tailored experience based on who they are."

1. Log in as **Alex (Standard)** -- basic dashboard, no bells and whistles
2. Switch to **Jamie (Student)** -- student-focused welcome, student loans, savings goal, savings-bonus banner
3. Switch to **Morgan (Premier)** -- wealth management welcome, investment portfolio, modern layout, fraud alerts, redesigned cards, travel-rewards banner
4. Switch to **Pat (Mortgage)** -- homeowner welcome, mortgage account, refinance comparison, mortgage-refi banner

### Scenario 2: Kill Switch / Incident Response
**Story:** "We shipped a feature with a bug. Watch how fast we can disable it."

1. Show Smart Budget Insights card (enabled for all users)
2. "Reports are coming in that the AI is showing incorrect spending calculations"
3. In CloudBees: toggle `enableSmartBudgetInsights` to OFF
4. Card disappears instantly -- no deploy, no rollback, no downtime

### Scenario 3: A/B Testing
**Story:** "We're testing a redesigned account card with a subset of users."

1. Show classic card layout (default)
2. In CloudBees: toggle `enableRedesignedAccountCards` to ON
3. Cards switch to horizontal layout with gradient backgrounds and chip details
4. "We can shift the percentage of users who see each variant in real time"

### Scenario 4: Regional Rollout
**Story:** "We're launching rewards redemption market by market."

1. Log in as **Jamie (Student)** (us-east) -- go to Rewards page, see "Coming Soon" message
2. Switch to **Morgan (Premier)** (us-west) -- full redemption UI is available
3. "When we're confident, one click in CloudBees expands it to all regions"

### Scenario 5: Ops Incident Response
**Story:** "Ops detects a service issue. Every user sees the warning instantly."

1. Show the app in normal state (no alert banner)
2. "Ops just detected Zelle is experiencing degraded performance"
3. In CloudBees: set `systemAlert` to `zelle-degraded`
4. Red alert banner appears at the top of every page instantly
5. Issue resolved: set back to `none` — banner disappears

### Scenario 6: Business Rule Configuration
**Story:** "Compliance approved a higher transfer limit for premier customers."

1. Log in as **Alex (Standard)** — go to Transfer & Pay, see "$2,500 daily limit"
2. Switch to **Morgan (Premier)** — see "$25,000 daily limit"
3. "Compliance can adjust these limits in CloudBees without a code change or deploy"

### Scenario 7: Entitlement Gating
**Story:** "Premier customers get credit insights. Standard users see an upgrade prompt."

1. Log in as **Alex (Standard)** — scroll to see "Unlock Credit Score Insights" upsell card
2. Switch to **Morgan (Premier)** — see full credit score dashboard (782, score factors, tips)
3. "Same flag, two completely different experiences based on entitlement"

### Scenario 8: Dark Mode / Accessibility Rollout
**Story:** "We're rolling out dark mode to beta testers before general availability."

1. Show the app in light mode (default)
2. In CloudBees: set `themeMode` to `dark`
3. The entire app transforms — sidebar, header, content, cards all go dark
4. "We can also do high-contrast for accessibility compliance"
5. Set `themeMode` to `high-contrast` — bolder text, stronger borders

---

## Custom Properties Available for Targeting

These properties are set automatically when a user persona is selected:

### Boolean Properties
| Property | Description |
|----------|-------------|
| `isPremiumCustomer` | Premier/wealth management customer |
| `isBetaTester` | Enrolled in beta program |
| `isNewUser` | Recently created account |
| `hasInvestmentAccount` | Has brokerage/investment account |
| `isStudent` | Student banking segment |
| `hasMortgage` | Has mortgage with Horizon Bank |

### String Properties
| Property | Values | Description |
|----------|--------|-------------|
| `accountType` | checking, savings, premier, etc. | Primary account type |
| `customerSegment` | student, mortgage, financial-planning, checking-savings, admin | Customer segment |
| `userTier` | standard, premier, admin | Service tier |
| `region` | us-east, us-west | Geographic region |
| `userId` | (unique ID) | User identifier |

### Number Properties
| Property | Description |
|----------|-------------|
| `accountBalance` | Total account balance |
| `customerTenureMonths` | How long they've been a customer |
| `creditScore` | Credit score |
| `monthlyTransactions` | Average monthly transaction count |

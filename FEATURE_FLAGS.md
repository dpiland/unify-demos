# Horizon Bank - Feature Flags Reference

This document describes every feature flag available in the Horizon Bank application and how each one affects the user experience. All flags are managed through CloudBees Feature Management and can be toggled in real time without a code deployment.

---

## Boolean Flags

### `enableInstantTransfers`

**Page:** Transfer & Pay
**Default:** `false`
**Effect:** Controls whether the "Instant" transfer speed option is available when transferring money between accounts.

- **OFF:** Only the "Standard (1-3 business days)" transfer option is shown.
- **ON:** An additional "Instant" radio option appears with a lightning bolt icon and success styling, allowing immediate fund transfers.

**Targeting ideas:**
- Enable for premier customers with high balances
- Roll out by region or account tenure

---

### `showInvestmentPortfolio`

**Page:** Sidebar Navigation + Investments
**Default:** `false`
**Effect:** Controls visibility of the entire Investments section, including the sidebar navigation link.

- **OFF:** The "Investments" item is hidden from the sidebar. Navigating to `/investments` shows an upsell card encouraging the user to open an investment account.
- **ON:** The "Investments" nav item appears in the sidebar. The page displays a full portfolio view with holdings table, allocation breakdown (stocks vs bonds), daily performance, and market index summary cards.

**Targeting ideas:**
- Show for customers who have an investment account
- Enable for premier or high-net-worth tiers

---

### `showFraudAlerts`

**Page:** Account Summary
**Default:** `false`
**Effect:** Displays a prominent fraud detection alert banner at the top of the Account Summary page.

- **OFF:** No alert is shown.
- **ON:** A red alert banner appears warning of a suspicious transaction ($1,247.99 at Electronics Plus, Miami, FL at 2:47 AM). The user can respond with:
  - **"This wasn't me -- Lock Card"** — confirms fraud, locks the card, and shows a success message
  - **"Yes, this was me"** — dismisses the alert with a confirmation message

**Targeting ideas:**
- Toggle on during live demos for immediate visual impact
- Target high-value accounts (balance > $10,000) for monitoring

---

### `enableChatSupport`

**Page:** Global (all pages)
**Default:** `false`
**Effect:** Shows or hides a floating chat support widget in the bottom-right corner of the application.

- **OFF:** No chat widget is visible.
- **ON:** A floating chat button with a notification dot appears. Clicking it opens a support chat panel with:
  - A green "online" status indicator
  - Simulated agent responses that cycle through helpful banking messages
  - Text input with send button and Enter key support

**Targeting ideas:**
- Enable for premium customers first, then expand to all users
- Great for live demos — the widget appears/disappears instantly when toggled

---

## String Flags

### `dashboardLayout`

**Page:** Account Summary
**Default:** `"classic"`
**Options:** `classic`, `modern`, `compact`
**Effect:** Controls the visual arrangement and density of account cards and UI elements on the Account Summary page.

| Value | Behavior |
|-------|----------|
| `classic` | Two-column grid layout with standard-sized cards and comfortable spacing |
| `modern` | Full-width single-column layout with larger cards for a streamlined look |
| `compact` | Dense two-column layout with smaller cards, condensed spacing, and smaller buttons |

**Targeting ideas:**
- A/B test different layouts across user segments
- Set "modern" for 50% of new users, "classic" for existing users
- Use "compact" for users on smaller screens or mobile devices

---

### `promotionalBanner`

**Page:** Global (above the header on all pages)
**Default:** `"none"`
**Options:** `none`, `mortgage-refi`, `travel-rewards`, `savings-bonus`
**Effect:** Displays a targeted marketing banner across the top of the application. Each campaign has a unique gradient background, promotional message, and call-to-action button. Users can dismiss the banner for the current session.

| Value | Banner Content |
|-------|---------------|
| `none` | No banner displayed |
| `mortgage-refi` | "Refinance your mortgage -- rates as low as 5.25% APR. Save up to $250/month." (CTA: Check Rates) |
| `travel-rewards` | "Earn 5x points on travel this summer with your Active Cash card." (CTA: Learn More) |
| `savings-bonus` | "Open a Way2Save account with $25,000+ and earn a $200 bonus." (CTA: Open Account) |

**Targeting ideas:**
- Show `mortgage-refi` to customers with an existing mortgage account
- Show `savings-bonus` to new users during onboarding
- Show `travel-rewards` to credit card holders with high spend

---

## Number Flags

### `recentTransactionsToShow`

**Page:** Account Summary
**Default:** `10`
**Options:** `5`, `10`, `25`, `50`
**Effect:** Controls how many rows appear in the "Recent Activity" transaction table at the bottom of the Account Summary page.

| Value | Behavior |
|-------|----------|
| `5` | Minimal view — quick glance at recent activity |
| `10` | Default — balanced view for most users |
| `25` | Extended view — fewer clicks needed to find transactions |
| `50` | Full view — shows the complete transaction history on one page |

A label below the table reads: "Showing **{count}** of {total} transactions"

**Targeting ideas:**
- Show 50 for premier customers who want full visibility
- Show 5 for new users to keep the page simple
- A/B test performance impact of different page sizes

---

## Quick Reference

| Flag | Type | Default | Page | What It Controls |
|------|------|---------|------|-----------------|
| `enableInstantTransfers` | Boolean | `false` | Transfer & Pay | Instant transfer speed option |
| `showInvestmentPortfolio` | Boolean | `false` | Sidebar + Investments | Investment section visibility |
| `showFraudAlerts` | Boolean | `false` | Account Summary | Fraud detection alert banner |
| `enableChatSupport` | Boolean | `false` | Global | Floating chat support widget |
| `dashboardLayout` | String | `classic` | Account Summary | Card layout arrangement |
| `promotionalBanner` | String | `none` | Global | Top-of-page marketing banner |
| `recentTransactionsToShow` | Number | `10` | Account Summary | Transaction table row count |

---

## User Personas for Targeting

The app includes 4 built-in user personas with custom properties that can be used for flag targeting in CloudBees Unify:

| Persona | Tier | Key Properties |
|---------|------|---------------|
| Sarah Everyday | Standard | Basic checking, 12-month tenure, $12,458 balance |
| Marcus Premier | Premier | Premium accounts, 84-month tenure, $287,432 balance |
| Dev Tester | Beta | Beta tester flag enabled, 24-month tenure |
| Priya Newmember | New | New user flag enabled, 1-month tenure |

Switch between personas using the user dropdown in the top-right corner of the app to see how targeting rules change the experience for different customer segments.

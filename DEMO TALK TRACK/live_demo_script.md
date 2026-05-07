# Horizon Bank — Live Demo Script

**Duration:** 10-15 minutes
**Setup:** App running in browser, CloudBees Unify open in a second tab

---

## Preamble

"Today I want to show you how CloudBees Feature Management gives teams real-time control over what users see — without deploying code.

We've built a consumer banking app called Horizon Bank. It looks and feels like a real banking experience — accounts, transfers, mortgage tools, rewards — but under the hood, every major feature is controlled by feature flags.

What makes this powerful is that we can change the experience instantly — toggle features on or off, personalize what different customers see, and even shut down a broken feature in seconds. No code changes, no deployments, no waiting.

I'm going to walk you through four customer personas. Each one gets a completely different experience from the same application, the same codebase, the same deployment. The only thing that changes is the targeting rules in CloudBees.

Let's jump in."

---

## Act 1: Jamie College — The Student

**Log in as Jamie College.**

"Let's start with Jamie, a college student. Right away, notice how the experience is tailored to her. She sees checking and savings with modest balances — $5,000 and $10,000. There's a student-focused welcome banner with a savings goal tracker and financial wellness tips.

She has a student loan card showing her federal loan balance, monthly payment, and repayment progress. She can make payments, view her repayment plan, even explore forgiveness options — all from this one card.

Now notice what's NOT here. No credit card — students don't get one. No Rewards & Offers in the nav. No investment tools. No credit score dashboard. This is a simplified, focused experience designed for a student's needs.

If we go into Card Controls, her spending limits are capped — $2,000 per day max, $300 ATM limit. These aren't hardcoded — they're driven by the `isStudent` property in her profile, which CloudBees uses for targeting.

We didn't build a separate student app. This is the same app, same codebase. Feature flags and targeting rules shape the experience for her segment."

### Key things to point out:
- Student welcome banner with savings goal (61%)
- Student loan card with repayment progress (38% paid)
- No credit card in accounts
- No Rewards & Offers in sidebar
- Lower limits in Card Controls
- Recent activity dropdown — show 5, 10, or all transactions

---

## Act 2: Sarah Standard — Everyday Banking

**Switch to Sarah Standard.**

"Now let's switch to Sarah — your typical checking and savings customer. Immediately things change. She gets the standard welcome greeting, her credit card appears in the accounts, and Rewards & Offers is back in the nav.

She has higher balances, a credit card with available credit and minimum payment info, and the full Recent Activity table. The quick actions are all available — Transfer Money, Pay Bills, Deposit Check.

But notice what she still doesn't have. No credit score dashboard — instead she sees this upgrade prompt: 'Unlock Credit Score Insights — Upgrade to Premier Banking.' No Investments page in the nav. No mortgage section.

This is the baseline experience. Everything else gets layered on through targeting. If Sarah ever upgrades her tier, the features unlock automatically — no migration, no new app, just a flag change in CloudBees."

### Key things to point out:
- Standard greeting (no special welcome variant)
- Checking + savings + credit card accounts
- Rewards & Offers in nav (vs. hidden for student)
- Credit Score upsell card ("Upgrade to Premier")
- No Investments, no Mortgage in nav
- Transaction dropdown and "View All Transactions" link

---

## Act 3: Robert Homeowner — Mortgage Customer + Kill Switch

**Switch to Robert Homeowner.**

"Robert is a homeowner with a mortgage. Watch what changes — the welcome banner now shows his estimated home value, home equity, and a comparison of his current rate versus today's rates with a 'Explore Refinancing' call to action.

A new Mortgage tab appears in the sidebar. Let's click into it."

**Navigate to Mortgage page.**

"Here's his mortgage account overview — balance, monthly payment, interest rate, equity gauge. Below that is a full mortgage simulator with sliders for home price, down payment, and interest rates. He can compare 15-year versus 30-year terms side by side and see exactly how much interest he'd save. There's even an amortization schedule and a pre-qualification prompt.

All of this appeared because Robert's `customerSegment` is set to 'mortgage' — CloudBees sees that property and enables the mortgage flags automatically."

**Now the kill switch demo.**

"Now let me show you something that happens in the real world. Marketing just shipped a new promotional banner."

**Toggle `enableTopBanner` ON in CloudBees.**

"There it is at the top — 'Limited Time: Save X% on all Horizon Bank services.' But wait... look at that discount. It's climbing. 15%... 25%... 47%... 200%. That's a bug. The percentage is spiraling out of control and the banner is flashing colors.

In a traditional workflow, this is a fire drill. Someone has to find the bug, write a fix, get it reviewed, deploy it, and pray it doesn't break anything else. That's 30 minutes minimum, maybe hours.

With CloudBees, I just flip one switch."

**Toggle `enableTopBanner` OFF.**

"Gone. No deploy, no downtime, no customer impact beyond the few seconds it was visible. That's a kill switch. Every feature behind a flag has this safety net built in."

### Key things to point out:
- Homeowner welcome with equity and refinance CTA
- Mortgage page: account overview + simulator + amortization
- 15 vs 30-year term comparison with savings callout
- Kill switch: buggy banner ON -> chaos -> flag OFF -> instant fix

---

## Act 4: Victoria Premier — Wealth Management

**Switch to Victoria Premier.**

"Finally, Victoria — our premier client. This is where the experience really transforms. Look at the welcome section: portfolio value with today's change, market indices for S&P 500, NASDAQ, and DOW, and a 'Schedule Advisor Call' button.

The Credit Score section that was locked for Sarah? Victoria sees the full dashboard — her score of 782, score factors, and a '+12 points' improvement card. Same component, same flag — one controls the entitlement. Premier customers get it included; standard customers see an upgrade prompt.

Now let's look at Investments."

**Navigate to Investments page.**

"Victoria gets the full investment portfolio with holdings and performance data. But there's more — a crypto trading panel with Bitcoin, Ethereum, and Solana positions, and an Investment Advisory section with risk assessment, AI-driven recommendations, and an option to schedule a call with a financial advisor.

None of this exists for Sarah or Jamie. It all lights up because Victoria's profile has `isPremiumCustomer: true` and `hasInvestmentAccount: true` — CloudBees evaluates those properties and enables the right flags."

**Point out the chat widget (if enableChatSupport is on).**

"And notice the chat support widget in the bottom right — another premier perk. She can ask about transfers, investments, her mortgage — the bot routes her to the right page. If CSAT drops or the bot misbehaves, we kill it instantly with the same pattern we just saw."

### Key things to point out:
- Wealth management welcome with portfolio + market data
- Credit Score Insights dashboard (vs. upsell for Sarah)
- Investments page: portfolio + crypto + advisory panels
- Chat support widget (premier perk, hidden on mobile)
- Promotional banner targeting (travel-rewards for high-value)

---

## Closing

"Four customers. Four completely different experiences. Same application, same codebase, zero deploys.

Every change I made today was in CloudBees Feature Management — toggling flags, setting targeting rules based on customer properties. Product, marketing, ops, and engineering all have the controls they need without stepping on each other.

That's the power of feature management at scale: ship safely, release confidently, and personalize every experience — all from one platform."

---

## Quick Reference: Flags to Toggle Per Act

| Act | Persona | Key Flags |
|-----|---------|-----------|
| 1 | Jamie College | `showStudentLoans` ON, `welcomeExperience` = "student-focused" |
| 2 | Sarah Standard | `welcomeExperience` = "standard", `showCreditScore` OFF |
| 3 | Robert Homeowner | `showMortgageAccount` ON, `enableMortgageSimulator` ON, `welcomeExperience` = "homeowner", `enableTopBanner` ON then OFF |
| 4 | Victoria Premier | `showInvestmentPortfolio` ON, `enableCryptoTrading` ON, `enableInvestmentAdvisory` ON, `showCreditScore` ON, `welcomeExperience` = "wealth-management", `enableChatSupport` ON |

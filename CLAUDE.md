# Instructions for AI Agents (Claude)

This file contains instructions for AI assistants working with this codebase. If you're a human developer, see the `docs/` folder instead.

## What This Project Is

This is a **generic React dashboard template** designed to be easily customized into industry-specific demo applications. It uses CloudBees Feature Management (feature flags) under the hood to enable dynamic feature control.

**Key Principle:** The dashboard should look like a normal business application, NOT like a "feature flags demo". Feature flags are the mechanism, not the focus.

## Project Purpose

This serves as a **starting point** for building custom demos that showcase CloudBees Feature Management in real-world contexts:

- Retail/e-commerce applications
- Financial services dashboards
- Healthcare portals
- SaaS admin panels
- Manufacturing dashboards
- Any other industry-specific application

## Understanding the Code Structure

### Core Files (Read These First)

1. **`src/App.tsx`** - Main dashboard component
   - Generic business dashboard UI
   - Three examples of feature flag patterns (boolean, string, number)
   - Rich inline comments explaining patterns
   - This is what you'll customize most

2. **`src/lib/featureFlags.ts`** - Feature flag definitions
   - Currently has 3 generic flags
   - Replace these with use-case-specific flags
   - Extensive documentation on when to use each flag type

3. **`src/hooks/useFeatureFlag.ts`** - React hooks for accessing flags
   - `useFeatureFlag(key)` - Boolean flags
   - `useFeatureFlagString(key)` - String flags
   - `useFeatureFlagNumber(key)` - Number flags
   - Don't modify these, just use them

### Support Files

- **`src/lib/constants.ts`** - Flag descriptions and defaults
- **`src/contexts/FeatureFlagContext.tsx`** - React context provider
- **`src/theme/`** - Ant Design theme customization
- **`src/main.tsx`** - App entry point, initializes flags

## How Feature Flags Work Here

### Pattern 1: Boolean Flags (Toggle Visibility)

```typescript
// Define flag
enableNewFeature: new Rox.Flag()

// Use in component
const showFeature = useFeatureFlag('enableNewFeature');
return showFeature ? <NewFeature /> : null;
```

**Use cases:** Show/hide UI sections, enable/disable entire features

### Pattern 2: String Flags (A/B Testing)

```typescript
// Define flag
layoutVariant: new Rox.RoxString('grid', ['grid', 'list', 'table'])

// Use in component
const layout = useFeatureFlagString('layoutVariant');
switch (layout) {
  case 'grid': return <GridLayout />;
  case 'list': return <ListLayout />;
  case 'table': return <TableLayout />;
}
```

**Use cases:** Test different UI variants, layouts, styling options

### Pattern 3: Number Flags (Numeric Configuration)

```typescript
// Define flag
pageSize: new Rox.RoxNumber(10, [5, 10, 20, 50])

// Use in component
const size = useFeatureFlagNumber('pageSize');
const items = data.slice(0, size);
return <List items={items} />;
```

**Use cases:** Control page sizes, limits, refresh intervals, timeouts

### Pattern 4: Custom Properties for Targeting

Custom properties enable sophisticated user segmentation and targeting in CloudBees Unify UI. These properties allow you to create conditional rules like "enable feature X for premium customers in the US with account balance > $50k".

**Set custom properties during SDK initialization** in `src/lib/featureFlags.ts`:

```typescript
// In the initializeFeatureFlags function, before Rox.setup()

// Boolean Properties - true/false values
Rox.setCustomBooleanProperty('isPremiumCustomer', true);
Rox.setCustomBooleanProperty('isBetaTester', false);

// String Properties - text values for segmentation
Rox.setCustomStringProperty('accountType', 'premium'); // 'basic', 'premium', 'vip'
Rox.setCustomStringProperty('region', 'us-west'); // 'us-east', 'us-west', 'eu', 'asia'
Rox.setCustomStringProperty('userId', 'user-12345');

// Number Properties - numeric values for comparisons
Rox.setCustomNumberProperty('accountBalance', 62217);
Rox.setCustomNumberProperty('customerTenureMonths', 36);
```

**Use cases for Custom Properties:**

1. **User Segmentation** - Target features to specific customer types
   ```
   Show premium feature IF isPremiumCustomer == true
   ```

2. **Geographic Rollouts** - Launch features by region
   ```
   Enable new payment method IF region == "us-west"
   ```

3. **Value-Based Targeting** - Target high-value customers
   ```
   Enable VIP support IF accountBalance > 100000
   ```

4. **Tenure-Based Features** - Reward loyal customers
   ```
   Show loyalty rewards IF customerTenureMonths > 24
   ```

5. **Beta Testing** - Safely test with select users
   ```
   Show experimental feature IF isBetaTester == true
   ```

6. **Complex Rules** - Combine multiple properties
   ```
   Enable instant transfers IF:
     isPremiumCustomer == true
     AND accountBalance > 50000
     AND region != "high-risk-region"
   ```

**Important Notes:**

- Custom properties are set client-side but rules are evaluated server-side
- Properties can be dynamic functions that compute values at runtime
- Use meaningful property names that reflect your business domain
- Document what each property represents in your code comments

**Example with dynamic properties:**

```typescript
// Set properties dynamically based on application state
Rox.setCustomBooleanProperty('isPremiumCustomer', () => {
  return user.getCurrentUser()?.subscriptionTier === 'premium';
});

Rox.setCustomNumberProperty('accountBalance', () => {
  return accounts.getTotalBalance();
});
```

These properties become powerful when combined with CloudBees Unify's targeting UI, allowing you to create sophisticated rollout strategies without code changes.

## Customization Workflow

When asked to transform this dashboard into a specific use case, follow this workflow:

### Step 1: Understand the Use Case

Ask clarifying questions if needed:
- What industry is this for?
- What are the 3-5 key features to demonstrate?
- Which features should be controlled by flags and why?
- What user personas will use this?

### Step 2: Define New Flags

Update `src/lib/featureFlags.ts`:

```typescript
export const flags = {
  // Example for retail:
  enableExpressCheckout: new Rox.Flag(),
  showPromotionalBanner: new Rox.Flag(),
  productDisplayMode: new Rox.RoxString('grid', ['grid', 'list', 'compact']),
  productsPerPage: new Rox.RoxNumber(12, [6, 12, 24, 48]),
  enableRecommendations: new Rox.Flag(),
};
```

**Important:** Keep detailed comments explaining each flag's purpose.

### Step 3: Update Flag Descriptions

Update `src/lib/constants.ts`:

```typescript
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  enableExpressCheckout: 'Enable one-click express checkout for returning customers',
  showPromotionalBanner: 'Display promotional banner with current offers',
  productDisplayMode: 'Control how products are displayed (grid/list/compact)',
  productsPerPage: 'Number of products to show per page',
  enableRecommendations: 'Show personalized product recommendations',
};
```

### Step 4: Transform the Dashboard

Rewrite `src/App.tsx`:
- Replace generic content with industry-specific UI
- Keep the same Layout structure (Header, Content)
- Use the flag patterns appropriately
- Maintain rich inline comments
- Keep it looking like a real business app (NOT a "flags demo")

### Step 5: Create Custom Components

Add new components in `src/components/`:
- Industry-specific UI elements
- Each component can access flags via hooks
- Follow React best practices

### Step 6: Update Theme (Optional)

Customize `src/theme/tokens.ts` if needed:
- Brand colors
- Typography
- Spacing

## Example Transformations

### Example 1: Retail E-commerce

**Prompt:** "Transform this dashboard into a retail e-commerce application"

**Implementation:**

1. **Flags** (in `featureFlags.ts`):
```typescript
export const flags = {
  showPromoBanner: new Rox.Flag(),
  enableExpressCheckout: new Rox.Flag(),
  productDisplayMode: new Rox.RoxString('grid', ['grid', 'list', 'compact']),
  productsPerPage: new Rox.RoxNumber(12, [6, 12, 24, 48]),
  enableRecommendations: new Rox.Flag(),
};
```

2. **Dashboard** (in `App.tsx`):
- Header: "My Store" with shopping cart icon
- Banner: Promotional offers (controlled by `showPromoBanner`)
- Stats: Total products, active orders, revenue, conversion
- Product Grid: Display mode controlled by `productDisplayMode`, count by `productsPerPage`
- Checkout Section: Express checkout option controlled by `enableExpressCheckout`
- Recommendations: Controlled by `enableRecommendations`

3. **Components** (new files):
- `src/components/ProductCard.tsx`
- `src/components/ShoppingCart.tsx`
- `src/components/CheckoutButton.tsx`
- `src/components/PromoBanner.tsx`

### Example 2: Financial Services

**Prompt:** "Transform this dashboard into a financial trading platform"

**Implementation:**

1. **Flags**:
```typescript
export const flags = {
  enableAdvancedCharts: new Rox.Flag(),
  showRiskAnalysis: new Rox.Flag(),
  dashboardLayout: new Rox.RoxString('classic', ['classic', 'modern', 'compact']),
  refreshInterval: new Rox.RoxNumber(30, [10, 30, 60, 120]),
  enableMarketNews: new Rox.Flag(),
};
```

2. **Dashboard**:
- Header: "Trading Platform" with portfolio value
- Stats: Portfolio value, daily P&L, positions, margin
- Market Data: Real-time prices with refresh controlled by `refreshInterval`
- Charts: Advanced charting controlled by `enableAdvancedCharts`
- Risk Panel: Controlled by `showRiskAnalysis`
- Layout: Controlled by `dashboardLayout`

### Example 3: Healthcare Portal

**Prompt:** "Transform this dashboard into a patient portal"

**Implementation:**

1. **Flags**:
```typescript
export const flags = {
  enableTelemedicine: new Rox.Flag(),
  showHealthInsights: new Rox.Flag(),
  appointmentViewMode: new Rox.RoxString('calendar', ['calendar', 'list', 'timeline']),
  recentVisitsToShow: new Rox.RoxNumber(5, [3, 5, 10, 20]),
  enablePrescriptionRefills: new Rox.Flag(),
};
```

2. **Dashboard**:
- Header: "Patient Portal" with patient name
- Stats: Upcoming appointments, prescriptions, messages, health score
- Appointments: View mode controlled by `appointmentViewMode`
- Recent Visits: Count controlled by `recentVisitsToShow`
- Telemedicine: Video consultation option controlled by `enableTelemedicine`
- Health Insights: Controlled by `showHealthInsights`

## Best Practices

### ✅ DO

1. **Keep the app looking generic/professional**
   - Real business dashboard, not a "feature flags demo"
   - Remove any "Example" or "Demo" language from UI
   - Use real-world terminology for the industry

2. **Maintain rich inline comments**
   - Explain PATTERN, USE CASE, and EXAMPLE for each flag usage
   - Help future AI agents understand the code
   - Comments should explain "why" not just "what"

3. **Use TypeScript properly**
   - Type all props and state
   - Use the existing hooks with correct types
   - Let TypeScript autocomplete guide you

4. **Follow the existing patterns**
   - Boolean flags → conditional rendering
   - String flags → switch statements or conditional props
   - Number flags → array slicing or limits

5. **Keep components modular**
   - Small, focused components
   - Each component can access flags independently
   - Easy to understand and modify

### ❌ DON'T

1. **Don't make it look like a demo**
   - No "Feature Flags Demo" in the header
   - No "This shows how flags work" messaging in the UI
   - No tech-focused language visible to end users

2. **Don't modify core infrastructure**
   - Don't change hooks (`useFeatureFlag.ts`)
   - Don't modify context (`FeatureFlagContext.tsx`)
   - Don't change the SDK initialization logic
   - Just use what's there

3. **Don't hardcode flag names as strings**
   - Bad: `flags['myFlag'].isEnabled()`
   - Good: `useFeatureFlag('myFlag')`

4. **Don't use flags for security**
   - Flags are client-side visible
   - Don't hide sensitive features with flags alone
   - Always validate permissions server-side

5. **Don't create overly complex flag logic**
   - Keep it simple: if/else, switch, or slice
   - Avoid nested flag conditions when possible
   - One flag = one clear responsibility

## Code Patterns to Follow

### Pattern: Conditional Rendering

```typescript
// Boolean flag - show/hide entire sections
const showFeature = useFeatureFlag('featureName');

return (
  <div>
    {showFeature && <FeatureComponent />}
    <OtherContent />
  </div>
);
```

### Pattern: Conditional Props

```typescript
// String flag - change component behavior
const variant = useFeatureFlagString('componentVariant');

return (
  <Button
    type={variant}
    size="large"
  >
    Click Me
  </Button>
);
```

### Pattern: Data Slicing

```typescript
// Number flag - control data amount
const itemCount = useFeatureFlagNumber('itemsToDisplay');

return (
  <List
    dataSource={allData.slice(0, itemCount)}
    renderItem={item => <ListItem>{item}</ListItem>}
  />
);
```

### Pattern: Layout Switching

```typescript
// String flag - switch between different layouts
const layout = useFeatureFlagString('layoutMode');

switch (layout) {
  case 'grid':
    return <GridLayout items={items} />;
  case 'list':
    return <ListLayout items={items} />;
  case 'table':
    return <TableLayout items={items} />;
  default:
    return <GridLayout items={items} />;
}
```

## Common Customization Requests

### "Make it look more professional"

- Use Ant Design components consistently
- Add proper spacing and layout
- Use Cards, Statistics, and proper Grid system
- Keep color scheme professional (blues, greens, neutrals)

### "Add authentication/login"

- Create a `<LoginPage>` component
- Use a boolean flag `enableAuthentication` to toggle it
- Keep it simple (no real auth needed for demos)

### "Add more data/content"

- Create realistic sample data arrays
- Use industry-appropriate terminology
- Make it look real but keep it obviously fake data

### "Make it responsive"

- Use Ant Design's responsive Grid system (xs, sm, md, lg, xl)
- Already set up in the base template
- Just use `<Row>` and `<Col>` with responsive props

### "Add charts/graphs"

- Install recharts or another charting library
- Create chart components
- Control chart type or visibility with flags

## Testing Your Changes

Before presenting your work:

1. **Visual Check:**
   - Does it look like a real business app?
   - Is all "demo" or "example" language removed from UI?
   - Are flag controls invisible to end users?

2. **Code Quality:**
   - Are inline comments helpful and detailed?
   - Is TypeScript compiling without errors?
   - Are imports organized and clean?

3. **Flag Integration:**
   - Is each flag's purpose clear?
   - Are flag names descriptive?
   - Are all flags documented in `constants.ts`?

4. **Consistency:**
   - Does it follow the existing patterns?
   - Is the structure similar to the base template?
   - Would another AI agent understand this code?

## Communicating with Users

When presenting your customization work:

1. **Show what changed:**
   - List the new flags added
   - Describe the UI transformation
   - Explain key features

2. **Explain flag usage:**
   - Which flags control which features
   - Why each flag is useful for this use case
   - How to toggle them in CloudBees Unify

3. **Provide next steps:**
   - How to run the customized app
   - What to configure in CloudBees
   - Ideas for further customization

## Advanced Scenarios

### Nested Flag Logic

Sometimes you need flags that depend on other flags:

```typescript
const enableFeatureA = useFeatureFlag('enableFeatureA');
const featureAVariant = useFeatureFlagString('featureAVariant');

return (
  <div>
    {enableFeatureA && (
      <FeatureA variant={featureAVariant} />
    )}
  </div>
);
```

### Computed Values

Use flag values in calculations:

```typescript
const itemsPerPage = useFeatureFlagNumber('itemsPerPage');
const currentPage = 1;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const pageItems = allItems.slice(startIndex, endIndex);
```

### Multiple Flags on One Component

A component can be controlled by multiple flags:

```typescript
const showComponent = useFeatureFlag('enableComponent');
const componentStyle = useFeatureFlagString('componentStyle');
const componentSize = useFeatureFlagNumber('componentSize');

if (!showComponent) return null;

return (
  <MyComponent
    style={componentStyle}
    size={componentSize}
  />
);
```

## Environment Variables

The app needs one environment variable:

```
VITE_CLOUDBEES_SDK_KEY=<sdk_key_from_cloudbees>
```

This connects the app to CloudBees Feature Management. Without it:
- Flags will use default values
- No real-time updates
- Still works for development/testing

## File Modification Guidelines

### Files You SHOULD Modify:

- ✅ `src/App.tsx` - Main dashboard UI
- ✅ `src/lib/featureFlags.ts` - Flag definitions
- ✅ `src/lib/constants.ts` - Flag descriptions
- ✅ `src/components/**` - Add new components
- ✅ `src/theme/tokens.ts` - Theme customization
- ✅ `README.md` - Update for specific use case (optional)

### Files You SHOULD NOT Modify:

- ❌ `src/hooks/useFeatureFlag.ts` - Core hooks
- ❌ `src/contexts/FeatureFlagContext.tsx` - Context provider
- ❌ `src/lib/types.ts` - Type definitions
- ❌ `src/main.tsx` - Entry point (unless needed)
- ❌ `package.json` - Dependencies (unless adding new libraries)

## Summary

This is a **generic React dashboard** that uses **feature flags under the hood** for dynamic control. Your job is to transform it into industry-specific demos while:

1. Keeping it looking like a real business app
2. Using feature flags to control key features
3. Maintaining code quality and documentation
4. Following the established patterns

The end result should be an app that:
- **Looks** like a professional business application
- **Works** with real-time feature control
- **Demonstrates** CloudBees Feature Management value
- **Can be understood** by humans and AI agents alike

When in doubt, refer back to the existing code patterns and keep things simple!

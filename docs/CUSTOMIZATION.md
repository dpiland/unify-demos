# Customization Guide

This guide shows you how to customize this generic dashboard into your specific use case.

## Overview

This dashboard is intentionally generic. Transform it into:

- 🛒 Retail/E-commerce applications
- 💰 Financial services platforms
- 🏥 Healthcare portals
- 🚀 SaaS admin panels
- 📊 Analytics dashboards
- 🏢 Any industry-specific application

## Customization Steps

### 1. Define Your Flags

Edit `src/lib/featureFlags.ts` to add your feature flags:

```typescript
export const flags = {
  // Your feature flags here
  enableNewFeature: new Rox.Flag(),
  layoutMode: new Rox.RoxString('grid', ['grid', 'list', 'table']),
  itemsPerPage: new Rox.RoxNumber(10, [5, 10, 20, 50]),
};
```

**Flag Types:**

- **Boolean:** `new Rox.Flag()` - On/off toggles
- **String:** `new Rox.RoxString(default, [options])` - Multiple variants
- **Number:** `new Rox.RoxNumber(default, [options])` - Numeric values

### 2. Update Flag Descriptions

Edit `src/lib/constants.ts`:

```typescript
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  enableNewFeature: 'Enable the new feature for users',
  layoutMode: 'Control how content is displayed',
  itemsPerPage: 'Number of items to show per page',
};
```

### 3. Customize the Dashboard

Edit `src/App.tsx` to build your UI:

```typescript
function App() {
  // Access your flags
  const enabled = useFeatureFlag('enableNewFeature');
  const layout = useFeatureFlagString('layoutMode');
  const pageSize = useFeatureFlagNumber('itemsPerPage');

  return (
    <Layout>
      <Header>Your App Name</Header>
      <Content>
        {/* Your custom UI here */}
        {enabled && <NewFeature />}

        <LayoutSwitcher mode={layout} />

        <DataList pageSize={pageSize} />
      </Content>
    </Layout>
  );
}
```

### 4. Add Components

Create your components in `src/components/`:

```typescript
// src/components/ProductCard.tsx
import { Card } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

export function ProductCard({ product }) {
  const showDetails = useFeatureFlag('showProductDetails');

  return (
    <Card>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {showDetails && <p>{product.description}</p>}
    </Card>
  );
}
```

### 5. Customize Theme (Optional)

Edit `src/theme/tokens.ts`:

```typescript
export const tokens = {
  colorPrimary: '#your-brand-color',
  fontSize: 14,
  fontFamily: 'Your Font, sans-serif',
};
```

### 6. Create Flags in CloudBees

For each flag you defined:

1. Go to CloudBees Unify → Feature Management
2. Click "Create Flag"
3. Enter the exact flag name from your code
4. Configure default values
5. Save

## Common Patterns

### Toggle Feature Visibility

```typescript
const showFeature = useFeatureFlag('showNewFeature');

return (
  <div>
    {showFeature && <NewFeature />}
  </div>
);
```

### A/B Test Variants

```typescript
const variant = useFeatureFlagString('buttonVariant');

return (
  <Button type={variant}>
    Click Me
  </Button>
);
```

### Configure Numeric Values

```typescript
const itemCount = useFeatureFlagNumber('itemsToDisplay');
const items = allItems.slice(0, itemCount);

return <List items={items} />;
```

### Switch Layouts

```typescript
const layout = useFeatureFlagString('layoutMode');

switch (layout) {
  case 'grid':
    return <GridLayout />;
  case 'list':
    return <ListLayout />;
  default:
    return <GridLayout />;
}
```

## Example: Retail E-commerce

Here's a complete example transformation:

**1. Define Flags:**

```typescript
// src/lib/featureFlags.ts
export const flags = {
  showPromoBanner: new Rox.Flag(),
  enableExpressCheckout: new Rox.Flag(),
  productDisplayMode: new Rox.RoxString('grid', ['grid', 'list', 'compact']),
  productsPerPage: new Rox.RoxNumber(12, [6, 12, 24, 48]),
};
```

**2. Build Dashboard:**

```typescript
// src/App.tsx
function App() {
  const showPromo = useFeatureFlag('showPromoBanner');
  const displayMode = useFeatureFlagString('productDisplayMode');
  const perPage = useFeatureFlagNumber('productsPerPage');

  return (
    <Layout>
      <Header>My Store</Header>
      <Content>
        {showPromo && <PromoBanner />}

        <ProductGrid
          mode={displayMode}
          pageSize={perPage}
        />
      </Content>
    </Layout>
  );
}
```

**3. Create Components:**

```typescript
// src/components/ProductGrid.tsx
export function ProductGrid({ mode, pageSize }) {
  const products = useProducts();
  const displayProducts = products.slice(0, pageSize);

  return (
    <div className={`product-grid-${mode}`}>
      {displayProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

## Best Practices

### ✅ DO

- Use descriptive flag names (`enableExpressCheckout` not `flag1`)
- Add comments explaining flag purpose
- Handle both enabled/disabled states
- Test all flag combinations
- Keep UI professional and clean

### ❌ DON'T

- Hardcode flag names as strings throughout the code
- Use flags for security (they're client-side visible)
- Create deeply nested flag logic
- Forget to create flags in CloudBees
- Commit `.env.local` to version control

## Testing Your Customization

1. **Run the app:** `bun run dev`
2. **Toggle each flag** in CloudBees Unify
3. **Verify changes** appear in real-time
4. **Test all variants** of string flags
5. **Test all values** of number flags
6. **Check responsiveness** on different screen sizes

## Advanced Customization

### Multiple Environments

Use different SDK keys for different environments:

```bash
# .env.development.local
VITE_CLOUDBEES_SDK_KEY=dev_key_here

# .env.production.local
VITE_CLOUDBEES_SDK_KEY=prod_key_here
```

### User Targeting

Set custom properties for targeting:

```typescript
import Rox from 'rox-browser';

Rox.setCustomStringProperty('userTier', 'premium');
Rox.setCustomStringProperty('userRegion', 'us-west');
```

Then create targeting rules in CloudBees.

### Loading States

Show loading indicators while flags initialize:

```typescript
const { isEnabled, isLoading } = useFeatureFlagWithStatus('myFlag');

if (isLoading) return <Spinner />;

return isEnabled ? <Feature /> : <Fallback />;
```

## Getting Help

- **Code examples:** See `src/App.tsx` for working patterns
- **Technical details:** See [FEATURE_FLAGS.md](./FEATURE_FLAGS.md)
- **CloudBees docs:** [docs.cloudbees.com](https://docs.cloudbees.com/docs/cloudbees-feature-management)

## Next Steps

After customizing:

1. Update `README.md` with your app name and description
2. Add screenshots or demo video
3. Document any custom setup steps
4. Share with your team!

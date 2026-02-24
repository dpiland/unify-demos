# Feature Flags Integration Guide

Technical documentation for how CloudBees Feature Management is integrated into this application.

## Overview

This app uses CloudBees Feature Management (powered by Rox SDK) to enable dynamic feature control without redeploying code.

**Key Benefits:**
- Toggle features on/off in real-time
- A/B test different variants
- Gradually roll out new features
- Target specific user segments
- Quick rollback with kill switches

## Architecture

### Integration Flow

```
1. Application starts (main.tsx)
   ↓
2. Initialize feature flags SDK
   - Fetch SDK key from environment
   - Register all flags with Rox
   - Connect to CloudBees
   ↓
3. Wrap app in FeatureFlagProvider
   - Makes flags available to all components
   ↓
4. Components use hooks to access flags
   - useFeatureFlag() for boolean
   - useFeatureFlagString() for string
   - useFeatureFlagNumber() for number
   ↓
5. Render UI based on flag values
```

### Real-Time Updates

The SDK uses WebSocket connections for real-time updates:

1. You change a flag in CloudBees Unify
2. WebSocket pushes update to connected clients
3. SDK triggers React re-render
4. UI updates instantly (no page refresh)

## File Structure

```
src/
├── lib/
│   ├── featureFlags.ts       # Flag definitions & SDK init
│   ├── constants.ts          # Flag metadata
│   └── types.ts              # TypeScript types
├── contexts/
│   └── FeatureFlagContext.tsx # React context provider
├── hooks/
│   └── useFeatureFlag.ts     # React hooks for flags
└── main.tsx                  # Entry point, initializes SDK
```

## Flag Types

### Boolean Flags

**Purpose:** Simple on/off toggles

```typescript
// Define
enableNewFeature: new Rox.Flag()

// Use
const enabled = useFeatureFlag('enableNewFeature');
return enabled ? <NewFeature /> : <OldFeature />;
```

**Use Cases:**
- Enable/disable features
- Show/hide UI elements
- Beta feature access
- Kill switches

### String Flags

**Purpose:** Multiple variants (A/B testing)

```typescript
// Define
buttonVariant: new Rox.RoxString('default', ['default', 'primary', 'success'])

// Use
const variant = useFeatureFlagString('buttonVariant');
return <Button type={variant}>Click</Button>;
```

**Use Cases:**
- A/B/C testing
- Multiple UI variants
- Content variations
- Layout options

### Number Flags

**Purpose:** Numeric configuration values

```typescript
// Define
itemsPerPage: new Rox.RoxNumber(10, [5, 10, 20, 50])

// Use
const pageSize = useFeatureFlagNumber('itemsPerPage');
const items = data.slice(0, pageSize);
return <List items={items} />;
```

**Use Cases:**
- Page sizes
- Limits and quotas
- Refresh intervals
- Timeouts

## Implementation Details

### SDK Initialization

In `src/lib/featureFlags.ts`:

```typescript
export async function initializeFeatureFlags() {
  const sdkKey = import.meta.env.VITE_CLOUDBEES_SDK_KEY;

  // Validate key
  if (!sdkKey) {
    console.warn('SDK key not configured');
    return;
  }

  // Register flags
  Rox.register('', flags);

  // Connect to CloudBees
  await Rox.setup(sdkKey, {
    developmentOnly: import.meta.env.DEV,
  });
}
```

### React Context

In `src/contexts/FeatureFlagContext.tsx`:

```typescript
export const FeatureFlagProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ flags, isLoading, isInitialized: true }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
```

### Custom Hooks

In `src/hooks/useFeatureFlag.ts`:

```typescript
// Boolean flags
export function useFeatureFlag(flagKey: FlagKey): boolean {
  const { flags } = useFeatureFlagContext();
  return flags[flagKey].isEnabled();
}

// String flags
export function useFeatureFlagString(flagKey: FlagKey): string {
  const { flags } = useFeatureFlagContext();
  return flags[flagKey].getValue();
}

// Number flags
export function useFeatureFlagNumber(flagKey: FlagKey): number {
  const { flags } = useFeatureFlagContext();
  return flags[flagKey].getValue();
}
```

## CloudBees Configuration

### Creating Flags

1. Log into [CloudBees Unify](https://cloudbees.io)
2. Navigate to Feature Management
3. Click "Create Flag"
4. Configure:
   - **Name:** Must match code exactly (case-sensitive)
   - **Type:** Boolean, String, or Number
   - **Default Value:** Fallback value

### Boolean Flag Setup

```
Name: enableNewFeature
Type: Boolean
Default: false (unchecked)

Toggle: ☑ Enabled / ☐ Disabled
```

### String Flag Setup

```
Name: buttonVariant
Type: String
Variants: default, primary, success
Default: default

Options:
- Set specific variant for all users
- Or split traffic (33% / 33% / 34%)
- Or use targeting rules
```

### Number Flag Setup

```
Name: itemsPerPage
Type: Number
Options: 5, 10, 20, 50
Default: 10

Can set different values for:
- All users
- Specific user segments
- Gradual rollout percentages
```

## Advanced Features

### User Targeting

Target flags to specific users or groups:

```typescript
// Set custom properties
Rox.setCustomStringProperty('email', user.email);
Rox.setCustomStringProperty('tier', user.tier);
Rox.setCustomNumberProperty('accountAge', user.accountAgeDays);
```

Then in CloudBees:
```
If user.email contains "@company.com" → true
If user.tier equals "premium" → variant A
If user.accountAge > 30 → true
```

### Gradual Rollouts

Roll out features incrementally:

```
Week 1: 10% of users
Week 2: 25% of users
Week 3: 50% of users
Week 4: 100% of users
```

Adjust percentage in CloudBees - no code changes needed.

### A/B Testing

Test different variants with traffic splitting:

```
Variant A (Control): 50% of users
Variant B (Test): 50% of users
```

Each user gets a consistent variant based on their ID.

### Kill Switches

Instantly disable features if problems arise:

```typescript
const enabled = useFeatureFlag('newFeature');

// If you toggle the flag off in CloudBees,
// all users see it turn off immediately
if (!enabled) {
  return <SafeFallback />;
}

return <NewFeature />;
```

## Environment Management

### Multiple Environments

Create separate environments in CloudBees:
- **Development** - For local development
- **Staging** - For QA testing
- **Production** - For live users

Each has its own SDK key:

```bash
# .env.development.local
VITE_CLOUDBEES_SDK_KEY=dev_sdk_key

# .env.production.local
VITE_CLOUDBEES_SDK_KEY=prod_sdk_key
```

### Environment-Specific Values

Same flag, different values per environment:

| Flag | Development | Production |
|------|------------|-----------|
| `enableBeta` | Always ON | OFF (or targeted) |
| `itemsPerPage` | 5 (faster testing) | 20 (better UX) |
| `buttonVariant` | Single variant | A/B test |

## Performance

### Bundle Size

Rox SDK adds ~50KB gzipped to your bundle. This is reasonable for the functionality provided.

### Initialization Time

SDK initialization takes 100-500ms depending on network. The app handles this with loading states.

### Runtime Performance

Flag evaluation is extremely fast (microseconds). No performance impact from frequent flag checks.

### Caching

The SDK caches flag configurations locally. Works offline using cached values.

## Debugging

### Check Initialization

Open browser console and look for:

```
🚀 Initializing CloudBees Feature Flags...
✅ CloudBees Feature Flags initialized successfully
📊 Registered 3 feature flags
```

### Inspect Flag Values

In browser console:

```javascript
// Access Rox SDK
window.Rox

// Check specific flags
Rox.flags.enableNewFeature.isEnabled()  // → true/false
Rox.flags.buttonVariant.getValue()      // → "primary"
Rox.flags.itemsPerPage.getValue()       // → 10
```

### Common Issues

**Flags show default values:**
- Check SDK key is correct
- Verify flags exist in CloudBees with exact names
- Check browser console for connection errors

**Changes don't appear in real-time:**
- Check WebSocket connection in Network tab
- Verify firewall isn't blocking WebSocket
- Try refreshing to re-establish connection

**TypeScript errors:**
- Ensure flag names match exactly (case-sensitive)
- Run type checking: `tsc --noEmit`
- Check imports are correct

## Security Considerations

**⚠️ Important:** Feature flags are NOT for security.

- Flags are evaluated client-side
- Users can inspect flag values in browser dev tools
- Never hide sensitive features with flags alone

**For security-sensitive features:**
1. Always validate permissions on the backend
2. Use flags only for UI optimization (show/hide buttons)
3. Backend must enforce actual access control

## Best Practices

### ✅ DO

- Use descriptive flag names
- Document flag purpose in constants.ts
- Handle both enabled and disabled states
- Test all flag combinations
- Plan for gradual rollouts

### ❌ DON'T

- Don't use flags for security
- Don't create deeply nested flag logic
- Don't hardcode flag names as strings
- Don't commit SDK keys to version control
- Don't change flag types after creation

## API Reference

### Initialization

```typescript
await initializeFeatureFlags(options?: RoxSetupOptions)
```

### Hooks

```typescript
// Boolean flags
useFeatureFlag(flagKey: string): boolean

// String flags
useFeatureFlagString(flagKey: string): string

// Number flags
useFeatureFlagNumber(flagKey: string): number

// With loading state
useFeatureFlagWithStatus(flagKey: string): {
  isEnabled: boolean;
  isLoading: boolean;
}

// Full context
useFeatureFlags(): {
  flags: typeof flags;
  isLoading: boolean;
  isInitialized: boolean;
}
```

### Custom Properties

```typescript
// String properties
Rox.setCustomStringProperty(name: string, value: string)

// Number properties
Rox.setCustomNumberProperty(name: string, value: number)

// Boolean properties
Rox.setCustomBooleanProperty(name: string, value: boolean)
```

## Resources

- **CloudBees Docs:** [docs.cloudbees.com/docs/cloudbees-feature-management](https://docs.cloudbees.com/docs/cloudbees-feature-management)
- **Rox SDK Docs:** [docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-browser](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-browser)
- **Best Practices:** [docs.cloudbees.com/docs/cloudbees-feature-management/latest/best-practices](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/best-practices)

## Support

- **CloudBees Support:** [support.cloudbees.com](https://support.cloudbees.com/)
- **Community:** [community.cloudbees.com](https://community.cloudbees.com/)

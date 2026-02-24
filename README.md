# React Dashboard Demo Base

> **Note for AI Agents:** See [CLAUDE.md](./CLAUDE.md) for detailed instructions on how to work with this codebase.

A **generic starting point** for building custom demo applications with dynamic feature control.

## Purpose

This is NOT a complete demo application. It's a foundation that you (or an AI agent) can customize into:

- 🛒 Retail/e-commerce applications
- 💰 Financial services dashboards
- 🏥 Healthcare portals
- 🚀 SaaS admin panels
- 📊 Analytics dashboards
- 🎓 Any other industry-specific application

## What's Included

✅ **Clean React dashboard** - Professional UI ready to customize
✅ **Dynamic feature control** - Toggle features on/off without code changes
✅ **Ant Design** - Enterprise-grade UI components
✅ **TypeScript** - Full type safety
✅ **Rich inline documentation** - AI-friendly codebase
✅ **Working examples** - See different patterns in action

## Quick Start

```bash
# Install dependencies
bun install

# Setup environment (for feature control)
cp .env.example .env.local
# Add your configuration key to .env.local

# Start dev server
bun run dev
```

See [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) for detailed setup instructions.

## Feature Highlights

This demo showcases three common patterns for dynamic feature control:

### 1. Toggle Features On/Off
Show or hide UI elements dynamically (like promotional banners, announcements)

```typescript
const showBanner = useFeatureFlag('showWelcomeBanner');
return showBanner ? <Banner /> : null;
```

### 2. A/B Test Variants
Test different versions of UI elements (button styles, layouts, content)

```typescript
const variant = useFeatureFlagString('buttonVariant');
return <Button type={variant}>Click Me</Button>;
```

### 3. Configure Values
Control numeric settings (page sizes, limits, intervals)

```typescript
const itemCount = useFeatureFlagNumber('itemsToDisplay');
const items = data.slice(0, itemCount);
return <List items={items} />;
```

## Customization

This dashboard is intentionally generic. To customize:

1. **Update the UI** in `src/App.tsx` - Replace with your industry-specific content
2. **Add components** in `src/components/` - Build your feature set
3. **Customize theme** in `src/theme/` - Match your brand
4. **Configure features** in `src/lib/featureFlags.ts` - Control your features

See [docs/CUSTOMIZATION.md](./docs/CUSTOMIZATION.md) for detailed guide and AI prompt templates.

## AI-Friendly Design

This codebase is designed to be easily understood and extended by AI agents:

- 📝 Rich inline comments explaining patterns
- 🏗️ Clear, consistent structure
- ✨ Working examples of common patterns
- 🔤 TypeScript for autocomplete and type hints

### Example AI Prompt

```
Transform this dashboard into a retail e-commerce application. Add:
- Product catalog with filtering
- Shopping cart
- Checkout process
Use the existing patterns to control features dynamically.
```

## Project Structure

```
demo-base/
├── src/
│   ├── components/         # Add your custom components here
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── featureFlags.ts # 🎯 Configure your features here
│   │   ├── constants.ts    # Feature descriptions
│   │   └── types.ts        # TypeScript types
│   ├── theme/              # Ant Design theme customization
│   ├── App.tsx             # 🎯 Main dashboard (customize this)
│   └── main.tsx            # Entry point
├── docs/                   # Detailed documentation
└── .env.example            # Environment template
```

## Documentation

- [Getting Started](./docs/GETTING_STARTED.md) - Setup and installation
- [Customization Guide](./docs/CUSTOMIZATION.md) - How to customize this demo
- [Feature Control Integration](./docs/FEATURE_FLAGS.md) - Technical implementation details

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Ant Design** - UI component library
- **CloudBees Feature Management** - Dynamic feature control (under the hood)
- **Bun** - Fast package manager and runtime

## Development Commands

```bash
# Development server
bun run dev

# Linting
bun run lint

# Production build
bun run build

# Preview production build
bun run preview
```

## Configuration Setup

This demo uses CloudBees Feature Management for dynamic feature control:

1. **Get Configuration Key:**
   - Log into [CloudBees Unify](https://cloudbees.io)
   - Navigate to Feature Management → Installation
   - Copy your SDK key

2. **Configure Environment:**
   - Copy `.env.example` to `.env.local`
   - Add your SDK key: `VITE_CLOUDBEES_SDK_KEY=your_key_here`
   - Restart dev server

3. **Create Feature Controls:**
   - `showWelcomeBanner` (Boolean) - Toggle banner visibility
   - `buttonVariant` (String: default, primary, success) - Button styling
   - `itemsToDisplay` (Number: 5, 10, 20, 50) - List size

See [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) for detailed instructions.

## Key Features

- **Real-time updates** - Change features without redeploying
- **A/B testing** - Test different variants with your users
- **Gradual rollouts** - Deploy features to increasing percentages
- **User targeting** - Show features to specific user segments
- **Clean separation** - Feature control logic separate from business logic

## Next Steps

1. **Test the demo** - Toggle features and see real-time updates
2. **Read the code** - Explore `src/App.tsx` to understand the patterns
3. **Customize it** - Transform this into your specific use case
4. **Add features** - Build your application on this foundation

## Support

- 📖 [CloudBees Documentation](https://docs.cloudbees.com/docs/cloudbees-platform/)
- 💬 [CloudBees Community](https://community.cloudbees.com/)
- 🐛 [Report Issues](https://support.cloudbees.com/)

## License

This is a demo/template project. Customize and use as needed for building custom applications.

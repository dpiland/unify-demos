# Getting Started

This guide will help you get the dashboard running in less than 5 minutes.

## Prerequisites

- **Bun** (v1.0.0+) or **Node.js** (v18+)
- **CloudBees Account** with Feature Management access - [Sign up](https://www.cloudbees.com/)

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

**Copy the environment template:**

```bash
cp .env.example .env.local
```

**Get your SDK key from CloudBees:**

1. Log in to [CloudBees Unify](https://cloudbees.io/)
2. Navigate to **Feature Management** → **Installation**
3. Copy the SDK key
4. Add it to `.env.local`:

```env
VITE_CLOUDBEES_SDK_KEY=your_actual_sdk_key_here
```

### 3. Create Feature Flags

Create these 3 flags in CloudBees Unify:

| Flag Name | Type | Options/Default |
|-----------|------|----------------|
| `showWelcomeBanner` | Boolean | Default: `true` |
| `buttonVariant` | String | Options: `default`, `primary`, `success` |
| `itemsToDisplay` | Number | Options: `5`, `10`, `20`, `50` (Default: `10`) |

### 4. Start Development Server

```bash
bun run dev
```

Open `http://localhost:5173`

### 5. Test It Works

Toggle flags in CloudBees Unify and watch the dashboard update in real-time:

- **Toggle `showWelcomeBanner`** → Banner appears/disappears
- **Change `buttonVariant`** → Button style changes
- **Change `itemsToDisplay`** → List length changes

No page refresh needed!

## Project Structure

```
demo-base/
├── src/
│   ├── components/         # Your custom components
│   ├── lib/
│   │   ├── featureFlags.ts # Define flags here
│   │   └── constants.ts    # Flag descriptions
│   ├── App.tsx             # Main dashboard
│   └── main.tsx            # Entry point
├── docs/                   # Documentation
└── .env.local              # Your config (gitignored)
```

## Available Commands

```bash
bun run dev          # Start dev server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run linter
```

## Troubleshooting

### "SDK key not found" Warning

**Solution:**
1. Check `.env.local` exists with `VITE_CLOUDBEES_SDK_KEY`
2. Restart dev server

### Flags Show Default Values

**Solution:**
1. Verify SDK key is correct
2. Ensure flags exist in CloudBees with exact names
3. Check browser console for errors

### Port Already in Use

**Solution:**
```bash
kill -9 $(lsof -ti:5173)
# or
bun run dev --port 3000
```

## Next Steps

- **Read the code:** Check out `src/App.tsx` to see how flags work
- **Customize it:** See [CUSTOMIZATION.md](./CUSTOMIZATION.md)
- **Learn more:** See [FEATURE_FLAGS.md](./FEATURE_FLAGS.md) for technical details

## Getting Help

- **CloudBees Docs:** [docs.cloudbees.com](https://docs.cloudbees.com/docs/cloudbees-feature-management)
- **CloudBees Support:** [support.cloudbees.com](https://support.cloudbees.com/)

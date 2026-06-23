# Commit & push the Albert Invent branch

The portfolio work is complete and verified (TypeScript + Vite build pass), but it
is **uncommitted** in your working tree. Run these on your Mac to get it onto GitHub.

```bash
cd ~/Projects/unify-demos

# 1. Make sure you're on the branch (it already exists locally)
git checkout albert-invent

# 2. Clear the stale lock left by the sandbox (safe to delete)
rm -f .git/index.lock

# 3. Stage everything and confirm the new files are included
git add -A
git status          # expect: src/views/, src/components/ui.tsx, albert-invent-portfolio.html, modified src files

# 4. Commit
git commit -m "Albert Invent PMM portfolio: audience-tailored views, ROI embed, presenter notes"

# 5. Push and set upstream
git push -u origin albert-invent
```

Then refresh GitHub — `albert-invent` will appear in the branch dropdown. `main` is untouched.

## Run it
```bash
npm run dev            # live app; Albert dev SDK key is in .env.local (gitignored)
# or just double-click albert-invent-portfolio.html for the no-dependency version
```

## If `git add` complains about objects
If you see "unable to unlink" or object errors (sandbox leftovers), run:
```bash
git gc --prune=now
```
then retry steps 3–5.

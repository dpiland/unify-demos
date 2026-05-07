#!/bin/bash
set -e

echo "🔧 Fixing TypeScript errors across all branches..."

# Healthcare
echo "📋 Fixing healthcare..."
git checkout healthcare
npm run build 2>&1 | grep "error TS" | sed 's/.*(\(.*\)):.*/\1/' | sort -u > /tmp/healthcare-errors.txt || true

# Airline
echo "✈️  Fixing airline..."
git checkout airline
npm run build 2>&1 | grep "error TS" | sed 's/.*(\(.*\)):.*/\1/' | sort -u > /tmp/airline-errors.txt || true

# Software
echo "💻 Fixing Software..."
git checkout Software
npm run build 2>&1 | grep "error TS" | sed 's/.*(\(.*\)):.*/\1/' | sort -u > /tmp/software-errors.txt || true

echo "✅ Error collection complete"
cat /tmp/healthcare-errors.txt
cat /tmp/airline-errors.txt
cat /tmp/software-errors.txt

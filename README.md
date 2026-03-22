# MindFlow - Digital Load Tracker

A mobile app for Monash University students to self-track their digital well-being, receive rules-based support suggestions, and contribute to aggregated program evaluation — aligned with **UN SDG 3: Good Health and Well-being**.

> **Pillar 2 — Thriving Communities and Digital Well-being**
> Non-clinical well-being support targeting a 20% lift in digital belonging for a defined pilot cohort within 13 months.

## Features

### Student Self-Tracking & Summaries
- Log daily screen time, app usage by category, fatigue, focus, and mood
- Circular load gauge showing composite digital load score (1–10)
- Weekly and monthly trend charts (bar charts, trend lines, category breakdowns)
- Free-text notes with safe messaging detection

### Rules-Based Suggestions
Five deterministic rules evaluate the last 7 days of data and surface actionable suggestions linked to Monash services:

| Rule | Trigger | Linked Service |
|------|---------|---------------|
| High Screen Time | 7-day avg > 8 hours | Monash Wellbeing |
| Rising Fatigue | 3+ consecutive days increasing, fatigue ≥ 6 | Monash Learning Resources |
| Low Focus | 7-day avg focus < 4 | Monash Study Skills |
| Heavy Social Media | Social media > 50% of total time | Monash Clubs & Societies |
| High Composite Load | High fatigue + low focus + low mood | Monash Counselling |

### Aggregated Reporting
- Anonymized reports for program evaluation only
- Export via device share sheet as JSON
- Persistent anonymous UUID — no name, email, or student ID collected

### Consent, Retention & Safe Messaging
- **Opt-in consent flow** — GDPR-style toggles for data collection and anonymized reporting
- **Data retention controls** — choose 30, 60, 90, or 180 days; older entries auto-deleted
- **Withdraw consent** at any time — triggers full data deletion
- **Delete All Data** with double confirmation
- **Crisis keyword detection** — scans notes for distress indicators, surfaces referral banner
- **Referral-only** — links to Lifeline (13 11 14), Beyond Blue (1300 22 4636), Monash Counselling
- **Never provides clinical or medical advice**

### Baseline Pulse Survey
- 10 Likert-scale questions measuring digital belonging
- Categories: belonging, connection, digital load, balance
- Retake available from Settings

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo SDK 55 |
| Language | TypeScript (strict mode) |
| Navigation | Expo Router (file-based) |
| Storage | AsyncStorage (100% local, no backend) |
| Charts | react-native-svg |
| Utilities | date-fns, uuid |

## Project Structure

```
app/                          # Expo Router screens
├── (tabs)/                   # Tab navigation
│   ├── index.tsx             # Dashboard — load gauge, summary, suggestions
│   ├── track.tsx             # Daily tracking entry form
│   ├── insights.tsx          # Charts, trends, report export
│   └── settings.tsx          # Consent, retention, data management
├── onboarding/               # First-launch flow
│   ├── index.tsx             # Welcome screen
│   ├── consent.tsx           # Privacy & consent
│   └── baseline-survey.tsx   # Digital belonging pulse survey
└── crisis/
    └── index.tsx             # Support resources (modal)

src/
├── models/                   # TypeScript interfaces
├── services/                 # Storage, rules engine, crisis detector, aggregator
├── hooks/                    # Custom React hooks
├── components/               # UI, charts, dashboard, survey, safety
├── constants/                # Theme, Monash services, survey questions, safety keywords
└── context/                  # React context providers
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app on your phone (iOS / Android), or a web browser

### Installation

```bash
git clone https://github.com/JamieTseCreamyChan/MindFlow.git
cd MindFlow
npm install
```

### Run

```bash
# Web (browser)
npx expo start --web

# Mobile (Expo Go)
npx expo start
# Scan the QR code with Expo Go
```

## Architecture Decisions

- **Local-first, no backend** — All data stays on-device. Simplifies privacy compliance and aligns with the prototype scope.
- **Rules engine over ML** — Deterministic rules make behavior predictable, auditable, and avoid risks of automated clinical assessment.
- **Crisis detection is referral-only** — The app never provides clinical advice. It detects keywords and refers users to professional services.
- **Consent is reversible** — Users can withdraw consent at any time, triggering full data deletion.
- **Anonymous ID for aggregation** — A UUID generated on first launch is the only identifier in reports. No PII is ever collected.

## SDG 3 Alignment

This app supports **UN Sustainable Development Goal 3: Good Health and Well-being** as part of Monash University's commitment to student digital well-being. It is designed as a non-clinical support tool within the *Thriving Communities and Digital Well-being* pillar.

## License

This project is developed for Monash University. All rights reserved.

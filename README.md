# 🏠 HomeGuard Pro

**AI-Powered Home Maintenance Platform**

🔗 **Live:** [https://homeowner1-beryl.vercel.app/](https://homeowner1-beryl.vercel.app/)

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## What It Does

HomeGuard Pro helps homeowners manage their home maintenance with AI-powered tools. Built with Next.js and Tailwind CSS.

### Features

- **📊 Home Dashboard** — Overview of your home systems, upcoming tasks, and spending
- **🔧 Smart Maintenance Scheduler** — AI-generated maintenance schedules based on your home's systems, age, and climate
- **🚨 Emergency Guide** — AI chat for step-by-step emergency troubleshooting
- **📋 Warranty Tracker** — Track warranties with expiration alerts
- **💰 Cost Optimizer** — Compare DIY vs professional costs with budget tracking
- **👷 Contractor Finder** — Browse vetted contractors by specialty and location
- **💳 Pricing & Plans** — Three subscription tiers (Basic, Pro, Premium)

---

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (maintenance schedules, emergency chat, cost estimates)
- **Payments:** Stripe
- **Hosting:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/epictech-ai/homeguard-pro.git
cd homeguard-pro
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
OPENAI_API_KEY=your_openai_key
STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## Project Structure

```
├── components/       # Reusable UI components
├── pages/            # Next.js pages & API routes
│   ├── api/          # AI-powered API endpoints
│   ├── index.js      # Landing page
│   ├── dashboard.js  # Home dashboard
│   ├── maintenance.js
│   ├── emergency.js
│   ├── warranties.js
│   ├── costs.js
│   ├── contractors.js
│   └── pricing.js
├── public/           # Static assets, sitemap, robots.txt
├── styles/           # Global CSS
└── next.config.js    # Next.js config with security headers
```

---

## Deployment

Deployed on **Vercel** with automatic deploys from `main` branch.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments on every push.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

*Built by [Epic Tech AI](https://epictech.ai)*

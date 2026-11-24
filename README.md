# Product Catalog

A responsive Product Catalog application built with Next.js, React, TypeScript, and the public [DummyJSON](https://dummyjson.com) REST API (`product-catalog-nextjs`).

## Features

- **Product listing** — image, title, category, price, and rating with search, dynamic category filter, sort (price/rating), and pagination
- **Product details** — dynamic route `/products/[id]`, metadata, and proper HTTP 404 for missing/invalid products
- **Create product** — reusable validated form with accessible inline errors and DummyJSON `POST` simulation
- **Edit product** — prefilled reusable form with DummyJSON `PUT` simulation
- **Delete product** — confirmation dialog, DummyJSON `DELETE` simulation, and client-side listing updates
- **UX / accessibility** — responsive layout from 360px, semantic structure, keyboard-accessible modal, loading/error/empty states

## Tech stack

- Next.js 16 (App Router, Cache Components / PPR)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Yarn
- React Hook Form + Zod
- Lucide React
- Sonner (toasts)
- DummyJSON REST API

## Requirements

- Node.js 20+ recommended
- Yarn 1.x (`packageManager` is set to `yarn@1.22.22`)

No environment variables are required. API settings live in `src/config/app.config.ts`.

## Installation

```bash
yarn install
```

## Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Create a production build |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Run TypeScript (`tsc --noEmit`) |

## Build

```bash
yarn build
yarn start
```

## API source

All product data comes from **DummyJSON**:

- Base URL: `https://dummyjson.com`
- Products: `/products`
- Categories: `/products/categories`

## Important: DummyJSON mock persistence

DummyJSON **simulates** create, update, and delete responses. Mutations are **not** permanently stored on the server.

- After create/update/delete, a refresh may restore original DummyJSON data.
- The UI communicates this clearly in toasts and dialogs.
- Delete removes items from the current client-side listing session only.
- Create/update do not permanently appear in subsequent API fetches.

## Project structure

```text
src/
  app/                 # App Router pages and layouts
  config/              # Application configuration
  features/products/   # Product feature (components, hooks, service, types)
  shared/              # Shared UI and utilities
  proxy.ts             # Request-time validation for product 404 status codes
```

## License

Private assessment project.

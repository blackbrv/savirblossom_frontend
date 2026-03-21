# AGENTS.md - SavirBlossom Frontend

Next.js 15 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui patterns.

---

## Commands

```bash
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npx prettier --write .   # Format all files
npx prettier --check .   # Check formatting
```

**Note:** No test framework configured.

---

## File Naming

| Location        | Convention           | Example                             |
| --------------- | -------------------- | ----------------------------------- |
| Routes (app/)   | kebab-case           | `contact-us/page.tsx`               |
| Components      | PascalCase           | `ProductCard.tsx`                   |
| UI primitives   | kebab-case           | `button.tsx`                        |
| Utilities/hooks | kebab-case/camelCase | `utils.ts`, `useScrollListener.tsx` |

**Path alias:** `@/` = `src/`

---

## Exports

| Type          | Pattern      |
| ------------- | ------------ |
| Pages         | Default only |
| UI components | Named        |
| Hooks         | Default      |
| Context       | Named        |

```tsx
// Pages
export default function HomePage() { ... }

// UI - Named exports
export { Button, buttonVariants };

// Hooks - Default export
export default function useScrollListener() { ... }
```

---

## Props Typing

```tsx
interface ProductCardProps {
  title: string;
  image: StaticImageData | string;
  price?: string;
  isNewArrival?: boolean;
}

export default function ProductCard({
  title,
  image,
  price,
  isNewArrival,
  ...rest
}: ProductCardProps & React.HTMLAttributes<HTMLDivElement>) { ... }
```

---

## Imports Order

```tsx
"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Star } from "phosphor-react";

import Flower01 from "@/assets/flower-1.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
```

---

## Styling

**Primary:** Tailwind CSS utilities

**Conditional classes:** Use `cn()` from `@/lib/utils`:

```tsx
<div
  className={cn("flex gap-5", imagePosition === "right" && "flex-row-reverse")}
/>
```

**CSS variables** in `globals.css` via `@theme`:

```css
@theme {
  --color-primary: #131313;
  --color-danger-500: #df1c41;
}
```

---

## TypeScript

- Strict mode enabled
- Use explicit interfaces for data structures
- Prefer `StaticImageData | string` for image props
- Use `React.` prefix for types when not imported

---

## Error Handling

**Context validation:**

```tsx
function useShopSectionProvider() {
  const context = React.useContext(ShopSectionProvider);
  if (!context) {
    throw new Error(
      "useShopSectionProvider must be used within <ShopSectionProvider />",
    );
  }
  return context;
}
```

---

## State Management

- `React.useState()` for local state
- React Context for cross-component state
- Custom hooks for shared logic
- Server Components for data-fetching

---

## Directory Structure

```
src/
├── app/              # Routes (kebab-case folders)
├── components/
│   ├── ui/           # Primitive UI (shadcn/ui style)
│   ├── [Feature]/    # Feature-specific components
│   └── *.tsx         # Shared components (PascalCase)
├── lib/utils/        # Utilities, constants, hooks
└── assets/           # Static images
```

---

## UI Components

Follow shadcn/ui patterns:

- Radix UI primitives
- CVA for variants
- Export component + variant helper

```tsx
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

<button className={buttonVariants({ variant: "destructive" })}>
```

---

## Client Components

Mark with `"use client"` at top:

```tsx
"use client";

import { useState } from "react";
```

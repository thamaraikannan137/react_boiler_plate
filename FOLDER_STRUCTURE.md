# 📁 Complete Folder Structure

```
react_boiler_plate/
│
├── public/                     # Static assets
│   └── vite.svg
│
├── src/                        # Source code
│   ├── assets/                 # Images, fonts, static files
│   │   └── react.svg
│   │
│   ├── components/             # React components
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button.tsx      # Customizable button component
│   │   │   ├── Input.tsx       # Form input with validation
│   │   │   ├── Card.tsx        # Card container component
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   ├── forms/              # Form components with React Hook Form
│   │   │   ├── LoginForm.tsx   # Login form with validation
│   │   │   ├── RegisterForm.tsx # Registration form
│   │   │   ├── UserForm.tsx    # Generic user form
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx      # Header with navigation
│   │   │   ├── Footer.tsx      # Footer component
│   │   │   ├── MainLayout.tsx  # Main layout wrapper
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   └── features/           # Feature-specific components
│   │       └── .gitkeep        # Placeholder for future features
│   │
│   ├── config/                 # App configuration
│   │   ├── constants.ts        # App-wide constants
│   │   └── env.ts              # Environment variables
│   │
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.tsx     # Authentication context
│   │   └── ThemeContext.tsx    # Theme context
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDebounce.ts      # Debounce hook
│   │   ├── useLocalStorage.ts  # LocalStorage hook
│   │   ├── useForm.ts          # Custom form hook
│   │   └── index.ts            # Barrel export
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── HomePage.tsx        # Home/landing page
│   │   ├── AboutPage.tsx       # About page
│   │   ├── CounterPage.tsx     # Redux counter example
│   │   ├── LoginPage.tsx       # Login page
│   │   └── RegisterPage.tsx    # Registration page
│   │
│   ├── routes/                 # Routing configuration
│   │   └── index.tsx           # React Router setup
│   │
│   ├── services/               # API services
│   │   ├── api.ts              # Generic API client
│   │   └── userService.ts      # User-specific API calls
│   │
│   ├── store/                  # Redux Toolkit store
│   │   ├── index.ts            # Store configuration
│   │   ├── slices/             # Redux slices
│   │   │   ├── counterSlice.ts # Counter state slice
│   │   │   ├── userSlice.ts    # User state slice
│   │   │   ├── authSlice.ts    # Auth state slice
│   │   │   └── .gitkeep
│   │   └── middleware/         # Custom middleware
│   │       └── .gitkeep
│   │
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Global CSS
│   │
│   ├── types/                  # TypeScript types
│   │   ├── index.ts            # Common types
│   │   └── models.ts           # Domain models
│   │
│   ├── utils/                  # Utility functions
│   │   ├── formatters.ts       # Formatting utilities
│   │   ├── validators.ts       # Validation utilities
│   │   └── index.ts            # Barrel export
│   │
│   ├── App.css                 # App-specific styles
│   ├── App.tsx                 # Root App component
│   ├── index.css               # Global styles
│   └── main.tsx                # App entry point
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── package-lock.json           # Locked dependencies
├── README.md                   # Original Vite README
├── README_BOILERPLATE.md       # Comprehensive documentation
├── QUICKSTART.md               # Quick start guide
├── STRUCTURE.md                # Architecture documentation
├── FOLDER_STRUCTURE.md         # This file
├── tsconfig.json               # TypeScript config (base)
├── tsconfig.app.json           # TypeScript config (app)
├── tsconfig.node.json          # TypeScript config (node)
└── vite.config.ts              # Vite configuration
```

## 📂 Folder Descriptions

### `/src/assets`
Static files like images, fonts, icons. Import and use in components.

### `/src/components`
All React components organized by type:
- **common/** - Reusable UI components used across the app
- **forms/** - Form components with React Hook Form + Zod validation
- **layout/** - Layout components (Header, Footer, containers)
- **features/** - Feature-specific components (e.g., UserProfile, ProductCard)

### `/src/config`
Application configuration files:
- **constants.ts** - App-wide constants (API endpoints, pagination limits, etc.)
- **env.ts** - Environment variable management with type safety

### `/src/contexts`
React Context API providers for global state:
- **AuthContext** - Authentication state
- **ThemeContext** - Theme management

### `/src/hooks`
Custom React hooks for reusable logic:
- **useDebounce** - Debounce values
- **useLocalStorage** - Persist state in localStorage
- **useForm** - Custom form management (alternative to React Hook Form)

### `/src/pages`
Page-level components that map to routes:
- Each page represents a route in the application
- Composed of smaller components
- Connected to Redux store and services

### `/src/routes`
Routing configuration using React Router:
- Centralized route definitions
- Protected route handling
- Layout wrapping

### `/src/services`
API communication layer:
- **api.ts** - Generic HTTP client (GET, POST, PUT, DELETE)
- **[entity]Service.ts** - Entity-specific API methods

### `/src/store`
Redux Toolkit state management:
- **index.ts** - Store configuration, typed hooks
- **slices/** - Redux slices (state + reducers + actions)
- **middleware/** - Custom Redux middleware

### `/src/styles`
Global styles:
- **globals.css** - Global CSS, Tailwind customizations

### `/src/types`
TypeScript type definitions:
- **index.ts** - Common types (User, ApiResponse, etc.)
- **models.ts** - Domain models (Product, Order, etc.)

### `/src/utils`
Utility functions:
- **formatters.ts** - Date, currency, number formatting
- **validators.ts** - Input validation (email, phone, etc.)

## 🎯 Key Design Patterns

### Barrel Exports
Each folder has an `index.ts` for clean imports:
```typescript
// Instead of:
import { Button } from './components/common/Button';
import { Input } from './components/common/Input';

// Use:
import { Button, Input } from './components/common';
```

### Type Safety
- All components have TypeScript interfaces
- Props are strictly typed
- Redux store is fully typed with `RootState` and `AppDispatch`

### Separation of Concerns
- **Components** - UI only
- **Services** - API communication
- **Store** - Global state
- **Utils** - Pure functions
- **Types** - Type definitions

### Code Organization
- Related files grouped together
- Clear naming conventions
- Scalable structure for growth

## 🔄 Data Flow

```
User Interaction
    ↓
Component (UI)
    ↓
Dispatch Action (Redux) or Call Service (API)
    ↓
Reducer Updates State or Service Returns Data
    ↓
Component Re-renders with New Data
    ↓
UI Updates
```

## ✨ Best Practices

1. **One component per file** - Easier to maintain and test
2. **Index files** - For barrel exports and clean imports
3. **Type definitions** - Separate type files for complex types
4. **Service layer** - Centralized API calls
5. **Custom hooks** - Extract reusable logic
6. **Constants** - Avoid magic numbers/strings
7. **Environment variables** - For configuration

---

This structure is designed to scale from small projects to large enterprise applications. Add folders as needed while maintaining the organizational pattern! 🚀


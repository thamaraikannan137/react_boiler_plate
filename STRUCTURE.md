# React Boilerplate Project Structure

## 📁 Folder Structure

```
src/
├── assets/              # Images, fonts, static files
├── components/          
│   ├── common/          # Reusable components (Button, Input, Card)
│   ├── layout/          # Layout components (Header, Footer, MainLayout)
│   ├── forms/           # Form components using React Hook Form
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts   # Debounce hook
│   ├── useLocalStorage.ts # Local storage hook
│   └── useForm.ts       # Custom form hook
├── pages/               # Page components (route level)
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── CounterPage.tsx
├── services/            # API calls, external services
│   ├── api.ts           # Generic API client
│   └── userService.ts   # User-specific API calls
├── store/               # Redux Toolkit store
│   ├── index.ts         # Store configuration
│   ├── slices/          # Redux slices
│   │   ├── counterSlice.ts
│   │   ├── userSlice.ts
│   │   └── authSlice.ts
│   └── middleware/      # Custom middleware
├── utils/               # Helper functions, constants
│   ├── formatters.ts    # Formatting utilities
│   └── validators.ts    # Validation utilities
├── contexts/            # React Context providers
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── routes/              # Route configuration
│   └── index.tsx        # Router setup
├── styles/              # Global styles
│   └── globals.css
├── config/              # App configuration
│   ├── constants.ts
│   └── env.ts
└── types/               # TypeScript types and interfaces
    ├── index.ts
    └── models.ts
```

## 🛠️ Technology Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Redux Toolkit** - State Management
- **React Hook Form** - Form Management
- **Zod** - Schema Validation
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Material-UI** - Component Library (optional)

## 📦 Key Features

### State Management (Redux Toolkit)
- **Store Configuration**: Centralized store setup in `src/store/index.ts`
- **Slices**: Modular state management with Redux slices
- **Async Thunks**: Handle async operations with `createAsyncThunk`
- **Typed Hooks**: Custom typed `useAppDispatch` and `useAppSelector` hooks

### Form Management (React Hook Form)
- **Validation**: Zod schema validation with `@hookform/resolvers`
- **Type Safety**: Fully typed forms with TypeScript
- **Examples**: LoginForm, RegisterForm, UserForm

### Component Architecture
- **Common Components**: Reusable UI components (Button, Input, Card)
- **Layout Components**: Consistent page layouts (Header, Footer, MainLayout)
- **Form Components**: Pre-built form components with validation

### Custom Hooks
- `useDebounce`: Debounce values
- `useLocalStorage`: Persist data in localStorage
- `useFormState`: Custom form state management (alternative to React Hook Form)

### Routing
- React Router v6 with nested routes
- Layout wrapper for consistent UI
- Example pages: Home, About, Login, Register, Counter

## 🚀 Getting Started

### Installation
\`\`\`bash
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

### Preview
\`\`\`bash
npm run preview
\`\`\`

## 📝 Usage Examples

### Using Redux Store
\`\`\`typescript
import { useAppDispatch, useAppSelector } from '../store';
import { increment } from '../store/slices/counterSlice';

function Component() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  return <button onClick={() => dispatch(increment())}>Count: {count}</button>;
}
\`\`\`

### Using React Hook Form
\`\`\`typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormInputs = z.infer<typeof schema>;

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormInputs) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
\`\`\`

### API Calls
\`\`\`typescript
import { userService } from '../services/userService';
import { useAppDispatch } from '../store';
import { fetchUsers } from '../store/slices/userSlice';

function UserList() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  // Component logic
}
\`\`\`

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:
\`\`\`
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Your App Name
VITE_ENABLE_ANALYTICS=false
\`\`\`

### Constants
Update `src/config/constants.ts` for app-wide constants.

## 📚 Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: Use TypeScript interfaces for all props and state
3. **State Management**: Use Redux for global state, local state for component-specific data
4. **Form Validation**: Always validate forms with Zod schemas
5. **Error Handling**: Handle errors gracefully with try-catch and error boundaries
6. **Code Splitting**: Use lazy loading for routes when needed
7. **Performance**: Memoize expensive calculations with useMemo/useCallback

## 📄 License

MIT


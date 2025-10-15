# React TypeScript Boilerplate 🚀

A modern, production-ready React boilerplate with TypeScript, Redux Toolkit, React Hook Form, and Tailwind CSS.

## ✨ Features

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 19** - Latest React version
- 🔷 **TypeScript** - Type safety out of the box
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🗂️ **Redux Toolkit** - Efficient state management
- 📋 **React Hook Form** - Performant form validation
- 🎯 **Zod** - TypeScript-first schema validation
- 🛣️ **React Router v6** - Client-side routing
- 🎭 **Material-UI** - Ready to use (optional)
- 📁 **Well-structured folders** - Scalable architecture

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts, static files
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   └── forms/           # Form components
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── UserForm.tsx
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useForm.ts
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── CounterPage.tsx
├── services/            # API services
│   ├── api.ts
│   └── userService.ts
├── store/               # Redux store
│   ├── index.ts
│   └── slices/
│       ├── counterSlice.ts
│       ├── userSlice.ts
│       └── authSlice.ts
├── utils/               # Utility functions
│   ├── formatters.ts
│   └── validators.ts
├── contexts/            # React contexts
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── routes/              # Route configuration
│   └── index.tsx
├── styles/              # Global styles
│   └── globals.css
├── config/              # App configuration
│   ├── constants.ts
│   └── env.ts
└── types/               # TypeScript types
    ├── index.ts
    └── models.ts
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or use this template
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### State Management
- **Redux Toolkit** - Global state management
- **React Redux** - React bindings for Redux

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Integration with validation libraries

### Routing
- **React Router DOM v6** - Client-side routing

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Material-UI** (optional) - Component library

## 📚 Usage Examples

### Redux Store Usage

```typescript
import { useAppDispatch, useAppSelector } from './store';
import { increment } from './store/slices/counterSlice';

function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}
```

### React Hook Form with Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

type FormInputs = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### API Service

```typescript
import { userService } from './services/userService';

// Fetch users
const users = await userService.getUsers();

// Get user by ID
const user = await userService.getUserById('123');

// Create user
const newUser = await userService.createUser({
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Custom Hooks

```typescript
// useDebounce
import { useDebounce } from './hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

// useLocalStorage
import { useLocalStorage } from './hooks';

const [user, setUser] = useLocalStorage('user', null);
```

## 🎯 Redux Slices

### Counter Slice
- `increment()` - Increment counter
- `decrement()` - Decrement counter
- `incrementByAmount(number)` - Increment by specific amount
- `reset()` - Reset to 0

### User Slice
- `fetchUsers()` - Async: Fetch all users
- `fetchUserById(id)` - Async: Fetch user by ID
- `setUsers(users)` - Set users array
- `addUser(user)` - Add single user
- `removeUser(id)` - Remove user by ID

### Auth Slice
- `login(credentials)` - Async: User login
- `logout()` - Async: User logout
- `setCredentials({ user, token })` - Set auth credentials
- `clearAuth()` - Clear auth state

## 🎨 Components

### Common Components
- **Button** - Customizable button with variants (primary, secondary, outline) and sizes
- **Input** - Form input with label, error, and helper text
- **Card** - Container with shadow and padding options

### Form Components
- **LoginForm** - Login form with email/password validation
- **RegisterForm** - Registration form with password strength validation
- **UserForm** - Generic user form with role selection

### Layout Components
- **Header** - Navigation header with auth state
- **Footer** - Footer component
- **MainLayout** - Main page layout wrapper

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Your App Name
VITE_ENABLE_ANALYTICS=false
```

### Constants

Edit `src/config/constants.ts` for app-wide constants.

## 📦 Adding New Features

### Add a New Page

1. Create page component in `src/pages/`
2. Add route in `src/routes/index.tsx`
3. Add navigation link in `src/components/layout/Header.tsx`

### Add a New Redux Slice

1. Create slice in `src/store/slices/yourSlice.ts`
2. Import and add to store in `src/store/index.ts`
3. Use typed hooks in components

### Add a New Form

1. Create form component in `src/components/forms/`
2. Define Zod schema for validation
3. Use `useForm` with `zodResolver`

## 🧪 Best Practices

### TypeScript
- Define interfaces for all props and state
- Use type inference where possible
- Avoid `any` type

### Redux
- Keep slices focused and modular
- Use async thunks for API calls
- Normalize state shape for complex data

### Forms
- Always validate user input
- Use Zod schemas for type safety
- Handle loading and error states

### Components
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic to hooks

### File Organization
- One component per file
- Group related files together
- Use index files for clean imports

## 🚀 Production Build

```bash
# Build the app
npm run build

# Preview the build locally
npm run preview
```

The build output will be in the `dist/` folder.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Coding! 🎉**


# Quick Start Guide 🚀

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
VITE_API_BASE_URL=https://api.example.com
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 What's Included

### ✅ Pages (Ready to Use)
- **Home** (`/`) - Landing page with examples
- **About** (`/about`) - About page
- **Counter** (`/counter`) - Redux counter example
- **Login** (`/login`) - Login form with validation
- **Register** (`/register`) - Registration form

### ✅ Components

#### Common Components
```typescript
import { Button, Input, Card } from './components/common';

// Button with variants
<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" isLoading>Loading...</Button>

// Input with validation
<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
  helperText="Enter your email"
/>

// Card container
<Card padding="lg">
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

#### Form Components
```typescript
import { LoginForm, RegisterForm, UserForm } from './components/forms';

// Pre-built forms with validation
<LoginForm />
<RegisterForm />
<UserForm onSubmit={handleSubmit} />
```

### ✅ Redux Store (Ready to Use)

```typescript
import { useAppDispatch, useAppSelector } from './store';
import { increment, decrement } from './store/slices/counterSlice';
import { login } from './store/slices/authSlice';

function Component() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

### ✅ Custom Hooks

```typescript
import { useDebounce, useLocalStorage, useFormState } from './hooks';

// Debounce a value
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

// Local storage
const [user, setUser] = useLocalStorage('user', null);

// Form state management
const { values, errors, handleChange, handleSubmit } = useFormState({
  email: '',
  password: ''
});
```

---

## 🎨 Styling with Tailwind

All components use Tailwind CSS. You can customize easily:

```tsx
// Use Tailwind classes directly
<div className="flex items-center gap-4 p-6 bg-blue-500 rounded-lg">
  <h1 className="text-2xl font-bold text-white">Hello</h1>
</div>

// Extend components
<Button className="mt-4 w-full">Custom Styled Button</Button>
```

---

## 📝 Creating New Features

### Add a New Page

1. **Create page component:**
```typescript
// src/pages/DashboardPage.tsx
export const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
```

2. **Add route:**
```typescript
// src/routes/index.tsx
import { DashboardPage } from '../pages/DashboardPage';

{
  path: '/dashboard',
  element: <MainLayout><DashboardPage /></MainLayout>,
}
```

3. **Add navigation:**
```typescript
// src/components/layout/Header.tsx
<Link to="/dashboard">Dashboard</Link>
```

### Add a New Redux Slice

1. **Create slice:**
```typescript
// src/store/slices/productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  loading: boolean;
}

const productSlice = createSlice({
  name: 'product',
  initialState: { products: [], loading: false },
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
```

2. **Add to store:**
```typescript
// src/store/index.ts
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    // ... existing reducers
    product: productReducer,
  },
});
```

### Create a New Form with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
});

type FormData = z.infer<typeof schema>;

export const ProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('title')} error={errors.title?.message} />
      <Input {...register('description')} />
      <Input {...register('price', { valueAsNumber: true })} type="number" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

---

## 🔧 API Integration

### Using the API Service

```typescript
// src/services/productService.ts
import { apiClient } from './api';

export const productService = {
  getProducts: () => apiClient.get('/products'),
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
  createProduct: (data: any) => apiClient.post('/products', data),
};
```

### With Redux Async Thunks

```typescript
// src/store/slices/productSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    return await productService.getProducts();
  }
);

// In component
const dispatch = useAppDispatch();
const { products, loading } = useAppSelector(state => state.product);

useEffect(() => {
  dispatch(fetchProducts());
}, []);
```

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy
Upload the `dist/` folder to your hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Type errors**
```bash
# Check TypeScript configuration
npm run build
```

**Issue: Tailwind classes not working**
- Ensure classes are in the safelist or used in files
- Check `tailwind.config.js` for content paths

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)

---

## 🎉 You're Ready!

Your React boilerplate is fully set up with:
- ✅ TypeScript
- ✅ Redux Toolkit for state management
- ✅ React Hook Form for forms
- ✅ Tailwind CSS for styling
- ✅ Example pages and components
- ✅ Best practices structure

Happy coding! 🚀


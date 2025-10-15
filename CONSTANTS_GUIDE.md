# 📋 Constants Configuration Guide

## ✅ All Constants Centralized!

All API URLs, storage keys, and configuration values are now centralized in `/src/config/constants.ts` for easy management.

---

## 📁 Available Constants

### 1. API Configuration

```typescript
// src/config/constants.ts

// API Base URL (from environment variable with fallback)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// API Endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
} as const;
```

### 2. App Configuration

```typescript
// App Information
export const APP_NAME = 'Your App Name';
export const APP_VERSION = '1.0.0';
```

### 3. Pagination Settings

```typescript
// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
```

### 4. Local Storage Keys

```typescript
// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
} as const;
```

---

## 🔧 How Constants Are Used

### ✅ 1. API Service (Using API_BASE_URL)

```typescript
// src/services/api.ts
import { API_BASE_URL } from '../config/constants';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }
  // ... rest of implementation
}

export const apiClient = new ApiClient(API_BASE_URL);
```

**Benefits:**
- ✅ Single source of truth for API URL
- ✅ Environment variable support
- ✅ Easy to change for different environments

### ✅ 2. User Service (Using API_ENDPOINTS)

```typescript
// src/services/userService.ts
import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/constants';
import type { User } from '../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    return apiClient.get<User[]>(API_ENDPOINTS.USERS);
  },

  getUserById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    return apiClient.post<User>(API_ENDPOINTS.USERS, userData);
  },
};
```

**Benefits:**
- ✅ No hardcoded URLs
- ✅ Consistent endpoint naming
- ✅ Easy to update all endpoints from one place

### ✅ 3. Auth Slice (Using API_ENDPOINTS & STORAGE_KEYS)

```typescript
// src/store/slices/authSlice.ts
import { API_ENDPOINTS, STORAGE_KEYS } from '../../config/constants';

const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  // ...
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginFormData) => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
    return data;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
);
```

**Benefits:**
- ✅ No magic strings
- ✅ Type-safe constants
- ✅ Consistent storage key naming

---

## 🌍 Environment Variables

### Setup `.env` File

```bash
# .env
VITE_API_BASE_URL=https://api.yourapp.com
VITE_APP_NAME=Your App
VITE_ENABLE_ANALYTICS=true
```

### How It Works

```typescript
// src/config/constants.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
//                           ↑ Environment variable           ↑ Fallback
```

**Priority:**
1. `.env` file value (if exists)
2. Fallback value in constants.ts

---

## 📝 Adding New Constants

### 1. Add API Endpoint

```typescript
// src/config/constants.ts
export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: { /* ... */ },
  // ✅ Add new endpoint
  PRODUCTS: '/products',
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: '/orders/:id',
  },
} as const;
```

### 2. Use in Service

```typescript
// src/services/productService.ts
import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/constants';

export const productService = {
  getProducts: () => apiClient.get(API_ENDPOINTS.PRODUCTS),
  getProductById: (id: string) => 
    apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`),
};
```

### 3. Add Storage Key

```typescript
// src/config/constants.ts
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  // ✅ Add new storage key
  CART: 'shopping_cart',
  LAST_VISIT: 'last_visit_timestamp',
} as const;
```

### 4. Use Storage Key

```typescript
// In any component or service
import { STORAGE_KEYS } from '../config/constants';

// Save
localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));

// Get
const cart = localStorage.getItem(STORAGE_KEYS.CART);
```

---

## 🎯 Best Practices

### ✅ DO's

1. **Always use constants for:**
   - ✅ API endpoints
   - ✅ Storage keys
   - ✅ Configuration values
   - ✅ Magic numbers/strings

2. **Import from constants:**
   ```typescript
   import { API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';
   ```

3. **Add environment variables:**
   ```typescript
   export const FEATURE_FLAG = import.meta.env.VITE_FEATURE_ENABLED === 'true';
   ```

### ❌ DON'Ts

1. **Never hardcode URLs:**
   ```typescript
   // ❌ Bad
   fetch('/api/users')
   
   // ✅ Good
   fetch(API_ENDPOINTS.USERS)
   ```

2. **Never use magic strings:**
   ```typescript
   // ❌ Bad
   localStorage.getItem('auth_token')
   
   // ✅ Good
   localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
   ```

3. **Never duplicate values:**
   ```typescript
   // ❌ Bad - same URL in multiple files
   const API_URL = 'https://api.example.com';
   
   // ✅ Good - import from constants
   import { API_BASE_URL } from '../config/constants';
   ```

---

## 📊 Current Setup Summary

### Files Using Constants

| File | Constants Used |
|------|---------------|
| `src/services/api.ts` | ✅ API_BASE_URL |
| `src/services/userService.ts` | ✅ API_ENDPOINTS.USERS |
| `src/store/slices/authSlice.ts` | ✅ API_ENDPOINTS.AUTH<br>✅ STORAGE_KEYS.AUTH_TOKEN |

### Available for Use

```typescript
// Import any of these
import { 
  API_BASE_URL,
  API_ENDPOINTS,
  APP_NAME,
  APP_VERSION,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  STORAGE_KEYS,
} from '../config/constants';
```

---

## 🔄 Different Environments

### Development
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
```

### Production
```bash
# .env.production
VITE_API_BASE_URL=https://api.production.com
```

### Testing
```bash
# .env.test
VITE_API_BASE_URL=https://api.staging.com
```

Vite automatically loads the correct `.env` file based on the mode!

---

## 🚀 Quick Reference

### Update API Base URL
```typescript
// Option 1: .env file (recommended)
VITE_API_BASE_URL=https://new-api.com

// Option 2: Update fallback in constants.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://new-api.com';
```

### Add New Endpoint
```typescript
// src/config/constants.ts
export const API_ENDPOINTS = {
  // ... existing
  NEW_FEATURE: '/new-feature',
} as const;
```

### Add New Storage Key
```typescript
// src/config/constants.ts
export const STORAGE_KEYS = {
  // ... existing
  NEW_DATA: 'new_data_key',
} as const;
```

---

## ✅ Benefits of This Approach

1. **Single Source of Truth**
   - All configuration in one place
   - Easy to find and update

2. **Type Safety**
   - `as const` provides literal types
   - Autocomplete support

3. **Environment Flexibility**
   - Easy to switch between dev/staging/prod
   - No code changes needed

4. **Maintainability**
   - Change once, updates everywhere
   - No scattered magic strings

5. **Team Collaboration**
   - Clear where to add new constants
   - Consistent naming conventions

---

## 📚 Examples

### Creating a New Service

```typescript
// src/services/orderService.ts
import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/constants';

export const orderService = {
  getOrders: () => apiClient.get(API_ENDPOINTS.ORDERS.LIST),
  createOrder: (data: any) => apiClient.post(API_ENDPOINTS.ORDERS.CREATE, data),
  getOrderById: (id: string) => 
    apiClient.get(API_ENDPOINTS.ORDERS.DETAIL.replace(':id', id)),
};
```

### Using in Component

```typescript
// src/components/Header.tsx
import { APP_NAME, APP_VERSION } from '../config/constants';

export const Header = () => {
  return (
    <header>
      <h1>{APP_NAME}</h1>
      <span>v{APP_VERSION}</span>
    </header>
  );
};
```

### Pagination Helper

```typescript
// src/utils/pagination.ts
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../config/constants';

export const getPaginationParams = (page: number, pageSize?: number) => {
  const size = Math.min(pageSize || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
  return { page, pageSize: size };
};
```

---

**All your API URLs and configuration are now centralized and easy to manage!** 🎉

Update `.env` or `src/config/constants.ts` to configure your app for different environments.


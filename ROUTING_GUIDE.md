# 🛣️ Routing Guide - Layout Routes Pattern

## ✅ Fixed: No More Repeated Layout Code!

Your routing now uses **React Router's Layout Routes** pattern - no more repeating `<MainLayout>` for every route!

---

## 📊 Before vs After

### ❌ Before (Repeated Code)

```typescript
// BAD: Layout repeated for every route
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,  // ❌ Repeated
  },
  {
    path: '/about',
    element: <MainLayout><AboutPage /></MainLayout>,  // ❌ Repeated
  },
  {
    path: '/counter',
    element: <MainLayout><CounterPage /></MainLayout>,  // ❌ Repeated
  },
]);
```

**Problems:**
- ❌ Code duplication
- ❌ Hard to maintain
- ❌ Layout re-renders on every route change
- ❌ More typing for new routes

### ✅ After (Layout Routes Pattern)

```typescript
// GOOD: Layout defined once, children inherit it
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,              // ✅ Layout defined once
    children: [                           // ✅ All children use this layout
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'counter',
        element: <CounterPage />,
      },
    ],
  },
  {
    // Routes without layout
    path: '/login',
    element: <LoginPage />,
  },
]);
```

**Benefits:**
- ✅ No code duplication
- ✅ Easy to maintain
- ✅ Layout persists (better performance)
- ✅ Less typing for new routes
- ✅ Clear separation of layout vs standalone pages

---

## 🔧 How It Works

### 1. Layout Component Uses `<Outlet />`

```typescript
// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />  {/* 👈 Child routes render here */}
      </main>
      <Footer />
    </div>
  );
};
```

**`<Outlet />`** is a placeholder that renders the matched child route.

### 2. Router Configuration

```typescript
// src/routes/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,  // Parent layout
    children: [               // Child routes
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);
```

### 3. What Happens

```
Route: /          → Renders: MainLayout + HomePage
Route: /about     → Renders: MainLayout + AboutPage
Route: /counter   → Renders: MainLayout + CounterPage
Route: /login     → Renders: LoginPage (no layout)
```

---

## 📝 Adding New Routes

### With Layout (Using Nested Routes)

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'counter', element: <CounterPage /> },
      
      // ✅ Add new route with layout
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
```

### Without Layout (Standalone)

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [/* ... */],
  },
  
  // ✅ Standalone pages (no layout)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  
  // Add more standalone pages
  { path: '/404', element: <NotFoundPage /> },
  { path: '/welcome', element: <WelcomePage /> },
]);
```

---

## 🎨 Multiple Layouts

You can have different layouts for different sections:

```typescript
const router = createBrowserRouter([
  {
    // Public routes with MainLayout
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    // Admin routes with AdminLayout
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    // Auth routes (no layout)
    path: '/login',
    element: <LoginPage />,
  },
]);
```

---

## 🔐 Protected Routes

Combine layouts with protected routes:

```typescript
// Create a ProtectedRoute component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Use in router
const router = createBrowserRouter([
  {
    // Public routes
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    // Protected routes
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
```

---

## 🚀 Advanced Patterns

### 1. Nested Layouts

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        // Nested layout for settings section
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          { index: true, element: <GeneralSettings /> },
          { path: 'security', element: <SecuritySettings /> },
          { path: 'billing', element: <BillingSettings /> },
        ],
      },
    ],
  },
]);
```

### 2. Dynamic Routes

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'users/:id', element: <UserProfile /> },
      { path: 'posts/:postId', element: <PostDetail /> },
    ],
  },
]);
```

### 3. Index Routes

```typescript
{
  path: '/',
  element: <MainLayout />,
  children: [
    { 
      index: true,           // ✅ Matches exactly '/'
      element: <HomePage /> 
    },
    { 
      path: 'about',         // ✅ Matches '/about'
      element: <AboutPage /> 
    },
  ],
}
```

**`index: true`** = default child route when parent path is matched

---

## 📊 Current Route Structure

```
/                    → MainLayout + HomePage
├── /about           → MainLayout + AboutPage
├── /counter         → MainLayout + CounterPage
│
/login               → LoginPage (standalone)
/register            → RegisterPage (standalone)
```

---

## 🎯 Best Practices

### ✅ DO's

1. **Use layout routes for shared layouts**
   ```typescript
   { path: '/', element: <MainLayout />, children: [...] }
   ```

2. **Use `<Outlet />` in layout components**
   ```typescript
   export const MainLayout = () => (
     <div>
       <Header />
       <Outlet />  {/* Child routes render here */}
       <Footer />
     </div>
   );
   ```

3. **Group related routes**
   ```typescript
   {
     path: '/dashboard',
     element: <DashboardLayout />,
     children: [
       // All dashboard routes
     ],
   }
   ```

4. **Use index routes for defaults**
   ```typescript
   { index: true, element: <DefaultPage /> }
   ```

### ❌ DON'Ts

1. **Don't repeat layouts manually**
   ```typescript
   // ❌ Bad
   { path: '/about', element: <MainLayout><AboutPage /></MainLayout> }
   
   // ✅ Good
   { path: '/', element: <MainLayout />, children: [
     { path: 'about', element: <AboutPage /> }
   ]}
   ```

2. **Don't nest children in layout props**
   ```typescript
   // ❌ Bad
   <MainLayout children={<HomePage />} />
   
   // ✅ Good - use <Outlet />
   <MainLayout />  // with <Outlet /> inside
   ```

---

## 🔍 Debugging

### Check What's Rendering

```typescript
// In MainLayout
export const MainLayout = () => {
  console.log('MainLayout rendered');
  
  return (
    <div>
      <Header />
      <Outlet />  {/* This renders the child route */}
      <Footer />
    </div>
  );
};
```

### Access Route Data

```typescript
import { useLocation, useParams } from 'react-router-dom';

const location = useLocation();  // Current path
const params = useParams();      // URL parameters
```

---

## 📚 Summary

**Before:** Layout repeated for every route
```typescript
<MainLayout><HomePage /></MainLayout>
<MainLayout><AboutPage /></MainLayout>  // ❌ Repeated
```

**After:** Layout defined once with nested routes
```typescript
<MainLayout />  // ✅ Defined once
  children: [   // All children inherit the layout
    <HomePage />,
    <AboutPage />,
  ]
```

**Key Components:**
- **`<Outlet />`** - Renders matched child route
- **Layout Routes** - Parent routes that wrap children
- **Index Routes** - Default child route

---

## 🎉 Benefits Achieved

✅ **No Code Duplication** - Layout defined once
✅ **Better Performance** - Layout doesn't re-render on navigation
✅ **Easier Maintenance** - Update layout in one place
✅ **Cleaner Code** - Clear separation of concerns
✅ **Flexible** - Easy to add new routes
✅ **Scalable** - Support for multiple layouts and nested routes

---

**Your routing is now optimized using React Router best practices!** 🚀


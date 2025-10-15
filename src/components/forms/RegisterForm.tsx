import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MuiButton, MuiInput } from '../common';

// Define validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // Call your registration API
      console.log('Registration data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Registration successful!');
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>

      <MuiInput
        {...register('name')}
        type="text"
        label="Full Name"
        placeholder="Enter your name"
        error={errors.name?.message}
      />

      <MuiInput
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <MuiInput
        {...register('password')}
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        helperText="Must be at least 8 characters with uppercase, lowercase, and number"
      />

      <MuiInput
        {...register('confirmPassword')}
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
      />

      <MuiButton
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Register
      </MuiButton>
    </form>
  );
};


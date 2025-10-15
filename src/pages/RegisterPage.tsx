import { RegisterForm } from '../components/forms';
import { Card } from '../components/common';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md" padding="lg">
        <RegisterForm />
      </Card>
    </div>
  );
};


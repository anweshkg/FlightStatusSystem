import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Login</h1>
      <LoginForm />
    </div>
  );
}
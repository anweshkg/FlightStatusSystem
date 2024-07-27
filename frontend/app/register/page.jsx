import RegisterForm from '../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Register</h1>
      <RegisterForm />
    </div>
  );
}
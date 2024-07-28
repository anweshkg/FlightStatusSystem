import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Flight Status System</h1>
      <SearchForm />
    </div>
  );
}
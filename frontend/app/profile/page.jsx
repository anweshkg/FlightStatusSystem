import ProfileForm from '../../components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Your Profile</h1>
      <ProfileForm />
    </div>
  );
}
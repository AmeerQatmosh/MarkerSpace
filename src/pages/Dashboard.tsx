import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">
        Welcome to the Dashboard{user?.name ? `, ${user.name}` : ""}!
      </h1>
      <p className="mt-4 text-lg">
        Here’s a quick overview of your productivity tools.
      </p>
    </div>
  );
}

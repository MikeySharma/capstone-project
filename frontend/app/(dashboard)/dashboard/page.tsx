import DashboardPage from "@/components/dashboard/DashboardPage";

export default function Home() {
  return (
    <DashboardPage>
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to SilentWords!</h1>
        <p className="text-gray-700">
          Learn sign language effectively through our interactive courses.
        </p>
      </div>
    </DashboardPage>
  );
}

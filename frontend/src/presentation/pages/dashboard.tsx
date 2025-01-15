import AgencyList from "../components/agencyList/agencyList";
import { LogoutButton } from "../components/logoutButton/logoutButton";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('./public/assets/praia.jpg')" }}>
      <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white bg-opacity-100 fixed top-0 left-0 right-0">
        <h1 className="text-xl font-bold">Dashboard de agências</h1>
        <LogoutButton />
      </header>
      <main className="flex-1 w-full mx-auto p-4 bg-white bg-opacity-0 rounded-lg shadow-lg mt-16">
        <AgencyList />
      </main>
    </div>
  );
}
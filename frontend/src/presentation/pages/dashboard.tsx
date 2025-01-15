import AgencyList from "../components/agencyList/agencyList";
import { CreateAgency } from "../components/createAgency/createAgency";
import { LogoutButton } from "../components/logoutButton/logoutButton";

export function Dashboard() {
  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center relative">
      <AgencyList/>
      <div className="absolute top-4 right-4 md:right-2 lg:right-12">
        <CreateAgency />
      </div>
      <div className="absolute top-4 left-4 md:left-2 lg:left-12">
        <LogoutButton />
      </div>
      
    </div>
  );
}

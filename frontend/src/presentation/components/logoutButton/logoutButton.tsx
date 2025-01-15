import { Button } from "@/presentation/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); 
    sessionStorage.removeItem("userData");

    navigate("/");
  };

  return (
    <Button
      className="rounded-full bg-red-500 text-white hover:bg-red-400 transition-colors duration-200"
      onClick={handleLogout}
    >
      Sair
    </Button>
  );
}
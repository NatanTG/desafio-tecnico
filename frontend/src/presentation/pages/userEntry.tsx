import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import { Card } from "@/presentation/components/ui/card";
import { LoginForm } from "@/presentation/components/login/login";
import { RegisterForm } from "@/presentation/components/register/register";

export function UserEntry() {
  const [activeTab, setActiveTab] = useState<string>("login");

  const handleRegisterSuccess = () => {
    setActiveTab("login");
  };

  const handleLoginSuccess = () => {
    setActiveTab("register");
  };

  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./public/caraguatatuba.jpg')" }}>
      <Card className="bg-white bg-opacity-90 shadow-2xl rounded-3xl w-[400px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-around bg-gray-100 rounded-t-3xl p-4">
            <TabsTrigger value="register" className={`font-semibold text-lg ${activeTab === "register" ? "text-gray-600 border-b-2 border-gray-600" : "text-gray-600"}`}>
              Registro
            </TabsTrigger>
            <TabsTrigger value="login" className={`font-semibold text-lg ${activeTab === "login" ? "text-gray-600 border-b-2 border-gray-600" : "text-gray-600"}`}>
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="p-6">
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          </TabsContent>

          <TabsContent value="login" className="p-6">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

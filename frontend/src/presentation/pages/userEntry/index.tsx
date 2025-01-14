import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardFooter } from "@/presentation/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/presentation/components/ui/radio-group";
import { useForm } from "react-hook-form";

export function TabsDemo() {
  const { reset } = useForm();
  const [activeTab, setActiveTab] = useState<string>("register");
  const [role, setRole] = useState<string>("");

  const handleRegister = () => {
    setActiveTab("login");
    setRole("");
    reset();
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setRole("");
    reset();
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('./public/caraguatatuba.jpg')" }}
    >
      <Card className="bg-white bg-opacity-90 shadow-2xl rounded-3xl w-[400px]">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="flex justify-around bg-gray-100 rounded-t-3xl p-4">
            <TabsTrigger
              value="register"
              className={`font-semibold text-lg ${
                activeTab === "register" ? "text-gray-600 border-b-2 border-gray-600" : "text-gray-600"
              }`}
            >
              Registro
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className={`font-semibold text-lg ${
                activeTab === "login" ? "text-gray-600 border-b-2 border-gray-600" : "text-gray-600"
              }`}
            >
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="p-6">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Digite seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Digite seu email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Digite sua senha" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-confirmation">Confirmar senha</Label>
                <Input id="password-confirmation" type="password" placeholder="Digite sua senha novamente" />
              </div>
              <div className="space-y-2">
                <Label>Selecione o tipo de usuário</Label>
                <RadioGroup value={role} onValueChange={setRole}>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="analyst" id="r1" />
                      <Label htmlFor="r1">Analista</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="r2" />
                      <Label htmlFor="r2">Admin</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
  <Button
    onClick={handleRegister}
    className="w-full rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
  >
    Fazer Cadastro
  </Button>
  <div className="text-center">
    <span>Já possui cadastro? </span>
    <Button
      variant="link"
      onClick={() => setActiveTab("login")}
      className="text-gray-600 hover:text-gray-800 transition-colors"
    >
      Faça login
    </Button>
  </div>
</CardFooter>
          </TabsContent>

          <TabsContent value="login" className="p-6">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" placeholder="Digite seu email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Senha</Label>
                <Input id="password-login" type="password" placeholder="Digite sua senha"/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-4">
  <Button
    className="w-full rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
  >
    Fazer login
  </Button>
  <div className="text-center">
    <span>Não possui cadastro? </span>
    <Button
      variant="link"
      onClick={() => setActiveTab("register")}
      className="text-gray-600 hover:text-gray-800 transition-colors"
    >
      Faça seu cadastro
    </Button>
  </div>
</CardFooter>

          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

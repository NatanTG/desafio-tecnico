import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { CardContent, CardFooter } from "@/presentation/components/ui/card";
import { UserServiceImpl } from "@/data/services/user/implementations/userServiceImpl";
import { useLogin } from "../../../hooks/useLoginHook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginData } from "@/domain/interfaces/loginInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/loginSchema";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const userService = new UserServiceImpl();
  const { mutateAsync: login } = useLogin(userService);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
      navigate("/agency");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleFormSubmit = (data: LoginData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Digite seu e-mail" 
            {...register("email")} 
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Digite sua senha" 
            {...register("password")} 
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <Button 
          type="submit"
          className="w-full rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
        >
          Entrar
        </Button>

        <div className="mt-4 text-sm text-center">
          <span className="text-gray-600">Não tem uma conta? </span>
          <button
            type="button"
            onClick={onLoginSuccess} 
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Cadastre-se
          </button>
        </div>
      </CardFooter>
    </form>
  );
}

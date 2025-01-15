import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { CardContent, CardFooter } from "@/presentation/components/ui/card";
import { useRegister } from "@/hooks/useRegisterHook";
import { UserServiceImpl } from "@/data/services/user/implementations/userServiceImpl";
import { RegisterData } from "@/domain/interfaces/registerFormInterface";
import { registerSchema } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit, 
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  
  const userService = new UserServiceImpl();
  const { mutateAsync: registerUser} = useRegister(userService);

  const onSubmit = async (data: RegisterData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    try {
      await registerUser(data)
      reset(); 
      onRegisterSuccess(); 
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  const handleRoleChange = (role: string) => {
    setValue("role", role); 
  };
  
  const handleFormSubmit = (data: RegisterData) => {
    onSubmit(data); 
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input 
            id="name" 
            placeholder="Digite seu nome" 
            {...register("name")} 
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message || 'Este campo é obrigatório'}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Digite seu email" 
            {...register("email")} 
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message || 'Este campo é obrigatório'}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Digite sua senha" 
            {...register("password")} 
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message || 'Este campo é obrigatório'}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Digite sua senha novamente" 
            {...register("confirmPassword")} 
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message || 'Este campo é obrigatório'}</span>}
        </div>

        <div className="space-y-2">
          <Label>Selecione o tipo de usuário</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="ANALYST"
                id="r1"
                {...register("role")}
                onChange={() => handleRoleChange("ANALYST")}
              />
              <Label htmlFor="r1">Analista</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="ADMIN"
                id="r2"
                {...register("role")}
                onChange={() => handleRoleChange("ADMIN")}
              />
              <Label htmlFor="r2">Admin</Label>
            </div>
          </div>
          {errors.role && <span className="text-red-500 text-sm">{'Este campo é obrigatório'}</span>}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <Button 
          type="submit"
          className="w-full rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
        >
          Fazer Cadastro
        </Button>

        <div className="mt-4 text-sm text-center">
          <span className="text-gray-600">Já tem conta? </span>
          <button
            type="button"
            onClick={onRegisterSuccess} 
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Faça login
          </button>
        </div>
      </CardFooter>
    </form>
  );
}

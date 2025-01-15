import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UserService } from "@/data/services/user/userService";
import { RegisterData } from "@/domain/interfaces/registerFormInterface"; 



export function useRegister(userService: UserService) {
  const mutation: UseMutationResult<void, Error, RegisterData> = useMutation({
    mutationFn: async (data) => {
      await userService.registerUser(data.email, data.password, data.confirmPassword, data.name, data.role);
    },
    onError: (error: Error) => {
      console.error("Erro ao registrar o usuário:", error);
    },
    onSuccess: () => {
      console.log("Usuário registrado com sucesso");
    },
  });

  return mutation;
}

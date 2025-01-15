
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { storeToken } from "@/config/utils/auth/storage"; 
import { UserService } from "@/data/services/user/userService"; 
import { LoginData } from "@/domain/interfaces/loginInterface";

export function useLogin(userService: UserService) {

  const mutation: UseMutationResult<string, Error, LoginData> = useMutation({
    mutationFn: async ({ email, password }: LoginData) => {
      const token = await userService.login(email, password);
     
      storeToken(token); 
      return token;
    },
    onError: (error: Error) => {
      
      console.error("Erro ao fazer login:", error);
    },
    onSuccess: (token: string) => {
      console.log("Token:", token);
      
    },
  });

  return mutation;
}

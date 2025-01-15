import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Agency } from "@/domain/interfaces/angecyInterface";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useCreateAgency } from "@/hooks/useCreateAgency"; 
import { AgencyServiceImpl } from "@/data/services/agency/implementations/agencyServiceImpl";
import { useEffect } from "react";

export function CreateAgency() {
  const {
    setValue,
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<Agency>();
  const agencyService = new AgencyServiceImpl();

  const { createAgency, isLoading, error, isSuccess } = useCreateAgency(agencyService);

  const handleStatusChange = (status: string) => {
    setValue("status", status);
  };

  const onSubmit = (data: Agency) => {
    createAgency(data); 
  };
  
  useEffect(() => {
    if (isSuccess) {
      reset();
       
    }
  }, [isSuccess, reset]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar agência</Button>
      </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] w-full">

        <DialogHeader>
          <DialogTitle>Criar Agência</DialogTitle>
          <DialogDescription>
            Preencha as informações para registrar uma nova agência.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Nome da agência"
                {...register("name", { required: "Nome é obrigatório" })}
                className="col-span-3"
              />
              {errors.name && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cnpj" className="text-right">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                maxLength={18}
                placeholder="00.000.000/0000-00"
                {...register("cnpj", {
                  required: "CNPJ é obrigatório",
                  pattern: {
                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                    message: "CNPJ inválido",
                  },
                })}
                className="col-span-3"
              />
              {errors.cnpj && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.cnpj.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stateRegistration" className="text-right">
                Registro de Inscrição
              </Label>
              <Input
                id="stateRegistration"
                maxLength={10}
                placeholder="Número de registro"
                {...register("stateRegistration", {
                  required: "Registro é obrigatório",
                })}
                className="col-span-3"
              />
              {errors.stateRegistration && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.stateRegistration.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Selecione o status</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="ACTIVE"
                    id="r1"
                    {...register("status") }
                    onChange={() => handleStatusChange("ACTIVE")}
                  />
                  <Label htmlFor="r1">APPROVED</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="INACTIVE"
                    id="r2"
                    {...register("status")}
                    onChange={() => handleStatusChange("INACTIVE")}
                  />
                  <Label htmlFor="r2">INACTIVE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="PENDING"
                    id="r3"
                    {...register("status")}
                    onChange={() => handleStatusChange("PENDING")}
                  />
                  <Label htmlFor="r3">PENDING</Label>
                </div>
              </div>
              {errors.status && <span className="text-red-500 text-sm">{'Este campo é obrigatório'}</span>}

            </div>

            {/* Data de Fundação */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="founded" className="text-right">
                Data de Fundação
              </Label>
              <Input
                id="founded"
                type="date"
                {...register("founded", {
                  required: "Data de fundação é obrigatória",
                })}
                className="col-span-3"
              />
              {errors.founded && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.founded.message}
                </p>
              )}
            </div>
          </div>

          {/* Feedback de Sucesso ou Erro */}
          {isSuccess && <p className="text-green-500">Agência criada com sucesso!</p>}
          {error && <p className="text-red-500">Erro ao criar agência: {error.message}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar agência"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

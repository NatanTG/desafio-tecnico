import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Agency } from "@/domain/interfaces/angecyInterface";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useCreateAgency } from "@/hooks/useCreateAgency";
import { AgencyServiceImpl } from "@/data/services/agency/implementations/agencyServiceImpl";
import InputMask from "react-input-mask"; 
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
        <Button className="bg-gray-500 text-white hover:bg-gray-400">Criar agência</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-full bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Criar Agência</DialogTitle>
          <DialogDescription className="text-gray-600">
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
              <InputMask
                mask="99.999.999/9999-99"
                placeholder="00.000.000/0000-00"
                {...register("cnpj", {
                  required: "CNPJ é obrigatório",
                  pattern: {
                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                    message: "CNPJ inválido",
                  },
                })}
                className="col-span-3 border border-gray-300 p-2 rounded"
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
              <InputMask
                mask="99.999.9999-9" 
                placeholder="00.000.0000-0"
                {...register("stateRegistration", {
                  required: "Registro é obrigatório",
                })}
                className="col-span-3 border border-gray-300 p-2 rounded"
              />
              {errors.stateRegistration && (
                <p className="col-span-4 text-red-500 text-sm">
                  {errors.stateRegistration.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="APPROVED"
                    id="r1"
                    {...register("status")}
                    onChange={() => handleStatusChange("APPROVED")}
                  />
                  <Label htmlFor="r1">APROVADO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="REJECTED"
                    id="r2"
                    {...register("status")}
                    onChange={() => handleStatusChange("REJECTED")}
                  />
                  <Label htmlFor="r2">REJEITADO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="PENDING"
                    id="r3"
                    {...register("status")}
                    onChange={() => handleStatusChange("PENDING")}
                  />
                  <Label htmlFor="r3">PENDENTE</Label>
                </div>
              </div>
              {errors.status && (
                <span className="col-span-4 text-red-500 text-sm">
                  Este campo é obrigatório
                </span>
              )}
            </div>

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

          {isSuccess && <p className="text-green-500">Agência criada com sucesso!</p>}
          {error && (
            <p className="text-red-500">Erro ao criar agência: {error.message}</p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gray-500 text-white hover:bg-gray-400"
            >
              {isLoading ? "Criando..." : "Criar agência"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Agency } from '@/domain/interfaces/angecyInterface';
import InputMask from 'react-input-mask';
import { Tabs, TabsContent } from '../ui/tabs';
import { Label } from '../ui/label';

export function AgencyCard({
  id,
  name,
  cnpj,
  stateRegistration,
  status,
  founded,
  onDelete,
  onSave,
}: Agency & { onSave: (updatedAgency: Agency) => void }) {
  const [tab, setTab] = useState("agencias");

  const [formData, setFormData] = useState({
    id,
    name,
    cnpj,
    stateRegistration,
    status,
    founded: '', 
  });

  useEffect(() => {
    if (founded) {
      setFormData((prevData) => ({
        ...prevData,
        founded: new Date(founded).toISOString().split('T')[0], 
      }));
    }
  }, [founded]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (status: string) => {
    setFormData((prevData) => ({
      ...prevData,
      status,
    }));
  };

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    const updatedFormData = {
      ...formData,
      founded: new Date(formData.founded).toISOString(), 
    };
    e.preventDefault();
    onSave(updatedFormData); 
    setTab("agencias");
  };

  const handleCancel = () => {
    setFormData({
      id,
      name,
      cnpj,
      stateRegistration,
      status,
      founded: new Date(founded).toISOString().split('T')[0], 
    });
    setTab("agencias");
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatStateRegistration = (stateRegistration: string) => {
    return stateRegistration.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3.$4-$5");
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      case "PENDING":
        return "Pendente";
      default:
        return status;
    }
  };

  const handleDelete  = () => {
    try {
      if (onDelete) {
       onDelete({ id });
      }
    } catch (error) {
      alert("Você não tem autorização");
    }
  };

  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="agencias">
          <Card className="shadow-lg bg-white bg-opacity-100"> 
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                CNPJ: {formatCNPJ(cnpj)} <br />
                Registro Estadual: {formatStateRegistration(stateRegistration)} <br />
                Status: {formatStatus(status)} <br />
                Fundada: {formatDate(new Date(founded).toISOString().split("T")[0])}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setTab("editar-agencia")} className="bg-gray-500 text-white hover:bg-gray-400">
                Editar
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="bg-gray-500 text-white hover:bg-gray-400">
                Excluir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="editar-agencia">
          <form onSubmit={handleSaveChanges}>
            <Card className="shadow-lg bg-white bg-opacity-100"> 
              <CardHeader>
                <CardTitle>Editar Agência</CardTitle>
                <CardDescription>
                  Altere as informações da agência abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <InputMask
                    mask="99.999.999/9999-99"
                    placeholder="00.000.000/0000-00"
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="stateReg">Registro Estadual</Label>
                  <InputMask
                    mask="99.999.9999-9" 
                    placeholder="00.000.0000-0"
                    id="stateReg"
                    name="stateRegistration"
                    value={formData.stateRegistration}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex flex-col space-y-2"> 
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="APPROVED"
                        id="r1"
                        checked={formData.status === "APPROVED"}
                        onChange={() => handleStatusChange("APPROVED")}
                      />
                      <Label htmlFor="r1">Aprovado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="REJECTED"
                        id="r2"
                        checked={formData.status === "REJECTED"}
                        onChange={() => handleStatusChange("REJECTED")}
                      />
                      <Label htmlFor="r2">Rejeitado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="PENDING"
                        id="r3"
                        checked={formData.status === "PENDING"}
                        onChange={() => handleStatusChange("PENDING")}
                      />
                      <Label htmlFor="r3">Pendente</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="founded">Fundada</Label>
                  <Input
                    id="founded"
                    name="founded"
                    type="date"
                    value={formData.founded} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button type="submit" className="bg-gray-500 text-white hover:bg-gray-400">Salvar Alterações</Button>
                <Button type="button" variant="secondary" onClick={handleCancel} className="bg-gray-500 text-white hover:bg-gray-400">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
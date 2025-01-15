import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Agency } from '@/domain/interfaces/angecyInterface';

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

  return (
    <div className="w-full sm:w-[400px] mx-auto">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="agencias">
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                CNPJ: {cnpj} <br />
                Registro Estadual: {stateRegistration} <br />
                Status: {status} <br />
                Fundada: {new Date(founded).toISOString().split("T")[0]}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setTab("editar-agencia")}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => onDelete && onDelete({ id })}>
                Excluir
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="editar-agencia">
          <form onSubmit={handleSaveChanges}>
            <Card>
              <CardHeader>
                <CardTitle>Editar Agência</CardTitle>
                <CardDescription>
                  Altere as informações da agência abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stateReg">Registro Estadual</Label>
                  <Input
                    id="stateReg"
                    name="stateRegistration"
                    value={formData.stateRegistration}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="founded">Fundada</Label>
                  <Input
                    id="founded"
                    name="founded"
                    type="date"
                    value={formData.founded} 
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button type="submit">Salvar Alterações</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>
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

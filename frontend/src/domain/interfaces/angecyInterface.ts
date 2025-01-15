

export interface AgenciesResponse {
  agency: Agency[]; 
}

export interface Agency {
  id: string;
  name: string;
  cnpj: string;
  stateRegistration: string;
  status: string;
  founded: string;
  onDelete?: (params: { id: string }) => void;
}


export interface Agency {
  id: string;
  name: string;
  cnpj: string;
  stateRegistration: string;
  status: string;
  founded: string;
  onDelete?: (params: { id: string }) => void;
}
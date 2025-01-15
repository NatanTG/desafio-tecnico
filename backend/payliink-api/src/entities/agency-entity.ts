import { AgencyStatus } from "@prisma/client";

export type AgencyProps = {
  id: string;
  name: string;
  status: AgencyStatus;
  cnpj: string;
  stateRegistration: string;
  founded: string;
}



export class AgencyEntity {
  private constructor(readonly props: AgencyProps){}

  public static create(name: string, status: AgencyStatus, cnpj: string, stateRegistration: string, founded: string): AgencyEntity {
      return new AgencyEntity({
        id: crypto.randomUUID().toString(),
        name,
        status,
        cnpj,
        stateRegistration,
        founded,
        
      })
  }

  public get id(){
    return this.props.id;
  }
  public get name(){
    return this.props.name;
  }
  public get status(){
    return this.props.status;
  }
  public get cnpj(){
    return this.props.cnpj;
  }
  public get stateRegistration(){
    return this.props.stateRegistration;
  }
  public get founded(){
    return this.props.founded;
  }
}

import { UserRole } from "@prisma/client";

export type UserProps = {
  id: string;
  name: string;
  password: string;
  role: UserRole;
};

export class UserEntity {
  private constructor(readonly props: UserProps) {}

  public static create(name: string, password: string, role: UserRole): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID().toString(),
      name,
      password,
      role,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get password() {
    return this.props.password;
  }

  public get role() {
    return this.props.role;
  }

}

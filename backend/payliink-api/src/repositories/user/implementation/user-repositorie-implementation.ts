import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../../../dtos/input/user/create-user-dto';
import { GetUserByIdDTO } from '../../../dtos/output/user/get-user-by-id-dto';
import { GetUserDTO } from '../../../dtos/output/user/get-user-dto';
import { UserRepository } from '../../../repositories/user/user-repositorie';
import bcrypt from 'bcryptjs'; 

export class UserRepositoryImplementation implements UserRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  static build(prisma: PrismaClient): UserRepository {
    return new UserRepositoryImplementation(prisma);
  }
  async createUser(createUserDTO: CreateUserDTO): Promise<GetUserByIdDTO> {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10); 

    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserDTO.name,
        email: createUserDTO.email,
        password: hashedPassword, 
        role: createUserDTO.role,
      },
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString(),
    };
  }

  
  async getUserByEmail(email: string): Promise<GetUserDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user
      ? {
          user: [
            {
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password,
              role: user.role,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            },
          ],
        }
      : null;
  }


}

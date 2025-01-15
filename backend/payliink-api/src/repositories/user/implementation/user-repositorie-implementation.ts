import { PrismaClient, Prisma } from '@prisma/client';
import { CreateUserDTO } from '../../../dtos/input/user/create-user-dto';
import { GetUserByIdDTO } from '../../../dtos/output/user/get-user-by-id-dto';
import { GetUserDTO } from '../../../dtos/output/user/get-user-dto';
import bcrypt from 'bcryptjs';
import { AppError } from '../../../config/utils/app-error';
import { UserRepository } from '../user-repositorie';
import { TokenProvider } from "../../../config/utils/auth/token-provider"; 

export class UserRepositoryImplementation implements UserRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  static build(prisma: PrismaClient): UserRepository {
    return new UserRepositoryImplementation(prisma);
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<GetUserByIdDTO | null> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

      const createdUser = await this.prisma.user.create({
        data: {
          name: createUserDTO.name,
          email: createUserDTO.email,
          password: hashedPassword,
          role: createUserDTO.role,
        },
      });

      return createdUser
        ? {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            createdAt: createdUser.createdAt.toISOString(),
            updatedAt: createdUser.updatedAt.toISOString(),
          }
        : null;
    } catch (error) {
      return error instanceof Prisma.PrismaClientKnownRequestError
        ? error.code === 'P2002'
          ? (() => { throw new AppError(`Email ${createUserDTO.email} is already in use.`, 400) })()
          : (() => { throw new AppError(error.message || 'Failed to create user. Please try again later.', 500) })()
        : error instanceof Error
        ? (() => { throw new AppError(error.message || 'Failed to create user. Please try again later.', 500) })()
        : (() => { throw new AppError('An unknown error occurred while creating user.', 500) })();
    }
  }

  async authenticateUser(email: string, password: string, tokenProvider: TokenProvider): Promise<string | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      return !user
        ? null
        : await bcrypt.compare(password, user.password)
        ? tokenProvider.generateToken(user.id)
        : null;
    } catch (error) {
      console.error("Error during user authentication:", error);
      return error instanceof Error
        ? (() => { throw new Error(error.message || 'Authentication failed. Please try again.') })()
        : (() => { throw new Error('An unknown error occurred during authentication.') })();
    }
  }
}

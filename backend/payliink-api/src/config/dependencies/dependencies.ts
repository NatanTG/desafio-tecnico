import { PrismaClient } from "@prisma/client";
import { AgencyController } from "../../app/express/controllers/agency-controller";
import { UserController } from "../../app/express/controllers/user-controller";
import { AgencyRepositoryImplementation } from "../../repositories/agency/implementations/agency-repositorie-impl";
import { UserRepositoryImplementation } from "../../repositories/user/implementation/user-repositorie-implementation";
import { AgencyServiceImplementation } from "../../services/agency/implementations/agency-service-implementation";
import { UserServiceImplementation } from "../../services/user/implementation/user-service-implementation";
import { AuthServiceImplementation } from "../../services/auth/implementation/auth-service-implementation";
const prisma = new PrismaClient();

const agencyRepository = AgencyRepositoryImplementation.build(prisma);

const agencyService = AgencyServiceImplementation.build(agencyRepository);

const agencyController = AgencyController.build(agencyService);



const userRepository = UserRepositoryImplementation.build(prisma);
const authService = new AuthServiceImplementation(userRepository);
const userService = UserServiceImplementation.build(userRepository, authService);
const userController = UserController.build(userService);

export { prisma, agencyRepository, agencyService, agencyController, userRepository, userService, userController, authService  };
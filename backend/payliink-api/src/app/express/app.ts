import express from 'express';
import { userController } from '../../config/dependencies/dependencies';

const app = express();

app.use(express.json());

// Rotas de usuário
app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/users/:id', (req, res) => userController.getUserById(req, res));
app.put('/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

// ...outras rotas...

export { app };

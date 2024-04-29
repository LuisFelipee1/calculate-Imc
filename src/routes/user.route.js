import { Router } from 'express';
import { UsersController } from '../controller/user.controller.js'

export const usersRoute = Router();
export const UsersContro = new UsersController();

usersRoute.get('/', UsersContro.getAllTasks);

usersRoute.delete('/:id', UsersContro.deleteTask);

usersRoute.patch('/:id', UsersContro.updateTask);

usersRoute.post('/', UsersContro.createTask);
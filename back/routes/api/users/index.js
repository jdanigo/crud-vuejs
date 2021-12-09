import express from "express";
import usersController from '../../../controllers/users';

const usersRouter = express.Router();

usersRouter.get('/', [
    usersController.getAllAction
]);

usersRouter.get('/:id', [
    usersController.getAction
]);

usersRouter.post('/', [
    usersController.createAction
]);

usersRouter.put('/:id', [
    usersController.updateAction
]);

usersRouter.delete('/:id', [
    usersController.deleteAction
]);

export default usersRouter;
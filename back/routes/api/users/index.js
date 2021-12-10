import express from "express";
import usersController from '../../../controllers/users';
import tokenMiddleware from '../../../middlewares/verifyToken';

const usersRouter = express.Router();

usersRouter.get('/', [
    tokenMiddleware.verify,
    usersController.getAllAction
]);

usersRouter.get('/:id', [
    tokenMiddleware.verify,
    usersController.getAction
]);

usersRouter.post('/', [
    usersController.createAction
]);

usersRouter.put('/:id', [
    tokenMiddleware.verify,
    usersController.updateAction
]);

usersRouter.delete('/:id', [
    tokenMiddleware.verify,
    usersController.deleteAction
]);

export default usersRouter;
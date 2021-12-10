import express from "express";
import productsController from '../../../controllers/products';
import tokenMiddleware from '../../../middlewares/verifyToken';

const productsRouter = express.Router();

productsRouter.get('/', [
    tokenMiddleware.verify,
    productsController.getAllAction
]);

productsRouter.get('/:id', [
    tokenMiddleware.verify,
    productsController.getAction
]);

productsRouter.post('/', [
    tokenMiddleware.verify,
    productsController.createAction
]);

productsRouter.put('/:id', [
    tokenMiddleware.verify,
    productsController.updateAction
]);

productsRouter.delete('/:id', [
    tokenMiddleware.verify,
    productsController.deleteAction
]);

export default productsRouter;
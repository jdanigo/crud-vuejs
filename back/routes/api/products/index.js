import express from "express";
import productsController from '../../../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/', [
    productsController.getAction
]);

productsRouter.get('/:id', [
    productsController.getAllAction
]);

productsRouter.post('/', [
    productsController.createAction
]);

productsRouter.put('/:id', [
    productsController.updateAction
]);

productsRouter.delete('/:id', [
    productsController.deleteAction
]);

export default productsRouter;
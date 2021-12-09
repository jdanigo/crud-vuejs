import express from "express";
import usersRouter from './users';
import authRouter from './auth';
import productsRouter from './products';

const apiRouter = express.Router();
// api route -> /api/v1/
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
import express from "express";
import usersRouter from './users';
import authRouter from './auth';
import productsRouter from './products';
import uploadRouter from './uploads';

const apiRouter = express.Router();
// api route -> /api
apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/uploads', uploadRouter);

export default apiRouter;
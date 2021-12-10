import express from "express";
import uploadsController from '../../../controllers/uploads';
import tokenMiddleware from '../../../middlewares/verifyToken';
import upload from '../../../middlewares/uploadImages';

const uploadRouter = express.Router();
const uploadFile = upload.single('UploadSingleFile');

uploadRouter.post('/', [
    // tokenMiddleware.verify,
    uploadFile,
],uploadsController.uploadFileAction);

export default uploadRouter;
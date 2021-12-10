import multer from 'multer';
import fileExtension from 'file-extension';
import cors from 'cors';

const storage = multer.diskStorage({

  // Setting directory on disk to save uploaded files
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  // Setting name of file saved
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${fileExtension(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    // Setting Image Size Limit to 5MBs
    fileSize: 500000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|mp4)$/)) {
      // Error
      //cb(new Error('Please upload JPG,PNG and PDF files only!'));
      cb('Error Please upload JPG,PNG,PDF AND MP4 files only', false);
    }
    // Success
    cb(undefined, true);
  },
});
export default upload;

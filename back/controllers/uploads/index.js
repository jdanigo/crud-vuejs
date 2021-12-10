const uploadsController = {};

uploadsController.uploadFileAction = async (req, res) => {
    const { file } = req;
    console.log(file);
    if (file != undefined) {
      const params = {
        src: file.path,
        type: file.mimetype,
      };
      res.status(200).json({
        data: params,
        message: 'File Successfully Uploaded'
      });
    }
};

export default uploadsController;

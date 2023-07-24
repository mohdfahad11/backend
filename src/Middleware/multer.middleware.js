import multerPkg  from 'multer'
const  multer = multerPkg
const upload = multer({ dest: './public/images/'})

export const uploadFile = upload.any()

export const uploadNoFile = upload.none()
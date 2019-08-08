import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import {
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    S3_REGION,
    S3_BUCKET,
} from '../../../env'

aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: S3_REGION
})

const s3 = new aws.S3()

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        key: function (req, file, next) {
            next(null, file.originalname) //use Date.now() for unique file keys
        }
    })
})

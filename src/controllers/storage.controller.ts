import { inject } from '@loopback/core'
import multer from 'multer'
import { authenticate } from '@loopback/authentication'
import { RestBindings } from '@loopback/rest'
import { requestBody } from '@loopback/rest'
import { HttpErrors } from '@loopback/rest'
import { Response } from '@loopback/rest'
import { Request } from '@loopback/rest'
import { param } from '@loopback/rest'
import { post } from '@loopback/rest'
import { oas } from '@loopback/rest'
import { get } from '@loopback/rest'
import * as spect from './spects/storage.spect'
import { StorageService } from '../services'
import { StorageBindings } from '../keys'

@authenticate('jwt')
export class StorageController {
    constructor(@inject(StorageBindings.SERVICE) public storage: StorageService) {}

    @post('/api/storage/image', spect.responseOneUrl())
    async fileUpload(
        @requestBody.file({ description: 'Upload image' }) req: Request,
        @inject(RestBindings.Http.RESPONSE) res: Response
    ): Promise<object> {
        const storage = this.storage.getEngine(req, res)
        const upload = multer({
            fileFilter: function (request, file, cb) {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('ONLY_IMAGES_ARE_ALLOWED'))
                }
                cb(null, true)
            },
            storage
        })
        try {
            return await new Promise<object>((resolve, reject) => {
                // eslint-disable-next-line
                upload.single('file')(req, res, (err: any) => {
                    const file: Express.Multer.File = req.file
                    if (err) {
                        return reject(err.message || err)
                    }
                    if (!file) {
                        return reject('NO_IMAGE_FILE')
                    }
                    const url = `/image/${file.filename}`
                    resolve({ url })
                })
            })
        } catch (error) {
            throw new HttpErrors.Conflict(error)
        }
    }

    @authenticate.skip()
    @get('/image/{filename}')
    @oas.response.file()
    downloadFile(
        @param.path.string('filename') fileName: string,
        @inject(RestBindings.Http.RESPONSE) response: Response
    ) {
        const file = this.storage.getSandbox(fileName)
        response.sendFile(file)
        return response
    }
}

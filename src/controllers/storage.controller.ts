import { inject } from '@loopback/core'
import { RestBindings } from '@loopback/rest'
import { requestBody } from '@loopback/rest'
import { HttpErrors } from '@loopback/rest'
import { Response } from '@loopback/rest'
import { Request } from '@loopback/rest'
import { param } from '@loopback/rest'
import { post } from '@loopback/rest'
import { oas } from '@loopback/rest'
import { get } from '@loopback/rest'
import path from 'path'
import { StorageBindings } from '../keys'
import { StorageHandler } from '../services/storage.service'

/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class StorageController {
    /**
     * Constructor
     * @param handler - Inject an express request handler to deal with the request
     */
    constructor(
        @inject(StorageBindings.SERVICE) private handler: StorageHandler,
        @inject(StorageBindings.DIRECTORY) private storageDirectory: string
    ) {}

    @post('/api/files', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object'
                        }
                    }
                },
                description: 'Files and fields'
            }
        }
    })
    async fileUpload(
        @requestBody.file() request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response
    ): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this.handler(request, response, (err: unknown) => {
                if (err) reject(err)
                else {
                    resolve(StorageController.getFilesAndFields(request))
                }
            })
        })
    }

    @get('/files/{filename}')
    @oas.response.file()
    downloadFile(
        @param.path.string('filename') fileName: string,
        @inject(RestBindings.Http.RESPONSE) response: Response
    ) {
        const file = this.validateFileName(fileName)
        response.sendFile(file)
        return response
    }

    /**
     * Validate file names to prevent them goes beyond the designated directory
     * @param fileName - File name
     */
    private validateFileName(fileName: string) {
        const resolved = path.resolve(this.storageDirectory, fileName)
        if (resolved.startsWith(this.storageDirectory)) return resolved
        // The resolved file is outside sandbox
        throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`)
    }

    /**
     * Get files and fields for the request
     * @param request - Http request
     */
    private static getFilesAndFields(request: Request) {
        const uploadedFiles = request.files
        const mapper = (f: globalThis.Express.Multer.File) => ({
            fieldname: f.fieldname,
            originalname: f.originalname,
            encoding: f.encoding,
            mimetype: f.mimetype,
            size: f.size
        })
        let files: object[] = []
        if (Array.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper)
        } else {
            for (const filename in uploadedFiles) {
                files.push(...uploadedFiles[filename].map(mapper))
            }
        }
        return { files, fields: request.body }
    }
}

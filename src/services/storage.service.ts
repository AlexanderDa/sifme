import { bind } from '@loopback/core'
import { BindingScope } from '@loopback/core'
import { config } from '@loopback/core'
import { ContextTags } from '@loopback/core'
import { Provider } from '@loopback/core'
import multer from 'multer'
import { StorageBindings } from '../keys'
import { RequestHandler } from 'express-serve-static-core'

export type StorageHandler = RequestHandler

/**
 * A provider to return an `Express` request handler from `multer` middleware
 */
@bind({
    scope: BindingScope.TRANSIENT,
    tags: { [ContextTags.KEY]: StorageBindings.SERVICE }
})
export class StorageProvider implements Provider<StorageHandler> {
    constructor(@config() private options: multer.Options = {}) {
        if (!this.options.storage) {
            // Default to in-memory storage
            this.options.storage = multer.memoryStorage()
        }
    }

    value(): StorageHandler {
        return multer(this.options).any()
    }
}

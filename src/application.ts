import { BootMixin } from '@loopback/boot'
import { AuthenticationComponent } from '@loopback/authentication'
import { registerAuthenticationStrategy } from '@loopback/authentication'
import { ApplicationConfig, BindingKey } from '@loopback/core'
import { RestExplorerBindings } from '@loopback/rest-explorer'
import { RestExplorerComponent } from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { AccountBindings, EmailBindings, StorageBindings } from './keys'
import { UserBindings } from './keys'
import { PasswordBindings } from './keys'
import { TokenBindings } from './keys'
import { appInfo, AppInfo } from './utils/app.info'
import { JWTAuthenticationStrategy } from './auth'
import { SECURITY_SCHEME_SPEC } from './auth'
import { MyAccountService, BcryptHasher, MyEmailService } from './services'
import { MyUserService } from './services'
import { JWTService } from './services'
import { TOKEN, SERVER } from './configs'
import multer from 'multer'

/**
 * Information from package.json
 */

export const PackageKey = BindingKey.create<AppInfo>('application.package')

export { ApplicationConfig }

export class Application extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication))
) {
    constructor(options: ApplicationConfig = {}) {
        super(options)

        this.api({
            openapi: '3.0.0',
            info: {
                title: appInfo.name,
                version: appInfo.version,
                description: appInfo.description
            },
            paths: {},
            components: { securitySchemes: SECURITY_SCHEME_SPEC },
            servers: [{ url: '/' }]
        })

        this.setUpBindings()

        // Bind authentication component related elements
        this.component(AuthenticationComponent)

        registerAuthenticationStrategy(this, JWTAuthenticationStrategy)

        // Set up the custom sequence
        this.sequence(MySequence)
        // Set up default home page
        this.static('/', path.join(__dirname, '../public/client'))

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/api/explorer'
        })
        this.component(RestExplorerComponent)

        // Configure file upload with multer options
        this.configureFileUpload()

        this.projectRoot = __dirname
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true
            }
        }
    }

    setUpBindings(): void {
        // Bind package.json to the application context
        this.bind(PackageKey).to(appInfo)

        // token service
        this.bind(TokenBindings.SECRET).to(TOKEN.secret)
        this.bind(TokenBindings.EXPIRES_IN).to(TOKEN.expiresIn)
        this.bind(TokenBindings.SERVICE).toClass(JWTService)

        // Bind bcrypt hash services
        this.bind(PasswordBindings.ROUNDS).to(10)
        this.bind(PasswordBindings.HASHER).toClass(BcryptHasher)

        // User service
        this.bind(UserBindings.SERVICE).toClass(MyUserService)

        // Account services
        this.bind(AccountBindings.SERVICE).toClass(MyAccountService)

        // Email service
        this.bind(EmailBindings.SERVICE).toClass(MyEmailService)
    }

    protected configureFileUpload() {
        // Upload files to `.sandbox` by default
        const destination: string = SERVER.sandbox
        this.bind(StorageBindings.DIRECTORY).to(destination)
        const multerOptions: multer.Options = {
            storage: multer.diskStorage({
                destination,
                // Use the original file name as is
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                }
            })
        }
        // Configure the file upload service with multer options
        this.configure(StorageBindings.SERVICE).to(multerOptions)
    }
}

import { BindingKey } from '@loopback/context'
import { TokenService } from '@loopback/authentication'
import { UserService } from '@loopback/authentication'
import { Credentials } from './utils/credentials'
import { User } from './models'
import { DecryptedHasher } from './services'
import { EmailService } from './services'
import { AccountService } from './services'
import { StorageService } from './services'

export namespace TokenBindings {
    export const SECRET = BindingKey.create<string>('authentication.jwt.secret')
    export const EXPIRES_IN = BindingKey.create<string>(
        'authentication.jwt.expires.in.seconds'
    )
    export const SERVICE = BindingKey.create<TokenService>(
        'services.authentication.jwt.tokenservice'
    )
}

export namespace PasswordBindings {
    export const HASHER = BindingKey.create<DecryptedHasher>('services.hasher')
    export const ROUNDS = BindingKey.create<number>('services.hasher.round')
}

export namespace UserBindings {
    export const SERVICE = BindingKey.create<UserService<User, Credentials>>(
        'services.user.service'
    )
}

export namespace AccountBindings {
    export const SERVICE = BindingKey.create<AccountService>('services.account.service')
}

export namespace EmailBindings {
    export const SERVICE = BindingKey.create<EmailService>('services.email.service')
}

export namespace StorageBindings {
    export const SERVICE = BindingKey.create<StorageService>('services.storage.service')
}

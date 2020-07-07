import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {SifmePgcDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.sifmePGC') dataSource: SifmePgcDataSource) {
    super(User, dataSource);
  }
}

export class SimpleUserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.sifmePGC') dataSource: SifmePgcDataSource) {
    super(User, dataSource);
  }
}

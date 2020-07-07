import {Role, User} from '../models';
import {ADMIN} from './roles';
import {MEDICO} from './roles';
import {NURSING} from './roles';

/**
 * Allowed roles.
 */
export const DEFAULT_ROLES: Role[] = [
  new Role({id: ADMIN.ID, name: ADMIN.NAME}),
  new Role({id: MEDICO.ID, name: MEDICO.NAME}),
  new Role({id: NURSING.ID, name: NURSING.NAME}),
];

/**
 * Default admin user
 */

export const DEFAULT_ADMIN: User = new User({
  email: 'admin@sifme.com',
  password: 'adminP4$$',
  createdBy: 0,
  isActive: true,
  emailVerified: true,
  roleId: ADMIN.ID,
});

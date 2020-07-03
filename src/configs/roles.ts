import {Role} from '../models';

export namespace ADMIN {
  export const ID = 1;
  export const NAME = 'Administración';
}
export namespace MEDICO {
  export const ID = 2;
  export const NAME = 'Médico';
}

export namespace NURSING {
  export const ID = 3;
  export const NAME = 'Enfermería';
}

/**
 * Allowed roles.
 */
export const ROLES: Role[] = [
  new Role({id: ADMIN.ID, name: ADMIN.NAME}),
  new Role({id: MEDICO.ID, name: MEDICO.NAME}),
  new Role({id: NURSING.ID, name: NURSING.NAME}),
];

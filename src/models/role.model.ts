import {model, property, Entity} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {},
    indexes: {
      uniqueName: {
        keys: {name: 1},
        options: {unique: true},
      },
    },
  },
})
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 25,
    postgresql: {
      dataType: 'character varying',
      dataLength: 25,
      nullable: 'NO',
    },
  })
  name: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Base extends Entity {
  @property({
    type: 'date',
    required: true,
    default: new Date(),
  })
  createdAt: string;

  @property({
    type: 'number',
    required: true,
  })
  createdBy: number;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  deleted: boolean;

  @property({
    type: 'date',
    required: false,
  })
  deletedAt: string;

  @property({
    type: 'number',
    required: false,
  })
  deletedBy: number;

  constructor(data?: Partial<Base>) {
    super(data);
  }
}

export interface BaseRelations {
  // describe navigational properties here
}

export type BaseWithRelations = Base & BaseRelations;

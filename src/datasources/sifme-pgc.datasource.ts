import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {SIFMEPGC} from '../configs';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SifmePgcDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sifmePGC';
  static readonly defaultConfig = SIFMEPGC;

  constructor(
    @inject('datasources.config.sifmePGC', {optional: true})
    dsConfig: object = SIFMEPGC,
  ) {
    super(dsConfig);
  }
}

import {repository} from '@loopback/repository';
import {Application} from '../application';
import {SifmePgcDataSource} from '../datasources';
import {RoleRepository} from '../repositories';
import {Role} from '../models';
import {ROLES} from '../configs';

/**
 * Migrate defaults to the database
 */
class DefaultValues {
  @repository(RoleRepository) public roleRepository: RoleRepository;
  constructor() {
    this.roleRepository = new RoleRepository(new SifmePgcDataSource());
  }

  /**
   * Migrate defaults
   */
  public async migrate(): Promise<void> {
    await this.defaultRoles();
  }

  /**
   * Migrate defaults user roles
   */
  private async defaultRoles(): Promise<void> {
    // Migrate roles
    for (const role of ROLES) {
      if (!(await this.roleRepository.exists(role.id))) {
        const saved: Role = await this.roleRepository.create(role);
        console.log('migrated: ', saved);
      }
    }
  }
}

/**
 * Migrate defaults to the database
 */
export default async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  //Migrate the database
  const app = new Application();
  await app.boot();
  await app.migrateSchema({existingSchema});

  // Migrate default values
  const values: DefaultValues = new DefaultValues();
  await values.migrate();

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

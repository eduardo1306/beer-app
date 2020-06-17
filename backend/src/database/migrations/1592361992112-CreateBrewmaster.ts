import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBrewmaster1592361992112
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'brewmaster',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'socialMedia_id',
            type: 'int',
          },
          {
            name: 'beer_id',
            type: 'int',
          },
          {
            name: 'latitude',
            type: 'real',
          },
          {
            name: 'longitude',
            type: 'real',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('brewmaster');
  }
}

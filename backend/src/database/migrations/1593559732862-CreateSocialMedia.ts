import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { query } from 'express';

export default class CreateSocialMedia1593559732862
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'socialMedia',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'socialMedia_url',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('socialMedia');
  }
}

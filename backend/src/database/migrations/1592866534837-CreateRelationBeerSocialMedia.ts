import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationBeerSocialMedia1592866534837
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brewer',
      new TableColumn({
        name: 'beer_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'brewer',
      new TableColumn({
        name: 'socialMedia_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'brewer',
      new TableForeignKey({
        columnNames: ['beer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'beer',
        name: 'BrewerRelatedWithBeer',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'brewer',
      new TableForeignKey({
        columnNames: ['socialMedia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'socialMedia',
        name: 'BrewerRelatedWithSocialMedia',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('brewer', 'BrewerRelatedWithBeer');
    await queryRunner.dropForeignKey('brewer', 'BrewerRelatedWithSocialMedia');
    await queryRunner.dropColumn('brewer', 'beer_id');
    await queryRunner.dropColumn('brewer', 'socialMedia_id');
  }
}

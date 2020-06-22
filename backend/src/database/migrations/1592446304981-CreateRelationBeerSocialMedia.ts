import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationBeerSocialMedia1592446304981
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brewmaster',
      new TableColumn({
        name: 'beer_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'brewmaster',
      new TableColumn({
        name: 'socialMedia_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'brewmaster',
      new TableForeignKey({
        columnNames: ['socialMedia_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'socialMedia',
        name: 'BrewmasterRelatedWithSocialMedia',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'brewmaster',
      new TableForeignKey({
        columnNames: ['beer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'beer',
        name: 'BrewmasterRelatedWithBeer',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('brewmaster', 'BrewmasterRelatedWithBeer');
    await queryRunner.dropForeignKey(
      'brewmaster',
      'BrewmasterRelatedWithSocialMedia',
    );
  }
}

import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationBeerSocialMedia1594167600838
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'beer',
      new TableColumn({
        name: 'brewer_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'beer',
      new TableForeignKey({
        columnNames: ['brewer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brewer',
        name: 'beersByBrewer',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brewer', 'beer_id');
    await queryRunner.dropForeignKey('brewer', 'beersByBrewer');
  }
}

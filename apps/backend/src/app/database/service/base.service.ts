import * as _ from 'lodash';
import {
  AggregateOptions,
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Model,
  Order,
  Transaction,
  UpsertOptions,
  WhereOptions,
} from 'sequelize';
import { Repository, Sequelize } from 'sequelize-typescript';
import {
  plainEntitiesGetter,
  plainEntityGetter,
} from '../../utils/sequelie-plain-entities';

const humanizeTableName = (name: string) => _.capitalize(_.lowerCase(name));

export abstract class BaseService<T extends Model, K> {
  protected abstract repository: Repository<T>;
  private defaultSortOrder: Order = [['id', 'DESC']];
  public plainEntityGetter = (entity) => plainEntityGetter<K>(entity);
  public plainEntitiesGetter = (entities) => plainEntitiesGetter<K>(entities);

  public async add(
    entity: Partial<K>,
    transaction?: Transaction,
    options?: CreateOptions<T['_attributes']>
  ) {
    return this.repository
      .create(entity as any, { transaction, ...options })
      .then(this.plainEntityGetter);
  }

  // public async bulkDelete(
  //   entitiesToDelete: number[] | string[],
  //   transaction?: Transaction
  // ) {
  //   return this.repository.destroy({
  //     where: { id: entitiesToDelete },
  //     transaction,
  //   });
  // }

  public async upsert(
    entity: Partial<K>,
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction
  ) {
    return this.repository
      .findOne({
        where: entitiesToFilterFrom,
        transaction,
      })
      .then((result) => {
        if (result) {
          // INFO: Update the Field
          return result
            .update(entity, { transaction })
            .then(this.plainEntityGetter);
        }
        // INFO: Create the Field
        return this.repository
          .create(entity as any, { transaction })
          .then(this.plainEntityGetter);
      });
  }

  public async bulkAdd(
    entities: Array<Partial<K>>,
    transaction?: Transaction,
    bulkCreateOptions?: BulkCreateOptions<T>
  ) {
    return this.repository
      .bulkCreate(entities as any, { transaction, ...bulkCreateOptions })
      .then(this.plainEntitiesGetter);
  }

  public async getAll(transaction?: Transaction, findOptions?: FindOptions<T>) {
    return this.repository
      .findAll({
        transaction,
        ...findOptions,
        order: this.getSortOrder(findOptions),
      })
      .then(this.plainEntitiesGetter);
  }
  public async getAllWhere(
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction,
    findOptions?: FindOptions
  ) {
    return this.repository
      .findAll({
        where: entitiesToFilterFrom,
        transaction,
        ...findOptions,
        order: this.getSortOrder(findOptions),
      })
      .then(this.plainEntitiesGetter);
  }
  public async get(id: number, transaction?: Transaction) {
    return this.repository
      .findByPk(id, { rejectOnEmpty: this.createNotFoundError(), transaction })
      .then(this.plainEntityGetter);
  }
  public async getOneWhere(
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction,
    findOptions?: FindOptions,
    throwError = true
  ) {
    return this.repository
      .findOne({
        where: entitiesToFilterFrom,
        // rejectOnEmpty: throwError && this.createNotFoundError(),
        transaction,
        ...findOptions,
      })
      .then(this.plainEntityGetter);
  }
  public async update(entity: Partial<K>, transaction?: Transaction) {
    return this.repository
      .findByPk((entity as any).id, {
        rejectOnEmpty: this.createNotFoundError(),
        transaction,
      })
      .then((savedEntity) =>
        savedEntity.update(entity, { transaction }).then(this.plainEntityGetter)
      );
  }
  public async updateWhere(
    entity: Partial<K>,
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction
  ) {
    return this.repository.update(entity as any, {
      where: entitiesToFilterFrom,
      transaction,
      returning: true,
    });
  }
  public async addOrUpdate(
    entity: Partial<K>,
    transaction?: Transaction,
    upsertOptions?: UpsertOptions<T>
  ) {
    return this.repository
      .upsert(entity as any, { ...upsertOptions, returning: true, transaction })
      .then((upsertedRecord) => this.plainEntityGetter(upsertedRecord[0]));
  }
  public async remove(id: number | string, transaction?: Transaction) {
    return this.repository
      .findByPk(id, { rejectOnEmpty: this.createNotFoundError(), transaction })
      .then((entity) => entity.destroy({ transaction }).then(() => true));
  }
  public async removeWhere(
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction,
    destroyOptions?: DestroyOptions
  ) {
    return this.repository.destroy({
      where: entitiesToFilterFrom,
      transaction,
      ...destroyOptions,
    });
  }

  public async getCountWhere(
    entitiesToFilterFrom: WhereOptions,
    transaction?: Transaction,
    countOptions?: CountOptions
  ) {
    return this.repository.count({
      where: entitiesToFilterFrom,
      transaction,
      ...countOptions,
    });
  }
  public async getAllWithPaginationWhere(
    whereOptions: WhereOptions,
    findAndCountOptions?: FindAndCountOptions
  ) {
    return this.repository
      .findAndCountAll({
        where: whereOptions,
        ...findAndCountOptions,
        order: this.getSortOrder(findAndCountOptions),
      })
      .then((result) => ({
        ...result,
        rows: this.plainEntitiesGetter(result.rows),
      }));
  }
  public async findOrCreate(
    whereOptions: WhereOptions,
    transaction?: Transaction
  ) {
    return this.repository
      .findOrCreate({
        where: whereOptions,
        transaction,
      })
      .then((result) => this.plainEntityGetter(result[0]));
  }
  public async reorder(
    orderBy: string,
    whereOption: WhereOptions,
    incrementBy: number,
    transaction?: Transaction
  ) {
    const reorderBy = {};
    if (incrementBy)
      reorderBy[orderBy] = Sequelize.literal(`"${orderBy}" + ${incrementBy}`);
    else
      reorderBy[orderBy] = Sequelize.literal(
        `"${orderBy}" - ${incrementBy * -1}`
      );
    return this.repository.update(reorderBy, {
      where: whereOption,
      transaction,
    });
  }
  public async getOneWithoutOrder(
    transaction?: Transaction,
    findOptions?: FindOptions
  ) {
    return this.repository.findOne({
      transaction,
      ...findOptions,
    });
  }

  public async getNextSequenceOrOrder(
    field: keyof T['_attributes'],
    transaction?: Transaction,
    aggregateOptions?: AggregateOptions<T, T['_attributes']>
  ) {
    return this.repository
      .max(field, { transaction, ...aggregateOptions })
      .then((max) => (+max ? +max + 1 : 1));
  }

  async getToBeUpdateOrDeleteOrAdd(
    entities: Array<Partial<K & { id?: number }>>,
    whereOptions: WhereOptions<T>,
    transaction?: Transaction,
    accessorProperty = 'id'
  ) {
    return this.repository.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const allEntities = await this.getAll(transaction, {
          where: whereOptions,
        });

        const toBeAdded = _.filter(
          entities,
          (entity) => !entity[accessorProperty]
        );

        //INFO: Removing all the entites which are already filtered
        _.remove(entities, (entity) => !entity[accessorProperty]);

        const toBeDeleted = _.differenceBy(
          allEntities,
          entities as any,
          (entity: { [x: string]: number }) => entity[accessorProperty]
        );

        const toBeUpdated = entities;

        return [toBeAdded, toBeDeleted, toBeUpdated];
      }
    );
  }

  private getHumanizedTableName = () =>
    humanizeTableName(this.repository.tableName);

  private createNotFoundError = () =>
    new Error(`${this.getHumanizedTableName()} not found`);

  private getSortOrder(findOptions?: FindOptions | FindAndCountOptions): Order {
    return findOptions && !_.isEmpty(findOptions.order)
      ? findOptions.order
      : this.defaultSortOrder;
  }
}

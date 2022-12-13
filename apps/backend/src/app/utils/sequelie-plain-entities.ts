import * as _ from 'lodash';
import { Model } from 'sequelize';
export const plainEntityGetter = <T>(entity: Model<T>) =>
  entity && (entity.get({ plain: true }) as unknown as T);
export const plainEntitiesGetter = <T>(entities: Array<Model<T>>) =>
  entities && entities.length ? _.map(entities, plainEntityGetter) : [];

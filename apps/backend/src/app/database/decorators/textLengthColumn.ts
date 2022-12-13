import { ModelAttributeColumnOptions } from 'sequelize';
import { Column, DataType } from 'sequelize-typescript';

/**
 *
 * @param length @default 120
 * @param options
 * @returns
 */

export const TextLengthColumn = (
  length: number = 120,
  options: Partial<ModelAttributeColumnOptions> = {}
) => {
  return Column({
    type: DataType.STRING(length),
    ...options,
  });
};

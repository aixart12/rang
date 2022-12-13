import { ModelAttributeColumnOptions } from 'sequelize';
import { Column, DataType } from 'sequelize-typescript';

/**
 *
 * @param options
 * @returns Column
 */
export const VariableLengthTextColumn = (
  options: Partial<ModelAttributeColumnOptions> = {}
) => {
  return Column({
    type: DataType.TEXT,
    ...options,
  });
};

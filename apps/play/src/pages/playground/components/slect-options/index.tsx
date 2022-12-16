import {
  Flex,
  HStack,
  StackDivider,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import * as _ from 'lodash';

import { RadioCard } from './radio-card';
import { HistoryTable } from '../history-table';

export const SelectOptions: FC = () => {
  const options = ['react', 'vue', 'svelte'];
  const numberArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  });
  const group = getRootProps();
  return (
    <>
      <Flex w="full">
        <VStack
          w="full"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
        >
          <HStack {...group} w="full" justifyContent="space-evenly">
            {_.map(options, (value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          <HStack {...group} w="full" justifyContent="space-evenly">
            {_.map(numberArray, (value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </VStack>
      </Flex>
      <HistoryTable data={data} />
    </>
  );
};

export const data = [
  {
    id: 1,
    name: 'One',
  },
  {
    id: 2,
    name: 'Two',
  },
];

import {
  Flex,
  HStack,
  StackDivider,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';
import * as _ from 'lodash';
import { FC, useState } from 'react';
import { boolean } from 'yup';

import { RadioCard } from './radio-card';
import { SelectModal } from './selectModel/selcet-model';

export const SelectOptions: FC = () => {
  const options = ['react', 'vue', 'svelte'];
  const numberArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [selected, setSelected] = useState('');
  console.log('🚀 ~ file: index.tsx:19 ~ selected', selected);

  const [toggle, setToggle] = useState<boolean>();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: (data) => {
      setSelected(data), setToggle(true);
    },
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
        {toggle && (
          <SelectModal
            isOpen={toggle}
            onClose={() => setToggle(false)}
            selectedData={selected}
          />
        )}
      </Flex>
    </>
  );
};

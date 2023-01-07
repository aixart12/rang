import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  useRadioGroup,
} from '@chakra-ui/react';
import { UserResult } from '@rang/shared/common-models';
import { useFormCustom } from '@rang/shared/common-react-models';
import { postUserResult } from 'apps/play/src/apis/usre-result.apis';
import { AuthContext } from 'apps/play/src/hoc/auth-context';
import {
  SelectedPostDto,
  selectPostSchema,
  UserResultDto,
} from 'apps/play/src/validations/select-post.schema';
import { FC, useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { RadioCard } from '../radio-card';

interface selectModalProps {
  selectedData: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SelectModal: FC<selectModalProps> = ({
  isOpen,
  onClose,
  selectedData,
}) => {
  const { userData } = useContext(AuthContext);
  console.log('🚀 ~ file: selcet-model.tsx:48 ~ userData', userData);

  const {
    register,
    formState: { isValid },
    handleSubmit,
    watch,
    reset,
  } = useFormCustom<SelectedPostDto>(selectPostSchema);

  const selectValueOptions = [10, 100, 1000];

  const [selectedValue, setSelectedValue] = useState<string>();
  const [steps, setSteps] = useState(10);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: (data) => {
      setSteps(parseInt(data));
      setSelectedValue(data);
      reset();
    },
  });

  const group = getRootProps();

  const loginUseMutation = useMutation(
    (data: UserResultDto) => postUserResult(data),
    {
      onSettled: () => {},
    }
  );

  const formSubmitHandle = (data: SelectedPostDto) => {
    console.log('selected Data', data);
    const userResultData = {
      ...data,
      UserId: userData?.id,
      ResultId: 1,
    };
    loginUseMutation.mutate(userResultData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(formSubmitHandle)}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="play id">
              <FormLabel>Result Id</FormLabel>
              <Input
                type="phoneNumber"
                {...register('ResultId')}
                readOnly={true}
                colorScheme="blue"
                defaultValue={23}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Selected Value</FormLabel>
              <Input
                type="text"
                {...register('userInput')}
                readOnly={true}
                defaultValue={selectedData}
              />
            </FormControl>
            <HStack {...group}>
              {selectValueOptions.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
            <FormControl id="userInput">
              <FormLabel>Add Money</FormLabel>
              <NumberInput
                step={steps}
                size="sm"
                value={selectedValue && parseInt(selectedValue)}
                defaultValue={10}
                min={10}
              >
                <NumberInputField
                  readOnly={true}
                  {...register('userInputValue')}
                  borderColor="red.200"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    bg="green.200"
                    _active={{ bg: 'green.300' }}
                    children="+"
                  />
                  <NumberDecrementStepper
                    bg="pink.200"
                    _active={{ bg: 'pink.300' }}
                    children="-"
                  />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

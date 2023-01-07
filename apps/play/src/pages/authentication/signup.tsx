import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  REFRESH_TOKEN,
  useFormCustom,
  USER_TOKEN,
} from '@rang/shared/common-react-models';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';
import { createUser } from '../../apis/user.apis';
import { addUserSchema, UserDto } from '../../validations/user-signup.schema';

export const SignupCard: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useFormCustom<UserDto>(addUserSchema);

  const createUserMutation = useMutation((data: UserDto) => createUser(data), {
    onSettled: () => {},
  });

  const formSubmitHandle = (data: UserDto) => {
    console.log('data', data);
    createUserMutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem(USER_TOKEN, data.token);
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        navigation('/');
      },
    });
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Grid
          as="form"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          onSubmit={handleSubmit(formSubmitHandle)}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register('firstName')} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" {...register('lastName')} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="phoneNumber" {...register('phoneNumber')} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  // type={showPassword ? 'text' : 'password'}
                  type="password"
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isDisabled={!isValid}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </Flex>
  );
};

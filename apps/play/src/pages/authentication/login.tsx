import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  REFRESH_TOKEN,
  useFormCustom,
  USER_TOKEN,
  useToastMessage,
} from '@rang/shared/common-react-models';
import { FC } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../apis/user.apis';
import { LoginDto, loginSchema } from '../../validations/user--login.schema';

export const LoginScreen: FC = () => {
  const navigation = useNavigate();

  const showToast = useToastMessage();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useFormCustom<LoginDto>(loginSchema);

  const loginUseMutation = useMutation((data: LoginDto) => loginUser(data), {
    onSettled: () => {},
  });

  const formSubmitHandle = (data: LoginDto) => {
    console.log('data', data);
    loginUseMutation.mutate(data, {
      onSuccess: (data) => {
        if (data.status === 401 || data.status === 403) {
          showToast({
            description:
              "You don't  have access. Please contact the administrator ",
          });
        } else {
          localStorage.setItem(USER_TOKEN, data.token);
          localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
          navigation('/');
        }
      },
      onError: () => {
        showToast({
          title: 'Invalid credentials',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };
  return (
    <Flex
      as="form"
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      onSubmit={handleSubmit(formSubmitHandle)}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Phone Number</FormLabel>
              <Input type="name" {...register('username')} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('password')} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                isDisabled={!isValid}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Sign in
              </Button>
              <Stack pt={3}>
                <Text align={'center'}>
                  Want to ? <Link color={'blue.400'}>Sign In</Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

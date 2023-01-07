// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Route, Routes, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import {
  theme,
  CustomReactQueryProvider,
} from 'libs/shared/common-react-models/src';
import AppRoutes from '../routes/route';
import { AuthProvider } from '../hoc/auth-context';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <CustomReactQueryProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CustomReactQueryProvider>
    </ChakraProvider>
  );
}

export default App;

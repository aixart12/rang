import { Box, Flex } from '@chakra-ui/react';

import Navbar from '../../components/navbar';

interface PageWrapperProps {
  isBackDisabled?: boolean;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  isBackDisabled = false,
}) => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem(USER_TOKEN)) {
  //     navigate(getRoute(SUPERVISOR_ROUTES.LOGIN_PAGE_ROUTE), {
  //       replace: true,
  //     });
  //   }
  // }, []);

  return (
    <Flex
      direction="column"
      h="100vh"
      backgroundColor="bodyBackground"
      width="full"
    >
      <Navbar isBackDisabled={isBackDisabled} />
      <Box h="100%" maxWidth="100vw">
        {children}
      </Box>
    </Flex>
  );
};

export default PageWrapper;

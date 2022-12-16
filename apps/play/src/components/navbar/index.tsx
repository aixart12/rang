/* eslint-disable @typescript-eslint/no-empty-function */
import { Flex, List } from '@chakra-ui/react';
import NavbarLink from './components/navbar-link';

interface NavbarProps {
  isBackDisabled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isBackDisabled }) => {
  // Apply different background color to unread notifications
  const getNotificationBackground = (isNotificationRead: boolean) =>
    isNotificationRead ? 'white' : '#E8EFF8';

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="navbar.background"
      overflow="hidden"
      px="10"
      width="full"
      alignItems="stretch"
      shadow="navbarShadow"
      borderBottomWidth="2px"
      borderBottomColor="navbarShadow"
    >
      <List
        px="8"
        display="flex"
        justifyContent="space-around"
        gap={{ base: '12', md: '8' }}
        color="navbar.text"
        fontSize={{ base: 'md', md: 'xl' }}
        fontWeight="hairline"
      >
        <>
          {/* <NavbarLink to={''}}>Dashboard</NavbarLink> */}
          Play Ground
        </>
      </List>
    </Flex>
  );
};
export default Navbar;

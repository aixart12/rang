import { ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavbarLink: FC<NavbarLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isCurrentRoute = to
    .split('/')[1]
    .includes(location.pathname.split('/')[1]);
  return (
    <ListItem
      fontWeight={isCurrentRoute ? 'semibold' : 'hairline'}
      color={isCurrentRoute ? 'navbar.current' : 'navbar.text'}
      py="3"
      position="relative"
      _after={
        isCurrentRoute
          ? {
              content: "''",
              position: 'absolute',
              width: 'full',
              height: '2px',
              borderColor: 'navbar.current',
              bgColor: 'navbar.current',
              bottom: '0',
              left: '0',
            }
          : {}
      }
    >
      <Link to={to}>{children}</Link>
    </ListItem>
  );
};

export default NavbarLink;

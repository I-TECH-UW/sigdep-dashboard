import { Children, ReactNode } from 'react';
import {
  Box,
  Center,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
  Heading,
  Link as ChakraLink,
  ChakraProvider,
  VStack,
} from '@chakra-ui/react';

//import logo from "./assets/react.svg"; // Replace "react.svg" with the actual file name and extension of your logo image

import logo from "./assets/logo.png"; // Replace "react.svg" with the actual file name and extension of your logo image
import Views from "./Views";

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
  { name: 'Home', routeTo: '/home' },
  { name: 'Manage', routeTo: '/manage' },
  { name: 'Register', routeTo: '/register' },
  { name: 'Sign Out', routeTo: '/signOut' },

];

const NavLink = ({ children, routeTo }) => (

  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={routeTo}>
    {children}
  </Link>
);



export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ChakraProvider>

        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box><Img src={logo} alt="Logo" boxSize={45} mr={2} /></Box>
              <Heading as="h1" size="xl" color="blue.600">
                SIGDEP3 ROUTES
              </Heading>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link.name} routeTo={link.routeTo}>
                    {link.name}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Box><Img src={logo} alt="Logo" boxSize={45} mr={2} /></Box>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>

      </ChakraProvider>

      <VStack h="100vh" justify="space-evenly" align="start">
        <Box bg="gray.200" w="100%" py={4} px={8} top={0} left={0} flex="1" >
          <Center h="100%">
            <Views />
          </Center>

        </Box>
      </VStack>
    </>
  );
}
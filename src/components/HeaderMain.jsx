import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Link, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import SearchBar from './SearchBar';
import Modal from './Login';

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user data exists in local storage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && Object.keys(parsedUser).length > 0) {
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        
        localStorage.removeItem('user');
        
        setUser((prevUser) => {
            console.log('User before logout:', prevUser);
            console.log('User after logout: null');
            return null;
        });
    };


    return (
        <>
            <Box bg="white.500" py={1}>
                <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
                    <Link href="/">
                        <Heading color="white">TravelVoyage</Heading>
                    </Link>
                    <Flex align="center" spacing={6}>
                        {user ? (
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={4}>
                                    {user.displayName}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button
                                bg="linear-gradient(60deg, #3b82f6, #60a5fa)"
                                color="white"
                                ml={4}
                                borderRadius="10px"
                                _hover={{
                                    bg: 'linear-gradient(60deg, #3182ce, #93c5fd)'
                                }}
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                        )}
                        <select
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid black',
                                marginLeft: '10px',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            <option style={{ color: 'black' }} value="en">INR</option>
                            <option style={{ color: 'black' }} value="es">USD</option>
                            <option style={{ color: 'black' }} value="fr">EUR</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>
            <Modal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
        </>
    );
};

export default Header;
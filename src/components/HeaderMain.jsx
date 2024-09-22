import React, { useState } from 'react';
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import Modal from './Login'; // Import the Modal component

const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <>
            <Box bg="white.500" py={1}>
                <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
                    <Link href="/">
                        <Heading color="white">TravelVoyage</Heading>
                    </Link>
                    <Flex align="center" spacing={6}>
                        <SearchBar />
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
                            <option style={{ color: 'black' }} value="en">English</option>
                            <option style={{ color: 'black' }} value="es">Español</option>
                            <option style={{ color: 'black' }} value="fr">Français</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>
            <Modal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
        </>
    );
};

export default Header;
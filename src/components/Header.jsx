import React from 'react';
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <Box bg="transparent" py={1}>
            <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
                <Link href="/">
                    <Heading color="white">TravelVoyage</Heading>
                </Link>
                <Flex align="center" spacing={6}>
                    <Link href="/results" color="white" mx={4}>
                        Flights
                    </Link>   
                    <Link href="/bus-results" color="white" mx={4}>
                        Buses
                    </Link>
                    
                    <Button colorScheme="teal" ml={4}>
                        Login
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
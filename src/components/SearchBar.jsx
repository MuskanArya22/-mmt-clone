import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <InputGroup width="150px">
      <InputLeftElement pointerEvents="none">
        <FaSearch color="gray.300" />
      </InputLeftElement>
      <Input type="text" placeholder="Search" color="white" />
    </InputGroup>
  );
};

export default SearchBar;
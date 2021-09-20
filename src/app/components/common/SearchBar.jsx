/**
 * Summary.
 * Persentation of a search bar with search icon and placeholder
 *
 * Description.
 *
 * @file   This files defines the search bar.
 * @author Hirumal Priyashan.
 * @since  09.09.2021
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ placeholder = '' }) => {
	return (
		<InputGroup borderRadius='lg'>
			<Input placeholder={placeholder} />
			<InputRightElement
				children={
					<SearchIcon color='green.500' _hover={{ cursor: 'pointer' }} />
				}
			/>
		</InputGroup>
	);
};

SearchBar.propTypes = {
	placeholder: PropTypes.string,
};

export default SearchBar;

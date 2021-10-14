import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

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
const SearchBar = ({ placeholder = '', onChange = {} }) => {
	return (
		<InputGroup borderRadius='lg'>
			{/* input bar */}
			<Input
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
			/>
			{/* search icon */}
			<InputRightElement
				children={
					<SearchIcon color='green.500' _hover={{ cursor: 'pointer' }} />
				}
			/>
		</InputGroup>
	);
};

SearchBar.propTypes = {
	/** Placeholder for search bar */
	placeholder: PropTypes.string,
	/** Functio to execute on searchbar value change */
	onChange: PropTypes.func,
};

export default SearchBar;

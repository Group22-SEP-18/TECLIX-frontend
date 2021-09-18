/**
 * Summary.
 * Persentation of sidebar navigation item
 * component will act as a navigation link
 *
 * Description.
 *
 * @file   This files defines the presentation of navigation item.
 * @author Hirumal Priyashan.
 * @since  05.09.2021
 */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavMenuItemComponent = (props) => {
	const { name, link, onClick, children } = props;

	if (!link || typeof link !== 'string') {
		return (
			<ListItem
				button
				key={name}
				name={name}
				children={children}
				onClick={onClick}
			/>
		);
	}

	return (
		<ListItem
			button
			key={name}
			name={name}
			children={children}
			component={NavLink}
			to={link}
		/>
	);
};

NavMenuItemComponent.propTypes = {
	name: PropTypes.string,
	onClick: PropTypes.func,
};

export default NavMenuItemComponent;

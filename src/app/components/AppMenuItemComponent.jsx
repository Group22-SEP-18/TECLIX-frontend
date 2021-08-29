import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppMenuItemComponent = (props) => {
	const { className, onClick, link, children } = props;

	if (!link || typeof link !== 'string') {
		return (
			<ListItem
				button
				className={className}
				children={children}
				onClick={onClick}
			/>
		);
	}

	return (
		<ListItem
			button
			className={className}
			children={children}
			component={NavLink}
			to={link}
		/>
	);
};

AppMenuItemComponent.propTypes = {
	className: PropTypes.string,
	link: PropTypes.string | null,
	onClick: PropTypes.func,
};

export default AppMenuItemComponent;

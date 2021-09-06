/**
 * Summary.
 * Persentation of sidebar navigation item header with its sub headers
 * if it has childrens header will act as a expandable
 * otherwise a navigation link
 *
 * Description.
 *
 * @file   This files defines the presentation of navigation items collection.
 * @author Hirumal Priyashan.
 * @since  05.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import NavMenuItemComponent from './NavMenuItemComponent';

const NavMenuItem = (props) => {
	const { name, link, Icon, items = [] } = props;
	const classes = useStyles();
	const isExpandable = items && items.length > 0;
	const [open, setOpen] = React.useState(false);

	function handleClick() {
		setOpen(!open);
	}

	const MenuItemRoot = (
		<NavMenuItemComponent
			className={classes.menuItem}
			link={!isExpandable && link}
			onClick={handleClick}
		>
			{/* Display an Icon if any */}
			{!!Icon && (
				<ListItemIcon className={classes.menuItemIcon}>
					<Icon />
				</ListItemIcon>
			)}
			<ListItemText primary={name} inset={!Icon} />
			{/* Display the expand menu if the item has children */}
			{isExpandable && !open && <IconExpandMore />}
			{isExpandable && open && <IconExpandLess />}
		</NavMenuItemComponent>
	);

	const MenuItemChildren = isExpandable ? (
		<Collapse in={open} timeout='auto' unmountOnExit>
			<Divider />
			<List component='div' disablePadding>
				{items.map((item, index) => (
					<NavMenuItem {...item} key={index} />
				))}
			</List>
		</Collapse>
	) : null;

	return (
		<>
			{MenuItemRoot}
			{MenuItemChildren}
		</>
	);
};

NavMenuItem.propTypes = {
	name: PropTypes.string,
	link: PropTypes.string | null,
	Icon: PropTypes.any,
};

const useStyles = makeStyles((theme) =>
	createStyles({
		menuItem: {
			'&.active': {
				background: 'rgba(0, 0, 0, 0.08)',
				'& .MuiListItemIcon-root': {
					color: '#fff',
				},
			},
		},
		menuItemIcon: {
			color: '#97c05c',
		},
	})
);

export default NavMenuItem;

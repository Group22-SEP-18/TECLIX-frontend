/**
 * Summary.
 * Persentation of header with navigation bar opener for mini displays
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the header.
 * @author Hirumal Priyashan.
 * @since  05.09.2021
 */
import React from 'react';
import { useHistory, Link as ReachLink } from 'react-router-dom';
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	Text,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import ThemeSelector from '../themeselector/ThemeSelector';
import { userLogout } from '../../../../api/userApi';
import { capitalizeFirstLetter } from '../../../utils';

const MobileNav = ({ onOpen, user, ...rest }) => {
	const history = useHistory();
	const logOut = () => {
		localStorage.removeItem('token');
		history.push('/');
		userLogout();
	};
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 10 }}
			height='20'
			width={{ base: '95vw', md: 'calc(100vw - 260px)' }}
			alignItems='center'
			borderBottomWidth='1px'
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize='2xl'
				fontFamily='monospace'
				fontWeight='bold'
			>
				TECLIX
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<ThemeSelector />
				<Flex alignItems={'center'} id='header-menu-flex'>
					<Menu>
						<MenuButton
							id='header-dropdown-button'
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}
						>
							<HStack>
								<Avatar
									size={'sm'}
									src={user.profile_picture}
									id='header-propic'
								/>
								<VStack
									id='header-vstack'
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'
								>
									<Text fontSize='sm' id='header-fullname'>
										{capitalizeFirstLetter(user.first_name)}{' '}
										{capitalizeFirstLetter(user.last_name)}
									</Text>
									<Text fontSize='xs' color='gray.600' id='header-role'>
										{user.user_role}
									</Text>
								</VStack>
								<Box
									display={{ base: 'none', md: 'flex' }}
									id='header-drop-down-box'
								>
									<FiChevronDown id='header=dropdown-icon' />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList>
							<MenuItem as={ReachLink} to='/myaccount' id='myaccount-button'>
								Profile
							</MenuItem>
							<MenuDivider />
							<MenuItem id='log-out-button' onClick={logOut}>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default MobileNav;

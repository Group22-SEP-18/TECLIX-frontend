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
import { useHistory } from 'react-router-dom';
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
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import ThemeSelector from '../themeselector/ThemeSelector';
import { userLogout } from '../../../../api/userApi';

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
				Logo
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<ThemeSelector />
				<IconButton
					size='lg'
					variant='ghost'
					aria-label='open menu'
					icon={<FiBell />}
				/>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}
						>
							<HStack>
								<Avatar size={'sm'} src={user.profile_picture} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'
								>
									<Text fontSize='sm'>
										{user.first_name} {user.last_name}
									</Text>
									<Text fontSize='xs' color='gray.600'>
										{user.user_role}
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuDivider />
							<MenuItem onClick={logOut}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default MobileNav;

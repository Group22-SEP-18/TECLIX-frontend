/**
 * Summary.
 * Persentation of sidebar with header
 *
 * Description.
 *
 * @file   This files defines the presentation of sidebar with header.
 * @author Hirumal Priyashan.
 * @since  05.09.2021
 */

import React from 'react';
import {
	Box,
	Flex,
	Text,
	CloseButton,
	Divider,
	Heading,
} from '@chakra-ui/react';
import NavMenuItem from './NavMenuItem';
import sidebarContent from './sidebar-content';

const Sidebar = ({ onClose, user, ...rest }) => {
	return (
		<Box
			transition='3s ease'
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					Logo
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{sidebarContent.map(
				(content, index) =>
					content.acceptable_user_roles.includes(user.user_role) && (
						<div key={index}>
							<Heading as='h4' size={{ base: 'sm', md: 'md' }} p={4}>
								{content.header}
							</Heading>
							<Divider colorScheme='whatsapp' />
							{content.subHeaders.map(
								(sub) =>
									sub.acceptable_user_roles.includes(user.user_role) && (
										<NavMenuItem
											key={content.header + sub.name}
											name={sub.name}
											Icon={sub.icon}
											link={sub.link}
											items={sub.items}
										>
											{sub.name}
										</NavMenuItem>
									)
							)}
						</div>
					)
			)}
		</Box>
	);
};

export default Sidebar;

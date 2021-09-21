/* Summary.
 * Persentation of account page for the user
 *
 * Description.
 *
 * @file   This files defines the details page for the user
 * @author Hirumal Priyashan.
 * @since  20.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
	Avatar,
	Box,
	Button,
	useColorModeValue,
	Flex,
	Grid,
	GridItem,
	Heading,
	Spacer,
	Text,
} from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const MyAccountPage = (props) => {
	const user = useSelector((state) => state.user.user);
	// emp_id,first_name, last_name,email,mobile_number, profile_picture, user_role
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box
				ml={{ base: 0, md: 60 }}
				mt='50'
				h='calc(100vh - 160px)'
				p='4'
				justify='center'
				align='center'
				boxShadow='lg'
				borderRadius='2xl'
			>
				<Grid
					templateRows='repeat(3, 1fr)'
					templateColumns='repeat(12, 1fr)'
					gap={4}
				>
					<GridItem rowSpan={2} colSpan={4} overflow='hidden'>
						<Avatar
							size={'2xl'}
							src={user.profile_picture}
							alt={user.first_name}
							mb={4}
							pos={'relative'}
						/>
					</GridItem>
					<GridItem rowSpan={2} colSpan={8} overflow='hidden'>
						<Heading
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							Name: {user.first_name} {user.last_name}
						</Heading>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Employee Id: {user.employee_no}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Role: {user.user_role}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Email: {user.email}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Mobile: {user.mobile_number}
						</Text>
					</GridItem>
				</Grid>
				<GridItem rowSpan={1} colSpan={6} overflow='hidden'></GridItem>
				<GridItem rowSpan={1} colSpan={6} overflow='hidden'>
					<Box>
						<Flex>
							<Spacer />
							<Button
								bg={useColorModeValue('green.100', 'green.900')}
								size='lg'
								_hover={{ bg: 'trasparent' }}
								onClick={() => {}}
								mx={4}
							>
								<Text mx={2}>Edit Profile</Text>
							</Button>
							<Button
								bg={useColorModeValue('green.100', 'green.900')}
								size='lg'
								_hover={{ bg: 'trasparent' }}
								mx={4}
								onClick={() => {}}
							>
								<Text mx={2}>Change Password</Text>
							</Button>
						</Flex>
					</Box>
				</GridItem>
			</Box>
		</Box>
	);
};

MyAccountPage.propTypes = {};

export default MyAccountPage;

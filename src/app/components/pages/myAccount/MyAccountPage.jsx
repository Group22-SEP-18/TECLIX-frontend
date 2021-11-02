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
import { useSelector } from 'react-redux';
import {
	Avatar,
	Box,
	Center,
	useColorModeValue,
	Heading,
	Stack,
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
			>
				<Center py={6}>
					<Box
						minW={'320px'}
						w={'full'}
						bg={useColorModeValue('white', 'gray.900')}
						boxShadow={'2xl'}
						rounded={'lg'}
						p={6}
						textAlign={'center'}
					>
						<Avatar
							size={'2xl'}
							src={user.profile_picture}
							alt={user.first_name}
							pos={'relative'}
							_after={{
								content: '""',
								w: 6,
								h: 6,
								bg: 'green.300',
								border: '2px solid white',
								rounded: 'full',
								pos: 'absolute',
								bottom: 0,
								right: 3,
							}}
						/>
						<Text
							fontWeight={600}
							color={'gray.500'}
							mt={4}
							textAlign='center'
							pl='4'
						>
							Employee Id: {user.employee_no}
						</Text>
						<Heading
							fontSize={'2xl'}
							fontFamily={'body'}
							textAlign='center'
							pl='4'
						>
							Name: {user.first_name} {user.last_name}
						</Heading>
						<Text
							fontWeight={600}
							color={'gray.500'}
							mb={4}
							textAlign='center'
							pl='4'
						>
							Email: {user.email}
						</Text>
						<Text fontWeight={500} textAlign='center' pl='4'>
							Role: {user.user_role}
						</Text>
						<Text fontWeight={500} textAlign='center' pl='4'>
							Mobile: {user.mobile_number | '1234567890'}
						</Text>
						<Box h='100px' />
						<Stack mt={8} direction={'row'} spacing={4}>
							{/* <Button
								flex={1}
								fontSize={'sm'}
								rounded={'full'}
								_focus={{
									bg: 'gray.200',
								}}
							>
								Change Profile Picture
							</Button>
							<ResetPassword /> */}
						</Stack>
					</Box>
				</Center>
			</Box>
		</Box>
	);
};

MyAccountPage.propTypes = {};

export default MyAccountPage;

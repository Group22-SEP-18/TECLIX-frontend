import React from 'react';
import {
	Button,
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	VStack,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon, CheckIcon } from '@chakra-ui/icons';

const dataSet = [
	{
		name: 'Late Payment',
		schema: [
			{
				below_margin: 0,
				percentage: 1,
				bonus: 10,
			},
			{
				below_margin: 10000,
				percentage: 3,
				bonus: 100,
			},
			{
				below_margin: 100000,
				percentage: 4,
				bonus: 10000,
			},
		],
	},
	{
		name: 'Service Orders',
		schema: [
			{
				below_margin: 0,
				percentage: 1,
				bonus: 10,
			},
			{
				below_margin: 10000,
				percentage: 3,
				bonus: 100,
			},
			{
				below_margin: 100000,
				percentage: 4,
				bonus: 10000,
			},
		],
	},
	{
		name: 'Item Count',
		schema: [
			{
				below_margin: 0,
				percentage: 1,
				bonus: 10,
			},
			{
				below_margin: 100,
				percentage: 3,
				bonus: 100,
			},
			{
				below_margin: 1000,
				percentage: 4,
				bonus: 10000,
			},
		],
	},
];

const LeaderboardSchema = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button rightIcon={<SettingsIcon />} colorScheme='gray' onClick={onOpen}>
				Leaderboard Schema
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='lg'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Leaderboard Schema</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{dataSet.map((dset, i) => (
							<VStack my='4' key={1}>
								<Box flex='1' flexDirection='row'>
									<Text
										fontSize='md'
										fontWeight='bold'
										textAlign='start'
										justifyContent='start'
									>
										{dset.name}
									</Text>
									<Box>
										<Table variant='unstyled'>
											<Thead>
												<Tr>
													<Th>Lower Margin</Th>
													<Th isNumeric>Percentage</Th>
													<Th isNumeric>Bonus Points</Th>
												</Tr>
											</Thead>
											<Tbody>
												{dset.schema.map((row, index) => (
													<Tr my='1' key={index}>
														<Td>
															{dset.name === 'ItemCount'
																? `${row.below_margin}`
																: `Rs.${row.below_margin}.00+`}
														</Td>
														<Td isNumeric>
															<Editable defaultValue={row.percentage}>
																<EditablePreview />
																<EditableInput />
																{' %'}
															</Editable>
														</Td>
														<Td isNumeric>
															<Editable defaultValue={row.bonus}>
																<EditablePreview />
																<EditableInput />
																{' points'}
															</Editable>
														</Td>
													</Tr>
												))}
											</Tbody>
										</Table>
									</Box>
								</Box>
							</VStack>
						))}
						<ModalFooter>
							<Button variant='ghost' rightIcon={<CheckIcon />}>
								Apply Changes
							</Button>
						</ModalFooter>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

LeaderboardSchema.propTypes = {};

export default LeaderboardSchema;

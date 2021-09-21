import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';

const ResetPassword = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				bg={useColorModeValue('green.100', 'green.900')}
				size='lg'
				_hover={{ bg: 'trasparent' }}
				mx={4}
				onClick={onOpen}
			>
				<Text mx={2}>Change Password</Text>
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						<Flex align={'center'} justify={'center'}>
							<Stack
								spacing={4}
								w={'full'}
								maxW={'md'}
								bg={useColorModeValue('white', 'gray.700')}
								p={6}
								my={12}
							>
								<Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
									Enter new password
								</Heading>
								<FormControl id='email' isRequired>
									<FormLabel>Email address</FormLabel>
									<Input
										placeholder='your-email@example.com'
										_placeholder={{ color: 'gray.500' }}
										type='email'
									/>
								</FormControl>
								<FormControl id='password' isRequired>
									<FormLabel>Password</FormLabel>
									<Input type='password' />
								</FormControl>
								<Stack spacing={6}>
									<Button
										bg={'green.400'}
										color={'white'}
										_hover={{
											bg: 'blue.500',
										}}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ResetPassword;

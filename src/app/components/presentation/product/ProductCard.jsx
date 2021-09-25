import {
	Flex,
	Box,
	Image,
	Badge,
	useColorModeValue,
	useDisclosure,
	Icon,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
	ModalFooter,
	chakra,
	Tooltip,
	useToast,
	HStack,
} from '@chakra-ui/react';
import { FiSettings, FiTrash } from 'react-icons/fi';
import ProductEditForm from './ProductEditForm';
//import Axios from 'axios';

function ProductCard({ categoryList, product, key }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	//const toast = useToast();

	const updateDetails = (ProductDetails) => {
		// Axios.update('http://localhost:5000/xxxxxxx', {
	};
	const deleteItem = (id) => {
		// Axios.delete('http://localhost:5000/xxxxx', {
	};

	return (
		<div key={key}>
			<Flex p={25} w='full' alignItems='center' justifyContent='center'>
				<Box
					bg={useColorModeValue('white', 'gray.800')}
					maxW='xs'
					borderWidth='1px'
					rounded='lg'
					shadow='lg'
					_hover={{ bg: 'gray.200' }}
					position='relative'
				>
					<Image
						width='200'
						src={product.product_image}
						alt={`Picture of ${product.name}`}
						roundedTop='lg'
					/>

					<Box p='6'>
						<Box d='flex' alignItems='baseline'>
							<HStack>
								<Badge
									rounded='full'
									px='2'
									fontSize='0.8em'
									colorScheme='whatsapp'
								>
									{product.category}
								</Badge>
								<Badge
									rounded='full'
									px='2'
									fontSize='0.8em'
									colorScheme='red'
									right={2}
								>
									{product.id}
								</Badge>
							</HStack>
						</Box>
						<Flex mt='1' justifyContent='space-between' alignContent='center'>
							<Box
								fontSize='20'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								{product.short_name}
							</Box>
						</Flex>
						<Flex justifyContent='space-between' alignContent='center'>
							<Box
								fontSize='2xl'
								color={useColorModeValue('gray.800', 'white')}
							>
								<Box as='span' color={'gray.600'} fontSize='lg'>
									Rs.
								</Box>
								{parseFloat(product.price).toFixed(2)}
							</Box>

							<Tooltip label='Edit' placement={'bottom'}>
								<Box>
									<chakra.a onClick={onOpen} display={'flex'}>
										<Icon
											as={FiSettings}
											h={7}
											w={7}
											alignSelf={'center'}
											color='green.500'
										/>
									</chakra.a>
									<Modal
										closeOnOverlayClick={false}
										onClose={onClose}
										isOpen={isOpen}
										motionPreset='scale'
										isCentered
									>
										<ModalOverlay />
										<ModalContent>
											<ModalHeader>Edit Product Details</ModalHeader>
											<ModalCloseButton />
											<ModalBody pb='5'>
												<ProductEditForm
													categoryList={categoryList}
													updateDetails={updateDetails}
													trigger={onClose}
												/>
											</ModalBody>
										</ModalContent>
									</Modal>
								</Box>
							</Tooltip>
							<Tooltip label='Delete' placement={'bottom'}>
								<Box>
									<chakra.a display={'flex'} onClick={onOpenReportModal}>
										<Icon
											as={FiTrash}
											h={7}
											w={7}
											alignSelf={'center'}
											color='red.300'
										/>
									</chakra.a>
									<Modal
										closeOnOverlayClick={false}
										onClose={onCloseReportModal}
										isOpen={isOpenReportModal}
										motionPreset='scale'
										isCentered
									>
										<ModalOverlay />
										<ModalContent>
											<ModalHeader>
												Do you want to delete this product?
											</ModalHeader>
											<ModalCloseButton />
											<ModalBody pb='5'></ModalBody>
											<ModalFooter>
												<Button
													onClick={deleteItem(product.productId)}
													colorScheme='whatsapp'
													mr={3}
													minWidth='200'
												>
													Yes
												</Button>
												<Button onClick={onCloseReportModal} minWidth='200'>
													No
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
								</Box>
							</Tooltip>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</div>
	);
}

export default ProductCard;

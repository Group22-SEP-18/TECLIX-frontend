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
	useToast,
	ModalHeader,
	ModalFooter,
	chakra,
	Tooltip,
	HStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

import { FiTrash } from 'react-icons/fi';
import { productDelete } from '../../../redux/actions/productActions';

function ProductCard({ categoryList, product, key }) {
	const toast = useToast();
	const deleteproduct = useSelector((state) => state.products.deleteproduct);
	var [updateConstant, setupdateConstant] = useState(0);
	const dispatch = useDispatch();
	var toast_type1 = (success) =>
		toast({
			position: 'bottom-right',
			title: success ? 'Success' : 'Failed',
			status: success ? 'success' : 'error',
			duration: 5000,
			isClosable: true,
		});
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	const deleteProduct = () => {
		dispatch(productDelete(product.id));
		setupdateConstant((count) => count + 1);
	};
	if (updateConstant === 1 && !deleteproduct.isLoading) {
		toast_type1(deleteproduct.success);
		setupdateConstant((count) => count - 1);
		onCloseReportModal();
	}

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
						height='200'
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
													colorScheme='whatsapp'
													mr={3}
													minWidth='200'
													onClick={deleteProduct}
													isLoading={deleteproduct.isLoading}
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

import {
	Flex,
	Box,
	Image,
	Badge,
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
	HStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FiTrash } from 'react-icons/fi';
import { productDelete } from '../../../redux/actions/productActions';
import { capitalize } from 'lodash';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const deleteproduct = useSelector((state) => state.products.deleteproduct);

	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	const deleteProduct = () => {
		dispatch(productDelete(product.id));
	};

	if (!product) {
		return null;
	}
	return (
		<div>
			<Flex p={25} w='full' alignItems='center' justifyContent='center'>
				<Box
					id={`product-card-div-${product.id}`}
					maxW='xs'
					borderWidth='1px'
					rounded='lg'
					shadow='lg'
					_hover={{ bg: 'gray.200' }}
					position='relative'
				>
					<Image
						id='product_image'
						height='200'
						src={product.product_image}
						alt={`Picture of ${product.name}`}
						roundedTop='lg'
					/>

					<Box p='6'>
						<Box d='flex' alignItems='baseline'>
							<HStack>
								<Badge
									id='category'
									rounded='full'
									px='2'
									fontSize='0.8em'
									colorScheme='whatsapp'
								>
									{capitalize(product.category)}
								</Badge>
								<Badge
									id='product_id'
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
								id='short_name'
								fontSize='20'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								{capitalize(product.short_name)}
							</Box>
						</Flex>
						<Flex justifyContent='space-between' alignContent='center'>
							<Box id='price' fontSize='2xl'>
								<Box as='span' color={'gray.600'} fontSize='lg'>
									Rs.
								</Box>
								{parseFloat(product.price).toFixed(2)}
							</Box>

							<Tooltip label='Delete' placement={'bottom'}>
								<Box>
									<chakra.a
										id='delete-product'
										display={'flex'}
										onClick={onOpenReportModal}
									>
										<Icon
											as={FiTrash}
											h={7}
											w={7}
											alignSelf={'center'}
											color='red.300'
										/>
									</chakra.a>
									<Modal
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
};

ProductCard.propTypes = {
	customer: PropTypes.object,
};

export default ProductCard;

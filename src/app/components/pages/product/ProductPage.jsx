/**
 * Summary.
 * Persentation of pages for a authorized user
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the pages.
 * @author Shehan Perera.
 * @since  08.09.2021
 */
import {
	Box,
	useDisclosure,
	Grid,
	GridItem,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
} from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';
import React, { useEffect } from 'react';
import ProductCard from '../../presentation/product/ProductCard';
import AddNewProduct from '../../presentation/product/addProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../redux/actions/productActions';

const ProductPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);
	const { products, isLoading, error } = useSelector((state) => state.products);

	const categoryList = ['Biscuit', 'Chocolate', 'Spices', 'Drinks'];

	const data = [
		{
			category: 'Biscuit',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 300,
			productId: '1',
		},
		{
			category: 'Chocolate',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 250,
			productId: '2',
		},
		{
			category: 'Spices',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 600,
			productId: '3',
		},
		{
			category: 'Drinks',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 450,
			productId: '4',
		},
		{
			category: 'Biscuit',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 300,
			productId: '5',
		},
		{
			category: 'Chocolate',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 250,
			productId: '6',
		},
		{
			category: 'Spices',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 600,
			productId: '7',
		},
		{
			category: 'Drinks',
			imageURL: '/1234.jpg',
			name: 'Wayfarer Classic Biscuit Cut',
			price: 450,
			productId: '8',
		},
	];

	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Box pl='6'>
					<Button colorScheme='whatsapp' onClick={onOpenReportModal} size='lg'>
						Add a Product
					</Button>
					<Modal
						closeOnOverlayClick={false}
						onClose={onCloseReportModal}
						isOpen={isOpenReportModal}
						motionPreset='scale'
						isCentered
						size='xl'
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader></ModalHeader>
							<ModalCloseButton />
							<ModalBody pb='5'>
								<AddNewProduct trigger={onCloseReportModal} />
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
					gap={1}
				>
					{products.map((product, index) => (
						<GridItem>
							<ProductCard
								key={index}
								categoryList={categoryList}
								product={product}
							/>
						</GridItem>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

ProductPage.propTypes = {};

export default ProductPage;

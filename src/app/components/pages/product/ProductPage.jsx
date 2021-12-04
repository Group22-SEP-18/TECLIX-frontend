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
import { selectUserRole } from '../../../redux/slices/userSlice';
import LoadingCards from '../../common/loading/LoadingCards';

const ProductPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);

	const { products, isLoading } = useSelector((state) => state.products);
	const user_role = useSelector(selectUserRole);

	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{user_role === 'Distribution Officer' && (
					<Box pl='6'>
						<Button colorScheme='whatsapp' onClick={onOpen} size='lg'>
							Add a Product
						</Button>
						<Modal
							onClose={onClose}
							isOpen={isOpen}
							motionPreset='scale'
							isCentered
							size='md'
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader></ModalHeader>
								<ModalCloseButton />
								<ModalBody pb='5'>
									<AddNewProduct trigger={() => onClose()} />
								</ModalBody>
							</ModalContent>
						</Modal>
					</Box>
				)}
				{isLoading && <LoadingCards count={5} />}
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
					gap={1}
				>
					{!isLoading &&
						products &&
						products.map((product, index) => (
							<GridItem key={index}>
								<ProductCard key={index} product={product} />
							</GridItem>
						))}
				</Grid>
			</Box>
		</Box>
	);
};

ProductPage.propTypes = {};

export default ProductPage;

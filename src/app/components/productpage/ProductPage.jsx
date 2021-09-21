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

import React from 'react';
import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import Sidebar from '../../components/common/sidebar/SidebarContent';
import MobileNav from '../../components/common/sidebar/MobileNav';
import ProductCard from '../productCard/ProductCard';

const ProductPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
			{/* Side Bar for larger displays */}
			<Sidebar
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			{/*Drawer for mini displays  */}
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<Sidebar onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* Header with Nav button for mini displays */}
			<MobileNav onOpen={onOpen} />
			{/* Content */}
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
					gap={1}
				>
					{data.map((product, index) => (
						<GridItem>
							<ProductCard
								key={index}
								categoryList={categoryList}
								productId={product.productId}
								name={product.name}
								category={product.category}
								price={product.price}
								imageURL={product.imageURL}
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

import { useState } from 'react';
import React from 'react';
import { Button } from '@chakra-ui/react';
import {
	FormControl,
	FormLabel,
	Input,
	Select,
	HStack,
	Box,
} from '@chakra-ui/react';
import { WrapItem } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import { Wrap } from '@chakra-ui/react';

const ProductEditForm = ({ updateDetails, trigger, array }) => {
	const products = [
		{ id: 1, short_name: 'Tikiri Marie' },
		{ id: 2, short_name: 'Gold Marie' },
		{ id: 3, short_name: 'Cream Cracker' },
		{ id: 4, short_name: 'Hawain Cookies' },
		{ id: 5, short_name: 'Choco' },
		{ id: 6, short_name: 'Roast Cookies' },
		{ id: 7, short_name: 'Noodles Batta' },
	];
	const salespersons = [
		{ id: 1, first_name: 'Paul' },
		{ id: 2, first_name: 'Peter' },
		{ id: 3, first_name: 'Biden' },
		{ id: 4, first_name: 'Alex' },
		{ id: 5, first_name: 'Bethesda' },
	];

	const [productQuantity, updateproductQuantity] = React.useState(array);
	const [product_id, setproduct_id] = React.useState();
	const [quantity, setproduct_quantity] = React.useState();

	const updateItem = (id, value) => {
		var index = productQuantity.findIndex((x) => x.id === id);
		if (index >= 0) {
			let g = productQuantity.map((v) => {
				if (v.id === id) {
					v.quantity = value;
				}
				return v;
			});

			updateproductQuantity(g);
		}
		if (index === -1) {
			if (value !== '') {
				updateproductQuantity([
					...productQuantity,
					{ id: parseInt(product_id), quantity: quantity },
				]);
				console.log(productQuantity);
			}
		}
	};

	const removeProduct = (id) => {
		updateproductQuantity(
			productQuantity.filter((product) => product.id !== id)
		);
	};

	const addToProductQuantity = () => {
		updateItem(parseInt(product_id), quantity);
	};

	return (
		<form>
			<form>
				<HStack spacing='15px'>
					<FormControl>
						<FormLabel>Products</FormLabel>
						<Select
							minW='28'
							placeholder='Select'
							onChange={(e) => setproduct_id(e.target.value)}
						>
							{products.map((product, i) => (
								<option value={product.id}>{product.short_name}</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>Quantity</FormLabel>
						<NumberInput
							isRequired
							min={1}
							name='quantity'
							maxW='100px'
							mr='2rem'
							onChange={(value) => setproduct_quantity(value)}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl>
						<FormLabel fontSize='x-small'>.</FormLabel>
						<Button
							onClick={addToProductQuantity}
							minW='24'
							colorScheme='whatsapp'
							size='sm'
							minH='1xl'
						>
							Add
						</Button>
					</FormControl>
				</HStack>
			</form>
			<Box>
				<Wrap pt='3' pl='1'>
					{productQuantity.map((product, index) => (
						<WrapItem>
							<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
								<TagLabel pr='2' color='blue.700'>
									{product.quantity}x
								</TagLabel>
								<Avatar
									src='/1234.jpg'
									size='xs'
									name='Segun Adebayo'
									ml={-1}
									mr={2}
								/>
								<TagLabel>{product.id}</TagLabel>
								<TagCloseButton onClick={() => removeProduct(product.id)} />
							</Tag>
						</WrapItem>
					))}
				</Wrap>
			</Box>
			<FormControl>
				<FormLabel>Salesperson</FormLabel>
				<Select
					placeholder='Select'
					// onChange={(e) => setCategory(e.target.value)}
				>
					{salespersons.map((salesperson, i) => (
						<option value={salesperson.id}>{salesperson.first_name}</option>
					))}
				</Select>
			</FormControl>

			<Input
				mt='5'
				mb='5'
				type='submit'
				value='Assign to the vehicle'
				className='btn btn-block'
				bg='green.400'
				color='white'
				onClick={trigger}
			/>
		</form>
	);
};

export default ProductEditForm;

import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { FormControl, FormLabel, Select, HStack, Box } from '@chakra-ui/react';
import { WrapItem } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../../redux/actions/productActions';
import { assignToVehicle } from '../../../redux/actions/vehicleActions';
import { getSalespersons } from '../../../redux/actions/salespersonActions';
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';
import { Wrap } from '@chakra-ui/react';

const ProductEditForm = ({
	updateDetails,
	trigger,
	array,
	vehicleid,
	assignedsalesprson,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getSalespersons());
	}, [dispatch]);

	const { products } = useSelector((state) => state.products);
	const { salespersons } = useSelector((state) => state.salespersons);

	const [productQuantity, updateproductQuantity] = React.useState(array);
	const [product_id, setproduct_id] = React.useState();
	const [quantity, setproduct_quantity] = React.useState();
	const [salesperson, setsalesperson] = React.useState(assignedsalesprson.id);

	const findindex = (array, id) => {
		return array.findIndex((x) => x.id === id);
	};
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
		console.log(productQuantity);
	};

	const removeProduct = (id) => {
		updateproductQuantity(
			productQuantity.filter((product) => product.id !== id)
		);
	};

	const addToProductQuantity = () => {
		updateItem(parseInt(product_id), quantity);
	};
	const assignProductsSalesperson = () => {
		const vehiclecomplex = {
			assigned_vehicle: productQuantity,
			vehicle: vehicleid,
			salesperson: salesperson,
		};
		dispatch(assignToVehicle(vehiclecomplex));
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
								<TagLabel>{products[product.id - 4].short_name}</TagLabel>
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
					onChange={(e) => setsalesperson(e.target.value)}
					defaultValue={assignedsalesprson.id}
				>
					{salespersons.map((salesperson, i) => (
						<option value={salesperson.id}>
							{salesperson.employee_no} | {salesperson.first_name}{' '}
							{salesperson.last_name}
						</option>
					))}
				</Select>
			</FormControl>

			<Button
				mt='5'
				mb='5'
				type='button'
				value='Assign to the vehicle'
				className='btn btn-block'
				bg='green.400'
				color='white'
				onClick={assignProductsSalesperson}
			>
				submit
			</Button>
		</form>
	);
};

export default ProductEditForm;

import { useState, useRef, useEffect } from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { addProduct } from '../../../redux/actions/productActions';
import { useDispatch } from 'react-redux';

const AddNewProduct = ({ addBankCard, trigger }) => {
	const dispatch = useDispatch();

	const [product_short_name, setProductShortName] = useState('');
	const [product_long_name, setProductLongName] = useState('');
	const [product_category, setProductCategory] = useState('');
	const [product_image, setProductImage] = useState('');
	const [product_price, setProductPrice] = useState('');
	const [product_barcode, setProductBarcode] = useState('');

	const inputE1 = useRef();
	useEffect(() => {}, [inputE1]);
	const onSubmit = (e, image) => {
		e.preventDefault();
		if (
			!product_short_name ||
			!product_long_name ||
			!product_category ||
			!product_price
		) {
			alert('Empty Field');
			return;
		}

		const formData = new FormData(inputE1.current);
		formData.append('short_name', product_short_name);
		formData.append('long_name', product_long_name);
		formData.append('category', product_category);
		formData.append('price', product_price);
		dispatch(addProduct(formData));

		console.log({
			product_short_name,
			product_long_name,
			product_category,
			product_image,
		});
	};

	return (
		<form onSubmit={(e) => onSubmit(e, inputE1)} ref={inputE1}>
			<FormControl>
				<FormLabel>Product Short Name</FormLabel>
				<Input
					type='text'
					placeholder='Product Short Name'
					name='short_name'
					value={product_short_name}
					onChange={(e) => setProductShortName(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Product Long Name</FormLabel>
				<Input
					type='text'
					placeholder='Product Long Name'
					name='long_name'
					value={product_long_name}
					onChange={(e) => setProductLongName(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Product Bar Code</FormLabel>
				<Input
					type='number'
					placeholder='Product Bar Code'
					name='bar_code'
					value={product_barcode}
					onChange={(e) => setProductBarcode(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Category</FormLabel>
				<Select
					placeholder='Select Product category'
					name='category'
					onChange={(e) => setProductCategory(e.target.value)}
				>
					<option value='biscuit'>Biscuit</option>
					<option value='chips'>Chips</option>
					<option value='cookies'>Cookies</option>
					<option value='cheese'>Cheese</option>
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Photo</FormLabel>
				<Input
					type='file'
					name='photo'
					id='photo'
					accept='image/*'
					value={product_image}
					onChange={(e) => setProductImage(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Price</FormLabel>
				<Input
					type='number'
					placeholder='Add Product Price'
					value={product_price}
					onChange={(e) => setProductPrice(e.target.value)}
				/>
			</FormControl>

			<Input
				mt='5'
				mb='5'
				type='submit'
				value='Add the Product'
				className='btn btn-block'
				bg='green.400'
				color='white'
				onClick={trigger}
			/>
		</form>
	);
};

export default AddNewProduct;

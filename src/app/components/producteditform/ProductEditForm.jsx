import { useState } from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const ProductEditForm = ({ categoryList, updateDetails, trigger }) => {
	const [price, setPrice] = useState('');
	const [product_id, setProductId] = useState('');
	const [product_name, setProductName] = useState('');
	const [category, setCategory] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();

		//console.log(category);

		if (!price || !product_id || !product_name || !category) {
			alert('Empty Field');
			return;
		}

		updateDetails({ product_name, category, product_id, price });

		setPrice('');
		setProductId('');
		setProductName('');
		setCategory('');
	};

	return (
		<form onSubmit={onSubmit}>
			<FormControl>
				<FormLabel>Product Name</FormLabel>
				<Input
					type='text'
					placeholder='Product Name'
					value={product_name}
					onChange={(e) => setProductName(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Product Category</FormLabel>
				<Select
					placeholder='Product Category'
					onChange={(e) => setCategory(e.target.value)}
				>
					{Array(categoryList.length)
						.fill('')
						.map((_, i) => (
							<option value={categoryList[i]}>{categoryList[i]}</option>
						))}
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Product ID</FormLabel>
				<Input
					type='number'
					placeholder='Id'
					value={product_id}
					onChange={(e) => setProductId(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Price</FormLabel>
				<Input
					type='number'
					placeholder='Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</FormControl>

			<Input
				mt='5'
				mb='5'
				type='submit'
				value='Update Product Details'
				className='btn btn-block'
				bg='green.400'
				color='white'
				onClick={trigger}
			/>
		</form>
	);
};

export default ProductEditForm;

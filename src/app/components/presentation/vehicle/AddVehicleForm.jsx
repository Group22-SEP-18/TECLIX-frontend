import { useState } from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const AddVehicleForm = ({ categoryList, updateDetails, trigger }) => {
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
				<FormLabel>Vehicle Model</FormLabel>
				<Input
					type='text'
					placeholder='Vehicle Model'
					value={product_name}
					onChange={(e) => setProductName(e.target.value)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Vehicle Type</FormLabel>
				<Select
					placeholder='Vehicle Type'
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value='VAN'>Van</option>
					<option value='LORRY'>Lorry</option>
					<option value='THREEWHEELER'>Three Wheelar</option>
					<option value='CAB'>Cab</option>
					<option value='BIKE'>Bike</option>
					<option value='BUS'>Bus</option>
				</Select>
			</FormControl>
			<FormControl>
				<FormLabel>Photo</FormLabel>
				<Input
					type='file'
					placeholder='Upload Image'
					value={product_id}
					onChange={(e) => setProductId(e.target.value)}
				/>
			</FormControl>

			<Input
				mt='5'
				mb='5'
				type='submit'
				value='Add the Vehicle'
				className='btn btn-block'
				bg='green.400'
				color='white'
				onClick={trigger}
			/>
		</form>
	);
};

export default AddVehicleForm;

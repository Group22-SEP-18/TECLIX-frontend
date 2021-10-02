import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reducer, {
	getServiceOrdersAsync,
} from '../../../../app/redux/slices/serviceOrderSlice';

const initialState = {
	isLoading: false,
	serviceOrders: [],
	error: '',
};

const mockedData = [
	{
		id: 9,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1022',
			email: 'shez@gmail.com',
			first_name: 'shehani',
			last_name: 'perera',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575489746_zqmqzu',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '350.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '150.00',
			},
		],
		order_date: '2021-01-26',
		original_price: '1500.00',
		discount: '0.00',
	},
	{
		id: 10,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1022',
			email: 'shez@gmail.com',
			first_name: 'shehani',
			last_name: 'perera',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575489746_zqmqzu',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '350.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '150.00',
			},
		],
		order_date: '2021-09-26',
		original_price: '1500.00',
		discount: '0.00',
	},
	{
		id: 11,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 10,
					short_name: 'Happy Cow Cheese',
					long_name: 'Australian Happy Cow Cheese 340g',
					barcode: 'A-000490-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture13_fkldml',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '260.00',
			},
		],
		order_date: '2021-09-28',
		original_price: '260.00',
		discount: '0.00',
	},
	{
		id: 12,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 10,
					short_name: 'Happy Cow Cheese',
					long_name: 'Australian Happy Cow Cheese 340g',
					barcode: 'A-000490-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture13_fkldml',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '300.00',
			},
		],
		order_date: '2021-09-28',
		original_price: '300.00',
		discount: '0.00',
	},
	{
		id: 16,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 9,
					short_name: 'Cheddar Cheese',
					long_name: 'Processed Cheddar Cheese 250g',
					barcode: 'A-000410-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '350.00',
			},
			{
				product: {
					id: 13,
					short_name: 'Oreo Biscuit',
					long_name: 'Oreo Biscuit Original Cream 256.5G',
					barcode: 'A-000730-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/oreo_ye6fzi',
					category: 'biscuit',
					created_by: 2,
				},
				quantity: 1,
				price_at_the_time: '650.00',
			},
		],
		order_date: '2021-09-28',
		original_price: '1500.00',
		discount: '0.00',
	},
	{
		id: 18,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '60.00',
			},
		],
		order_date: '2021-09-29',
		original_price: '680.00',
		discount: '100.00',
	},
	{
		id: 19,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1018',
			email: 'sak@gmail.com',
			first_name: 'shane',
			last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575390036_wmqrmz',
		},
		order_items: [
			{
				product: {
					id: 10,
					short_name: 'Happy Cow Cheese',
					long_name: 'Australian Happy Cow Cheese 340g',
					barcode: 'A-000490-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture13_fkldml',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '260.00',
			},
		],
		order_date: '2021-09-29',
		original_price: '520.00',
		discount: '250.00',
	},
	{
		id: 21,
		customer: {
			shop_name: 'kumudu stores',
			owner_first_name: 'kumudu',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632724764459_zypz4z',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
		],
		order_date: '2021-09-29',
		original_price: '420.00',
		discount: '100.00',
	},
	{
		id: 20,
		customer: {
			shop_name: 'kumudu stores',
			owner_first_name: 'kumudu',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632724764459_zypz4z',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '60.00',
			},
			{
				product: {
					id: 9,
					short_name: 'Cheddar Cheese',
					long_name: 'Processed Cheddar Cheese 250g',
					barcode: 'A-000410-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '350.00',
			},
		],
		order_date: '2021-07-29',
		original_price: '1030.00',
		discount: '100.00',
	},
	{
		id: 22,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 2,
				price_at_the_time: '60.00',
			},
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 9,
					short_name: 'Cheddar Cheese',
					long_name: 'Processed Cheddar Cheese 250g',
					barcode: 'A-000410-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '350.00',
			},
		],
		order_date: '2021-08-29',
		original_price: '790.00',
		discount: '0.00',
	},
	{
		id: 14,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '60.00',
			},
		],
		order_date: '2021-07-28',
		original_price: '680.00',
		discount: '0.00',
	},
	{
		id: 15,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 0,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 0,
				price_at_the_time: '60.00',
			},
		],
		order_date: '2021-05-28',
		original_price: '900.00',
		discount: '0.00',
	},
	{
		id: 17,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 12,
					short_name: 'Crunchee Carols',
					long_name: 'Munchee Biscuit Crunchee Carols 275g',
					barcode: 'A-000650-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/cc_leef8j',
					category: 'biscuit',
					created_by: 2,
				},
				quantity: 1,
				price_at_the_time: '140.00',
			},
		],
		order_date: '2021-04-28',
		original_price: '140.00',
		discount: '0.00',
	},
	{
		id: 23,
		customer: {
			shop_name: 'saman groceries',
			owner_first_name: 'Saman',
			owner_last_name: 'Fernando',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632731928813_gfllpj',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '60.00',
			},
			{
				product: {
					id: 9,
					short_name: 'Cheddar Cheese',
					long_name: 'Processed Cheddar Cheese 250g',
					barcode: 'A-000410-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '350.00',
			},
			{
				product: {
					id: 12,
					short_name: 'Crunchee Carols',
					long_name: 'Munchee Biscuit Crunchee Carols 275g',
					barcode: 'A-000650-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/cc_leef8j',
					category: 'biscuit',
					created_by: 2,
				},
				quantity: 1,
				price_at_the_time: '140.00',
			},
		],
		order_date: '2021-09-30',
		original_price: '750.00',
		discount: '0.00',
	},
	{
		id: 24,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 9,
					short_name: 'Cheddar Cheese',
					long_name: 'Processed Cheddar Cheese 250g',
					barcode: 'A-000410-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
					category: 'cheese',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '350.00',
			},
			{
				product: {
					id: 13,
					short_name: 'Oreo Biscuit',
					long_name: 'Oreo Biscuit Original Cream 256.5G',
					barcode: 'A-000730-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/oreo_ye6fzi',
					category: 'biscuit',
					created_by: 2,
				},
				quantity: 2,
				price_at_the_time: '650.00',
			},
		],
		order_date: '2021-09-30',
		original_price: '1850.00',
		discount: '0.00',
	},
	{
		id: 25,
		customer: {
			shop_name: 'gimhana stores pvt ltd',
			owner_first_name: 'gimhana',
			owner_last_name: 'silva',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/customer/image_cropper_1632541270785_sflxm1',
		},
		salesperson: {
			employee_no: 'EMP1001',
			email: 'kane@gmail.com',
			first_name: 'kane',
			last_name: 'peries',
			profile_picture:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		},
		order_items: [
			{
				product: {
					id: 6,
					short_name: 'Milk Cream Biscuit',
					long_name: 'Munchee Milk Cream Biscuit 255g',
					barcode: 'A-000170-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
					category: 'biscuit',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '120.00',
			},
			{
				product: {
					id: 8,
					short_name: 'Tipi Tip',
					long_name: 'Tipi Tip Extruded Snack 55g',
					barcode: 'A-000330-Z',
					product_image:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
					category: 'chips',
					created_by: 1,
				},
				quantity: 1,
				price_at_the_time: '60.00',
			},
		],
		order_date: '2021-10-01',
		original_price: '480.00',
		discount: '0.00',
	},
];
describe('customerSlice', () => {
	describe('reducers', () => {
		it('1) returns the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});
	});
	describe('extra reducers', () => {
		it('1) getServiceOrdersAsync.pending', () => {
			const nextState = reducer(initialState, getServiceOrdersAsync.pending());
			expect(nextState.serviceOrders).toBe(initialState.serviceOrders);
			expect(nextState.isLoading).toBe(true);
		});

		it('2) getServiceOrdersAsync.fulfilled', () => {
			const mockAsyncPayload = mockedData;
			const nextState = reducer(
				initialState,
				getServiceOrdersAsync.fulfilled(mockAsyncPayload)
			);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.serviceOrders).toBe(mockAsyncPayload);
		});

		it('3) getServiceOrdersAsync.rejected', () => {
			const nextState = reducer(initialState, getServiceOrdersAsync.rejected());
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBe('Error while accessing data');
		});
	});
	describe('getServiceOrdersAsync', () => {
		it('1) should call correct end point', async () => {
			const store = configureStore({
				reducer: (state = '', action) => {
					switch (action.type) {
						case 'serviceOrders/getServiceOrdersAsync/fulfilled':
							return action.payload;
						default:
							return state;
					}
				},
			});
			const getSpy = jest.spyOn(axios, 'get');

			await store.dispatch(getServiceOrdersAsync());
			expect(getSpy).toBeCalledWith(
				'https://teclix.herokuapp.com/customer-api/service-orders/',
				{ headers: { Authorization: 'Token null' } }
			);
		});
	});
});

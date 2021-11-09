import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import ServiceOrderDetailsHeader from './ServiceOrderDetailsHeader';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});
afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

const serviceOrder = {
	id: 9,
	customer: {
		shop_name: 'gimhana stores pvt ltd',
		owner_first_name: 'gimhana',
		owner_last_name: 'silva',
		profile_picture: 'profile_picture',
	},
	salesperson: {
		employee_no: 'EMP1022',
		email: 'shez@gmail.com',
		first_name: 'shehani',
		last_name: 'perera',
		profile_picture: 'profile_picture',
	},
	order_items: [
		{
			product: {
				id: 6,
				short_name: 'Milk Cream Biscuit',
				long_name: 'Munchee Milk Cream Biscuit 255g',
				barcode: 'A-000170-Z',
				product_image: 'product_image',
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
				product_image: 'product_image',
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
};

describe('should render correctly', () => {
	it('renders nothing when no service order object has passed as props', () => {
		act(() => {
			render(<ServiceOrderDetailsHeader />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders nothing when show Customer and show slaesperson both not set', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader serviceOrder={serviceOrder} />,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders nothing when show Customer and show slaesperson both set to true', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader
					serviceOrder={serviceOrder}
					showCustomer={true}
					showSP={true}
				/>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when props have set correctly', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader
					serviceOrder={serviceOrder}
					showCustomer={true}
				/>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"chakra-stack css-84zodg\\">
        <div class=\\"css-0\\">
          <p class=\\"chakra-text css-1tf103u\\" id=\\"serviceorder_order_id-9\\">Order Id 9</p>
          <p class=\\"chakra-text css-25wilz\\" id=\\"serviceorder_order_customer-9\\">Customer: gimhana stores pvt ltd</p>
          <p class=\\"chakra-text css-25wilz\\" id=\\"serviceorder_order_date-9\\">Date: 1/26/2021</p>
          <p class=\\"chakra-text css-25wilz\\" id=\\"serviceorder_order_price-9\\">Price: Rs.1500.00</p>
          <p class=\\"chakra-text css-ffpbe9\\" id=\\"serviceorder_order_discount-9\\">Discount: Rs.0.00</p>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct order id', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader
					serviceOrder={serviceOrder}
					showCustomer={true}
				/>,
				container
			);
		});
		expect(
			container.querySelector(`#serviceorder_order_id-${serviceOrder.id}`)
				.textContent
		).toBe(`Order Id ${serviceOrder.id}`);
	});
	it('should have correct customer name', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader
					serviceOrder={serviceOrder}
					showCustomer={true}
				/>,
				container
			);
		});
		expect(
			container.querySelector(`#serviceorder_order_customer-${serviceOrder.id}`)
				.textContent
		).toBe(`Customer: ${serviceOrder.customer.shop_name}`);
	});
	it('should have correct price', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader
					serviceOrder={serviceOrder}
					showCustomer={true}
				/>,
				container
			);
		});
		expect(
			container.querySelector(`#serviceorder_order_price-${serviceOrder.id}`)
				.textContent
		).toBe(`Price: Rs.${serviceOrder.original_price}`);
	});
	it('should have correct discount', () => {
		act(() => {
			render(
				<ServiceOrderDetailsHeader serviceOrder={serviceOrder} showSP={true} />,
				container
			);
		});
		expect(
			container.querySelector(`#serviceorder_order_discount-${serviceOrder.id}`)
				.textContent
		).toBe(`Discount: Rs.${serviceOrder.discount}`);
	});
});

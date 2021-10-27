import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import CustomerCard from './CustomerCard';

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

const customer = {
	id: '000',
	shop_name: 'shop_name',
	owner_first_name: 'owner_first_name',
	owner_last_name: 'owner_last_name',
	email: 'email',
	contact_no: 'contact_no',
	profile_picture: 'profile_picture',
	latitude: 6.8791726289899415,
	longitude: 79.87282769044438,
	street: 'street',
	city: 'city',
	district: 'district',
	loyalty_points: 0,
};

describe('should render correctly', () => {
	it('renders nothing when no customer object has passed as props', () => {
		act(() => {
			render(<CustomerCard />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when customer object has passed as props', () => {
		const onClick = jest.fn();
		act(() => {
			render(<CustomerCard customer={customer} onClick={onClick} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div id=\\"customer-card-div-000\\" class=\\"css-1j7ywsa\\">
          <div class=\\"chakra-stack css-84zodg\\"><span id=\\"profile_picture\\" alt=\\"shop_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
            <div class=\\"css-0\\">
              <h2 class=\\"chakra-heading css-585c6h\\" id=\\"shop_name\\">shop_name<span class=\\"chakra-badge css-1gnzr7p\\" id=\\"customer_id\\">#Customer Id 000</span></h2>
              <p class=\\"chakra-text css-ffpbe9\\" id=\\"owner_name\\">Owner: owner_first_name owner_last_name</p>
              <p class=\\"chakra-text css-1jc5rgj\\" id=\\"email\\">Email: email</p>
              <p class=\\"chakra-text css-1jc5rgj\\" id=\\"contact_no\\">Mobile: contact_no</p>
              <p class=\\"chakra-text css-1tf103u\\" id=\\"address\\">Address: street, city, district</p>
            </div>
            <div class=\\"css-17xejub\\"></div>
            <div class=\\"chakra-stack css-owjkmg\\"><span class=\\"chakra-badge css-1ppzcwy\\" id=\\"loyalty_points\\">#Loyalty: 0 points</span></div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct shop name', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('h2').textContent).toBe(
			`${customer.shop_name}#Customer Id ${customer.id}`
		);
	});
	it('should have correct customer id', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('#customer_id').textContent).toBe(
			`#Customer Id ${customer.id}`
		);
	});
	it('should have correct owner name', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('#owner_name').textContent).toBe(
			`Owner: ${customer.owner_first_name} ${customer.owner_last_name}`
		);
	});
	it('should have correct email', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('#email').textContent).toBe(
			`Email: ${customer.email}`
		);
	});
	it('should have correct contact no', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('#contact_no').textContent).toBe(
			`Mobile: ${customer.contact_no}`
		);
	});
	it('should have correct address', () => {
		act(() => {
			render(<CustomerCard customer={customer} />, container);
		});
		expect(container.querySelector('#address').textContent).toBe(
			`Address: ${customer.street}, ${customer.city}, ${customer.district}`
		);
	});
});

describe('should call the function', () => {
	it('should call the function on click on the card', () => {
		const onClick = jest.fn();
		act(() => {
			render(<CustomerCard customer={customer} onClick={onClick} />, container);
			const card = container.querySelector(`#customer-card-div-${customer.id}`);
			ReactTestUtils.Simulate.click(card);
		});
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});

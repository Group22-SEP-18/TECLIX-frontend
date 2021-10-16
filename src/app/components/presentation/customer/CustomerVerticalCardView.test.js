import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import CustomerVerticalCardView from './CustomerVerticalCardView';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	process.env.REACT_APP_GOOGLE_MAP_URL = 'dummy_url';
});
afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	delete process.env.REACT_APP_GOOGLE_MAP_URL;
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
	outstanding: 0,
};

describe('should render correctly', () => {
	it('renders nothing when no customer object has passed as props', () => {
		act(() => {
			render(<CustomerVerticalCardView />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when customer object has passed as props', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-gmuwbf\\">
        <div id=\\"customer_vertical_card_div\\" class=\\"css-ehb6y3\\"><span id=\\"customer_vertical_card_div_profile_picture\\" alt=\\"shop_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
          <p class=\\"chakra-text css-cg884e\\" id=\\"customer_vertical_card_div_customer_id\\">#Customer Id 000</p>
          <h2 class=\\"chakra-heading css-1otogg9\\" id=\\"customer_vertical_card_div_shop_name\\">shop_name</h2>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"customer_vertical_card_div_owner_name\\">Owner: owner_first_name owner_last_name</p>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"customer_vertical_card_div_email\\">Email: email</p>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"customer_vertical_card_div_contact_no\\">Mobile: contact_no</p>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"customer_vertical_card_div_address\\">Address: street, city, district</p>
          <div class=\\"chakra-stack css-1oitd62\\">
            <div class=\\"chakra-stat css-1mbo1ls\\">
              <dl>
                <dt class=\\"chakra-stat__label css-0\\">Customer Outstanding</dt>
                <dd class=\\"chakra-stat__number css-fvxuh5\\">Rs. 0</dd>
              </dl>
            </div>
            <div class=\\"chakra-stat css-1mbo1ls\\">
              <dl>
                <dt class=\\"chakra-stat__label css-0\\">Customer Loyalty Points</dt>
                <dd class=\\"chakra-stat__number css-fvxuh5\\">0</dd>
              </dl>
            </div>
          </div>
          <div id=\\"customer_vertical_card_div_map-000\\">
            <div>
              <p class=\\"chakra-text css-kkw157\\">Location</p>
              <div class=\\"css-90jtzs\\">
                <div style=\\"height: 100%;\\"></div>
              </div>
            </div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct shop name', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_shop_name')
				.textContent
		).toBe(`${customer.shop_name}`);
	});
	it('should have correct customer id', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_customer_id')
				.textContent
		).toBe(`#Customer Id ${customer.id}`);
	});
	it('should have correct owner name', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_owner_name')
				.textContent
		).toBe(`Owner: ${customer.owner_first_name} ${customer.owner_last_name}`);
	});
	it('should have correct email', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_email').textContent
		).toBe(`Email: ${customer.email}`);
	});
	it('should have correct contact no', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_contact_no')
				.textContent
		).toBe(`Mobile: ${customer.contact_no}`);
	});
	it('should have correct address', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector('#customer_vertical_card_div_address').textContent
		).toBe(
			`Address: ${customer.street}, ${customer.city}, ${customer.district}`
		);
	});
	it('should have contain a map view', () => {
		act(() => {
			render(<CustomerVerticalCardView customer={customer} />, container);
		});
		expect(
			container.querySelector(`#customer_vertical_card_div_map-${customer.id}`)
				.textContent
		).toBe('Location');
	});
});

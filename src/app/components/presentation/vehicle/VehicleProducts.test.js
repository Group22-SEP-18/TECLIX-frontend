import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import VehicleProducts from './VehicleProducts';

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

const product_details = {
	product_imageURL: 'product_imageURL',
	product_shortname: 'product_shortname',
	product_quantity: 10,
};

describe('should render correctly', () => {
	it('renders nothing when props has not passed', () => {
		act(() => {
			render(<VehicleProducts />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when props has passed', () => {
		act(() => {
			render(
				<VehicleProducts
					product_imageURL={product_details.product_imageURL}
					product_shortname={product_details.product_shortname}
					product_quantity={product_details.product_quantity}
				/>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <li class=\\"chakra-wrap__listitem css-1yp4ln\\"><span class=\\"css-1ehzxp\\"><span id=\\"product_quantity\\" class=\\"css-158qt47\\">10x</span><span class=\\"chakra-avatar css-1beiwy6\\"><div role=\\"img\\" aria-label=\\"Segun Adebayo\\" class=\\"chakra-avatar__initials css-0\\">SA</div></span><span id=\\"product_shortname\\" class=\\"css-8uhtka\\">product_shortname</span></span></li>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct product short name', () => {
		act(() => {
			render(
				<VehicleProducts
					product_imageURL={product_details.product_imageURL}
					product_shortname={product_details.product_shortname}
					product_quantity={product_details.product_quantity}
				/>,
				container
			);
		});
		expect(container.querySelector('#product_shortname').textContent).toBe(
			`${product_details.product_shortname}`
		);
	});
	it('should have correct product quantity', () => {
		act(() => {
			render(
				<VehicleProducts
					product_imageURL={product_details.product_imageURL}
					product_shortname={product_details.product_shortname}
					product_quantity={product_details.product_quantity}
				/>,
				container
			);
		});
		expect(container.querySelector('#product_quantity').textContent).toBe(
			`${product_details.product_quantity}x`
		);
	});
});

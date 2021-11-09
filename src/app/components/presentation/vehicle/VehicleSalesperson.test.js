import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import VehicleSalesperson from './VehicleSalesperson';

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

const salesperson_details = {
	image_url: 'image_url',
	first_name: 'First_name',
	last_name: 'Last_name',
};

describe('should render correctly', () => {
	it('renders nothing when props has not passed', () => {
		act(() => {
			render(<VehicleSalesperson />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when props has passed', () => {
		act(() => {
			render(
				<VehicleSalesperson
					image_url={salesperson_details.image_url}
					first_name={salesperson_details.first_name}
					last_name={salesperson_details.last_name}
				/>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
			`"<li class=\\"chakra-wrap__listitem css-1yp4ln\\"><span class=\\"css-1ehzxp\\"><span class=\\"chakra-avatar css-1beiwy6\\"><div role=\\"img\\" aria-label=\\"Segun Adebayo\\" class=\\"chakra-avatar__initials css-0\\">SA</div></span><span id=\\"name\\" class=\\"css-8uhtka\\">First_name Last_name</span></span></li>"`
		);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct product first name', () => {
		act(() => {
			render(
				<VehicleSalesperson
					image_url={salesperson_details.image_url}
					first_name={salesperson_details.first_name}
					last_name={salesperson_details.last_name}
				/>,
				container
			);
		});
		expect(container.querySelector('#name').textContent).toBe(
			`${salesperson_details.first_name} ${salesperson_details.last_name}`
		);
	});
});

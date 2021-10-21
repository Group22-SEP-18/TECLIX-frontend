import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import DOCard from './DOCard';

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

const dOfficer = {
	id: '000',
	employee_no: 'employee_no',
	first_name: 'first_name',
	last_name: 'last_name',
	email: 'email',
	contact_no: 'contact_no',
	profile_picture: 'profile_picture',
	is_rejected: false,
	is_approved: true,
};

describe('should render correctly', () => {
	it('renders nothing when no customer object has passed as props', () => {
		act(() => {
			render(<DOCard />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when customer object has passed as props', () => {
		act(() => {
			render(<DOCard dOfficer={dOfficer} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot();
	});
});

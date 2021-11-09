import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DOCard from './DOCard';

let container = null;
const mockStore = configureStore([]);
let store;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	store = mockStore({
		distributionOfficers: {
			isLoading: false,
			distributionOfficers: [],
			error: '',
			approve: {
				isLoading: false,
				success: null,
				error: null,
				id: '',
			},
			reject: {
				isLoading: false,
				success: null,
				error: null,
				id: '',
			},
			listViewFilter: '',
		},
	});
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
	first_name: 'First_name',
	last_name: 'Last_name',
	email: 'email',
	contact_no: 'contact_no',
	profile_picture: 'profile_picture',
	is_rejected: false,
	is_approved: true,
};

describe('should render correctly', () => {
	it('renders nothing when no dOfficer object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when dOfficer object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div id=\\"dOfficer-card-div-000\\" class=\\"css-1j7ywsa\\">
          <div class=\\"chakra-stack css-84zodg\\"><span alt=\\"First_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
            <div class=\\"css-0\\">
              <h2 class=\\"chakra-heading css-585c6h\\" id=\\"dOfficer_name-000\\">First_name Last_name<span class=\\"chakra-badge css-1gnzr7p\\" id=\\"dOfficer_id-000\\">#Employee Id employee_no</span></h2>
              <p class=\\"chakra-text css-1jc5rgj\\" id=\\"dOfficer_email-000\\">Email: email</p>
              <p class=\\"chakra-text css-1jc5rgj\\" id=\\"dOfficer_contact_no-000\\">Mobile: contact_no</p>
            </div>
            <div class=\\"css-17xejub\\"></div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct shop name', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('h2').textContent).toBe(
			`${dOfficer.first_name} ${dOfficer.last_name}#Employee Id ${dOfficer.employee_no}`
		);
	});
	it('should have correct dOfficer id', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#dOfficer_id-${dOfficer.id}`).textContent
		).toBe(`#Employee Id ${dOfficer.employee_no}`);
	});
	it('should have correct email', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#dOfficer_email-${dOfficer.id}`).textContent
		).toBe(`Email: ${dOfficer.email}`);
	});
	it('should have correct contact no', () => {
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#dOfficer_contact_no-${dOfficer.id}`).textContent
		).toBe(`Mobile: ${dOfficer.contact_no}`);
	});
	it('should have a button to reject if account is not approved', () => {
		dOfficer.is_approved = false;
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#dOfficer_reject_button-${dOfficer.id}`)
				.textContent
		).toBe('Reject');
	});
	it('should have a button to approve if account is not approved', () => {
		dOfficer.is_approved = false;
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#dOfficer_approve_button-${dOfficer.id}`)
				.textContent
		).toBe('Approve');
	});
});

describe('should call the function', () => {
	it('should call the function on click on the reject button', () => {
		dOfficer.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#dOfficer_reject_button-${dOfficer.id}`
		);
		button.onclick = onClick;
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});

		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('should call the function on click on the reject button', () => {
		dOfficer.is_approved = false;
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#dOfficer_reject_button-${dOfficer.id}`
		);
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});
	});
	it('should call the function on click on the approve button', () => {
		dOfficer.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#dOfficer_approve_button-${dOfficer.id}`
		);
		button.onclick = onClick;
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});

		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('should call the function on click on the approve button', () => {
		dOfficer.is_approved = false;
		act(() => {
			render(
				<Provider store={store}>
					<DOCard dOfficer={dOfficer} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#dOfficer_approve_button-${dOfficer.id}`
		);
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});
	});
});

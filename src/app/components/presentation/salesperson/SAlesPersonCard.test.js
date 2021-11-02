import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SalesPersonCard from './SalesPersonCard';

let container = null;
const mockStore = configureStore([]);
let store;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	store = mockStore({
		salespersons: {
			isLoading: false,
			salespersons: [],
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

const salesperson = {
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
	it('renders nothing when no salesperson object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when salesperson object has passed as props', () => {
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div id=\\"salesperson-card-div-000\\" class=\\"css-1j7ywsa\\">
          <div class=\\"chakra-stack css-84zodg\\"><span alt=\\"first_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
            <div class=\\"css-0\\">
              <h2 class=\\"chakra-heading css-585c6h\\" id=\\"salesperson_name-000\\">first_name last_name<span class=\\"chakra-badge css-1gnzr7p\\" id=\\"salesperson_id-000\\">#Employee Id employee_no</span></h2>
              <p class=\\"chakra-text css-t9ge1v\\" id=\\"salesperson_email-000\\">Email: email</p>
              <p class=\\"chakra-text css-ffpbe9\\" id=\\"salesperson_contact_no-000\\">Mobile: contact_no</p>
              <p class=\\"chakra-text css-xu3oxt\\">Leaderboard Points</p>
              <div class=\\"chakra-stack css-1vkb756\\"><span class=\\"chakra-badge css-17ghhdd\\">#Today: points</span><span class=\\"chakra-badge css-17ghhdd\\">#Month: points</span><span class=\\"chakra-badge css-17ghhdd\\">#All Time: points</span></div>
            </div>
            <div class=\\"css-17xejub\\"></div>
          </div>
        </div>
      </div>"
    `);
	});
	it('renders correctly when salesperson object has passed as props', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div id=\\"salesperson-card-div-000\\" class=\\"css-ip1xth\\">
          <div class=\\"chakra-stack css-84zodg\\"><span alt=\\"first_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
            <div class=\\"css-0\\">
              <h2 class=\\"chakra-heading css-585c6h\\" id=\\"salesperson_name-000\\">first_name last_name<span class=\\"chakra-badge css-1gnzr7p\\" id=\\"salesperson_id-000\\">#Employee Id employee_no</span></h2>
              <p class=\\"chakra-text css-t9ge1v\\" id=\\"salesperson_email-000\\">Email: email</p>
              <p class=\\"chakra-text css-ffpbe9\\" id=\\"salesperson_contact_no-000\\">Mobile: contact_no</p>
            </div>
            <div class=\\"css-17xejub\\"></div>
            <div class=\\"css-0\\">
              <div class=\\"chakra-stack css-owjkmg\\">
                <div class=\\"css-17xejub\\"></div><button type=\\"button\\" class=\\"chakra-button css-5c2176\\" id=\\"salesperson_reject_button-000\\">Reject<span class=\\"chakra-button__icon css-1hzyiq5\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-onkibi\\" aria-hidden=\\"true\\"><path fill=\\"currentColor\\" d=\\"M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z\\"></path></svg></span></button><button type=\\"button\\" class=\\"chakra-button css-5c2176\\" id=\\"salesperson_approve_button-000\\"><span class=\\"chakra-button__icon css-1wh2kri\\"><svg viewBox=\\"0 0 14 14\\" focusable=\\"false\\" class=\\"chakra-icon css-onkibi\\" aria-hidden=\\"true\\"><g fill=\\"currentColor\\"><polygon points=\\"5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039\\"></polygon></g></svg></span>Approve</button>
              </div>
            </div>
          </div>
        </div>
      </div>"
    `);
		salesperson.is_approved = true;
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct shop name', () => {
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('h2').textContent).toBe(
			`${salesperson.first_name} ${salesperson.last_name}#Employee Id ${salesperson.employee_no}`
		);
	});
	it('should have correct salesperson id', () => {
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_id-${salesperson.id}`).textContent
		).toBe(`#Employee Id ${salesperson.employee_no}`);
	});
	it('should have correct email', () => {
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_email-${salesperson.id}`)
				.textContent
		).toBe(`Email: ${salesperson.email}`);
	});
	it('should have correct contact no', () => {
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_contact_no-${salesperson.id}`)
				.textContent
		).toBe(`Mobile: ${salesperson.contact_no}`);
	});
	it('should have a button to reject if account is not approved', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_reject_button-${salesperson.id}`)
				.textContent
		).toBe('Reject');
	});
	it('should have a button to approve if account is not approved', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_approve_button-${salesperson.id}`)
				.textContent
		).toBe('Approve');
	});
});

describe('should call the function', () => {
	it('should call the function on click on the reject button', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#salesperson_reject_button-${salesperson.id}`
		);
		button.onclick = onClick;
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});

		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('should call the function on click on the reject button', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#salesperson_reject_button-${salesperson.id}`
		);
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});
	});
	it('should call the function on click on the approve button', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#salesperson_approve_button-${salesperson.id}`
		);
		button.onclick = onClick;
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});

		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('should call the function on click on the approve button', () => {
		salesperson.is_approved = false;
		const onClick = jest.fn();
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonCard salesperson={salesperson} onClick={onClick} />
				</Provider>,
				container
			);
		});
		const button = document.querySelector(
			`#salesperson_approve_button-${salesperson.id}`
		);
		act(() => {
			button.dispatchEvent(new MouseEvent('click', {}));
		});
	});
});

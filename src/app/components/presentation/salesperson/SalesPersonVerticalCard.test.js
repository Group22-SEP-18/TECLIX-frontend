import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SalesPersonVerticalCard from './SalesPersonVerticalCard';

let container = null;
const mockStore = configureStore([]);
let store;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	process.env.REACT_APP_GOOGLE_MAP_URL = 'dummy_url';
	store = mockStore({
		locations: {
			isLoading: false,
			locations: [
				{
					salesperson: {
						employee_no: 'employee_no',
					},
					customer: {
						latitude: 6.8791726289899415,
						longitude: 79.87282769044438,
					},
					date: '2021-06-22T17:33:34Z',
				},
				{
					salesperson: {
						employee_no: 'employee_no_other',
					},
					customer: {
						latitude: 6.984306385997563,
						longitude: 79.93313803980053,
					},
					date: '2021-06-22T17:33:34Z',
				},
				{
					salesperson: {
						employee_no: 'employee_no',
					},
					customer: {
						latitude: 6.8791726289899415,
						longitude: 79.87282769044438,
					},
					date: '2021-03-23T20:26:57Z',
				},
			],
			error: '',
			filters: {
				from: '',
				to: '',
				salesperson_id: '',
			},
		},
	});
});
afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	delete process.env.REACT_APP_GOOGLE_MAP_URL;
});

const salesperson = {
	id: '000',
	employee_no: 'employee_no',
	first_name: 'first_name',
	last_name: 'last_name',
	email: 'email',
	mobile_no: 'contact_no',
	profile_picture: 'profile_picture',
	is_rejected: false,
	is_approved: true,
};

describe('should render correctly', () => {
	it('renders correctly when salesperson object with no locations has passed as props', () => {
		store = mockStore({
			locations: {
				isLoading: false,
				locations: [],
				error: '',
				filters: {
					from: '',
					to: '',
					salesperson_id: '',
				},
			},
		});
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-gmuwbf\\">
        <div id=\\"salesperson-vertical-card-div-000\\" class=\\"css-ehb6y3\\"><span alt=\\"first_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
          <p class=\\"chakra-text css-cg884e\\" id=\\"salesperson_id-000\\">#Emplooyee Id employee_no</p>
          <h2 class=\\"chakra-heading css-1otogg9\\" id=\\"salesperson_name-000\\">first_name last_name</h2>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"salesperson_email-000\\">email</p>
          <p class=\\"chakra-text css-gxyrna\\" id=\\"salesperson_mobile_no-000\\">contact_no</p>
          <div class=\\"chakra-stack css-1oitd62\\"><span class=\\"chakra-badge css-2mww85\\">#Today: points</span><span class=\\"chakra-badge css-2mww85\\">#Month: points</span><span class=\\"chakra-badge css-2mww85\\">#All Time: points</span></div>
          <div id=\\"salesperson_map-000\\">
            <div>
              <p class=\\"chakra-text css-kkw157\\">Last Location</p>
              <div class=\\"css-90jtzs\\">
                <div>
                  <div class=\\"chakra-skeleton css-1m726o4\\">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>"
    `);
	});
	it('renders correctly when salesperson object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-gmuwbf\\">
        <div id=\\"salesperson-vertical-card-div-000\\" class=\\"css-ehb6y3\\"><span alt=\\"first_name\\" class=\\"chakra-avatar css-1nxj0xu\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
          <p class=\\"chakra-text css-cg884e\\" id=\\"salesperson_id-000\\">#Emplooyee Id employee_no</p>
          <h2 class=\\"chakra-heading css-1otogg9\\" id=\\"salesperson_name-000\\">first_name last_name</h2>
          <p class=\\"chakra-text css-r7cc7s\\" id=\\"salesperson_email-000\\">email</p>
          <p class=\\"chakra-text css-gxyrna\\" id=\\"salesperson_mobile_no-000\\">contact_no</p>
          <div class=\\"chakra-stack css-1oitd62\\"><span class=\\"chakra-badge css-2mww85\\">#Today: points</span><span class=\\"chakra-badge css-2mww85\\">#Month: points</span><span class=\\"chakra-badge css-2mww85\\">#All Time: points</span></div>
          <div id=\\"salesperson_map-000\\">
            <div>
              <p class=\\"chakra-text css-kkw157\\">Last Location</p>
              <div class=\\"css-90jtzs\\">
                <div>
                  <div class=\\"chakra-skeleton css-1m726o4\\">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct  name', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_name-${salesperson.id}`).textContent
		).toBe(`${salesperson.first_name} ${salesperson.last_name}`);
	});
	it('should have correct salesperson id', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_id-${salesperson.id}`).textContent
		).toBe(`#Emplooyee Id ${salesperson.employee_no}`);
	});
	it('should have correct email', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_email-${salesperson.id}`)
				.textContent
		).toBe(`${salesperson.email}`);
	});
	it('should have correct contact no', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_mobile_no-${salesperson.id}`)
				.textContent
		).toBe(`${salesperson.mobile_no}`);
	});
	it('should have contain a map view', () => {
		act(() => {
			render(
				<Provider store={store}>
					<SalesPersonVerticalCard salesperson={salesperson} />
				</Provider>,
				container
			);
		});
		expect(
			container.querySelector(`#salesperson_map-${salesperson.id}`).textContent
		).toBe('Last Location');
	});
});

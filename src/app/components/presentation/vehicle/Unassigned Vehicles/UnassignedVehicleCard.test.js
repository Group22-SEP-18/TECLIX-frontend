import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import UnassignedVehicleCard from './UnAssignedVehicleCard';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let container = null;
const mockStore = configureStore([]);
let store;

beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	store = mockStore({
		vehicles: {
			isLoading: false,
			vehicles: [],
			error: '',
			deletevehicle: {
				isLoading: false,
				success: false,
				error: null,
			},
		},
	});
});
afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

const vehicle = {
	id: 2,
	vehicle_number: 'NC-1234',
	vehicle_type: 'LORRY',
	vehicle_image:
		'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture9_k8irkm',
	vehicle_model: 'Maxmo Batta',
	created_by: 1,
};

describe('should render correctly', () => {
	it('renders nothing when no vehicle object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<UnassignedVehicleCard />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when vehicle object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<UnassignedVehicleCard
						vehicle_type={vehicle.vehicle_type}
						vehicle_number={vehicle.vehicle_number}
						vehicle_model={vehicle.vehicle_model}
						vehicle_image={vehicle.vehicle_image}
						id={vehicle.id}
					/>
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-1cz9j0f\\">
        <div class=\\"css-1q0qrhy\\"><img alt=\\"Picture of LORRY\\" src=\\"https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture9_k8irkm\\" class=\\"chakra-image css-1dees6t\\">
          <div class=\\"css-1ch38nq\\">
            <div class=\\"chakra-stat css-1mbo1ls\\">
              <dl>
                <dt id=\\"vehicle-model-number\\" class=\\"chakra-stat__label css-0\\">Maxmo Batta NC-1234</dt>
                <dd id=\\"vehicle-type\\" class=\\"chakra-stat__number css-fvxuh5\\">LORRY</dd>
                <dd id=\\"vehicle-id\\" class=\\"chakra-stat__help-text css-0\\">ID: 2</dd>
              </dl>
            </div>
          </div>
          <hr aria-orientation=\\"horizontal\\" class=\\"chakra-divider css-3rjf8c\\">
          <div class=\\"chakra-stack css-ka8e4t\\">
            <div class=\\"css-0\\"><button type=\\"button\\" class=\\"chakra-button css-5054ql\\"><span class=\\"chakra-button__icon css-1wh2kri\\"><svg stroke=\\"currentColor\\" fill=\\"currentColor\\" stroke-width=\\"0\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\" focusable=\\"false\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z\\"></path></svg></span>Assign</button></div>
            <div class=\\"css-0\\"><button type=\\"button\\" class=\\"chakra-button css-5054ql\\"><span class=\\"chakra-button__icon css-1wh2kri\\"><svg stroke=\\"currentColor\\" fill=\\"currentColor\\" stroke-width=\\"0\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\" focusable=\\"false\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\\"></path></svg></span>Delete</button></div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct vehicle model and number', () => {
		act(() => {
			render(
				<Provider store={store}>
					<UnassignedVehicleCard
						vehicle_type={vehicle.vehicle_type}
						vehicle_number={vehicle.vehicle_number}
						vehicle_model={vehicle.vehicle_model}
						vehicle_image={vehicle.vehicle_image}
						id={vehicle.id}
					/>
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#vehicle-model-number').textContent).toBe(
			`${vehicle.vehicle_model} ${vehicle.vehicle_number}`
		);
	});
	it('should have correct vehicle model', () => {
		act(() => {
			render(
				<Provider store={store}>
					<UnassignedVehicleCard
						vehicle_type={vehicle.vehicle_type}
						vehicle_number={vehicle.vehicle_number}
						vehicle_model={vehicle.vehicle_model}
						vehicle_image={vehicle.vehicle_image}
						id={vehicle.id}
					/>
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#vehicle-type').textContent).toBe(
			`${vehicle.vehicle_type}`
		);
	});
	it('should have correct vehicle id', () => {
		act(() => {
			render(
				<Provider store={store}>
					<UnassignedVehicleCard
						vehicle_type={vehicle.vehicle_type}
						vehicle_number={vehicle.vehicle_number}
						vehicle_model={vehicle.vehicle_model}
						vehicle_image={vehicle.vehicle_image}
						id={vehicle.id}
					/>
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#vehicle-id').textContent).toBe(
			`ID: ${vehicle.id}`
		);
	});
});

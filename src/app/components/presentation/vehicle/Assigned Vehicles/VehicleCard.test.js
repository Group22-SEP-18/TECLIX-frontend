import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import VehicleCard from './VehicleCard';

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

const vehicle_data = {
	id: 4,
	vehicle: {
		id: 2,
		vehicle_number: 'NC-1234',
		vehicle_type: 'LORRY',
		vehicle_image:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture9_k8irkm',
		vehicle_model: 'Maxmo Batta',
	},
	assigned_vehicle: [
		{
			product: {
				id: 4,
				short_name: 'Choco Pie',
				long_name: 'Choco Pie 6 packs 100g',
				barcode: 'A-000010-Z',
				product_image:
					'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture1_raj9xg',
				category: 'cookies',
				price: '250.00',
			},
			quantity: 15,
		},
		{
			product: {
				id: 6,
				short_name: 'Milk Cream Biscuit',
				long_name: 'Munchee Milk Cream Biscuit 255g',
				barcode: 'A-000170-Z',
				product_image:
					'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
				category: 'biscuit',
				price: '120.00',
			},
			quantity: 4,
		},
	],
	is_valid: true,
	salesperson: 1,
};

const allsalesperson = [
	{
		id: 1,
		email: 'kane@gmail.com',
		employee_no: 'EMP1001',
		first_name: 'kane',
		last_name: 'peries',
		contact_no: '0771234569',
		profile_picture:
			'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
		is_approved: true,
	},
];

describe('should render correctly', () => {
	it('renders nothing when no vehicle data has passed as props', () => {
		act(() => {
			render(<VehicleCard />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when vehicle data has passed as props', () => {
		act(() => {
			render(
				<VehicleCard
					vehicle_type={vehicle_data.vehicle.vehicle_type}
					vehicle_number={vehicle_data.vehicle.vehicle_number}
					vehicle_model={vehicle_data.vehicle.vehicle_model}
					vehicle_image={vehicle_data.vehicle.vehicle_image}
					salesperson={vehicle_data.salesperson}
					assigned_products={vehicle_data.assigned_vehicle}
					id={vehicle_data.vehicle.id}
					allsalespersons={allsalesperson}
				/>,
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
          <div class=\\"chakra-stack css-zsoya5\\">
            <div class=\\"css-0\\">
              <div class=\\"chakra-wrap css-18ylw8\\">
                <ul class=\\"chakra-wrap__list css-umyqv7\\">
                  <div>
                    <li class=\\"chakra-wrap__listitem css-1yp4ln\\"><span class=\\"css-1ehzxp\\"><span id=\\"product_quantity\\" class=\\"css-158qt47\\">15x</span><span class=\\"chakra-avatar css-1beiwy6\\"><div role=\\"img\\" aria-label=\\"Segun Adebayo\\" class=\\"chakra-avatar__initials css-0\\">SA</div></span><span id=\\"product_shortname\\" class=\\"css-8uhtka\\">Choco Pie</span></span></li>
                  </div>
                  <div>
                    <li class=\\"chakra-wrap__listitem css-1yp4ln\\"><span class=\\"css-1ehzxp\\"><span id=\\"product_quantity\\" class=\\"css-158qt47\\">4x</span><span class=\\"chakra-avatar css-1beiwy6\\"><div role=\\"img\\" aria-label=\\"Segun Adebayo\\" class=\\"chakra-avatar__initials css-0\\">SA</div></span><span id=\\"product_shortname\\" class=\\"css-8uhtka\\">Milk Cream Biscuit</span></span></li>
                  </div>
                </ul>
              </div>
            </div>
            <div class=\\"chakra-stack__divider css-jutndq\\"></div>
            <div class=\\"css-1bxcybj\\">
              <div class=\\"chakra-wrap css-0\\">
                <ul class=\\"chakra-wrap__list css-umyqv7\\">
                  <li class=\\"chakra-wrap__listitem css-1yp4ln\\"><span class=\\"css-1ehzxp\\"><span class=\\"chakra-avatar css-1beiwy6\\"><div role=\\"img\\" aria-label=\\"Segun Adebayo\\" class=\\"chakra-avatar__initials css-0\\">SA</div></span><span id=\\"name\\" class=\\"css-8uhtka\\">kane peries</span></span></li>
                </ul>
              </div>
            </div>
          </div>
          <hr aria-orientation=\\"horizontal\\" class=\\"chakra-divider css-1upb9tn\\">
          <div class=\\"chakra-stack css-ka8e4t\\">
            <div class=\\"css-0\\"><button type=\\"button\\" class=\\"chakra-button css-5lnxyi\\"><span class=\\"chakra-button__icon css-1wh2kri\\"><svg stroke=\\"currentColor\\" fill=\\"currentColor\\" stroke-width=\\"0\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\" focusable=\\"false\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z\\"></path></svg></span>Assignments</button></div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct model and vehicle number', () => {
		act(() => {
			render(
				<VehicleCard
					vehicle_type={vehicle_data.vehicle.vehicle_type}
					vehicle_number={vehicle_data.vehicle.vehicle_number}
					vehicle_model={vehicle_data.vehicle.vehicle_model}
					vehicle_image={vehicle_data.vehicle.vehicle_image}
					salesperson={vehicle_data.salesperson}
					assigned_products={vehicle_data.assigned_vehicle}
					id={vehicle_data.vehicle.id}
					allsalespersons={allsalesperson}
				/>,
				container
			);
		});
		expect(container.querySelector('#vehicle-model-number').textContent).toBe(
			`${vehicle_data.vehicle.vehicle_model} ${vehicle_data.vehicle.vehicle_number}`
		);
	});
	it('should have correct vehicle type', () => {
		act(() => {
			render(
				<VehicleCard
					vehicle_type={vehicle_data.vehicle.vehicle_type}
					vehicle_number={vehicle_data.vehicle.vehicle_number}
					vehicle_model={vehicle_data.vehicle.vehicle_model}
					vehicle_image={vehicle_data.vehicle.vehicle_image}
					salesperson={vehicle_data.salesperson}
					assigned_products={vehicle_data.assigned_vehicle}
					id={vehicle_data.vehicle.id}
					allsalespersons={allsalesperson}
				/>,
				container
			);
		});
		expect(container.querySelector('#vehicle-type').textContent).toBe(
			`${vehicle_data.vehicle.vehicle_type}`
		);
	});
	it('should have correct vehicle id', () => {
		act(() => {
			render(
				<VehicleCard
					vehicle_type={vehicle_data.vehicle.vehicle_type}
					vehicle_number={vehicle_data.vehicle.vehicle_number}
					vehicle_model={vehicle_data.vehicle.vehicle_model}
					vehicle_image={vehicle_data.vehicle.vehicle_image}
					salesperson={vehicle_data.salesperson}
					assigned_products={vehicle_data.assigned_vehicle}
					id={vehicle_data.vehicle.id}
					allsalespersons={allsalesperson}
				/>,
				container
			);
		});
		expect(container.querySelector('#vehicle-id').textContent).toBe(
			`ID: ${vehicle_data.vehicle.id}`
		);
	});
});

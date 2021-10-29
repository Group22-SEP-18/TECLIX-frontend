import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import ServiceOrderProductTable from './ServiceOrderProductTable';

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

const order_items = [
	{
		product: {
			id: 6,
			short_name: 'Milk Cream Biscuit',
			long_name: 'Munchee Milk Cream Biscuit 255g',
			barcode: 'A-000170-Z',
			product_image: 'product_image',
			category: 'biscuit',
			created_by: 1,
		},
		quantity: 2,
		price_at_the_time: '350.00',
	},
	{
		product: {
			id: 8,
			short_name: 'Tipi Tip',
			long_name: 'Tipi Tip Extruded Snack 55g',
			barcode: 'A-000330-Z',
			product_image: 'product_image',
			category: 'chips',
			created_by: 1,
		},
		quantity: 2,
		price_at_the_time: '150.00',
	},
];

describe('should render correctly', () => {
	it('renders no products when no order items has passed as props', () => {
		act(() => {
			render(<ServiceOrderProductTable />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
			`"No products are included"`
		);
	});
	it('renders correctly when order items passed', () => {
		act(() => {
			render(<ServiceOrderProductTable order_items={order_items} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<table role=\\"table\\" class=\\"chakra-table css-0\\">
        <thead class=\\"css-0\\">
          <tr role=\\"row\\" class=\\"css-0\\">
            <th class=\\"css-0\\">Product</th>
            <th data-is-numeric=\\"true\\" class=\\"css-0\\">Quantity</th>
            <th data-is-numeric=\\"true\\" class=\\"css-0\\">Single Unit Price(Rs.)</th>
            <th data-is-numeric=\\"true\\" class=\\"css-0\\">Price (Rs.)</th>
          </tr>
        </thead>
        <tbody class=\\"css-0\\">
          <tr role=\\"row\\" class=\\"css-0\\">
            <td role=\\"gridcell\\" class=\\"css-0\\">Milk Cream Biscuit</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">2</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">350.00</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">700</td>
          </tr>
          <tr role=\\"row\\" class=\\"css-0\\">
            <td role=\\"gridcell\\" class=\\"css-0\\">Tipi Tip</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">2</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">150.00</td>
            <td role=\\"gridcell\\" data-is-numeric=\\"true\\" class=\\"css-0\\">300</td>
          </tr>
        </tbody>
      </table>"
    `);
	});
});

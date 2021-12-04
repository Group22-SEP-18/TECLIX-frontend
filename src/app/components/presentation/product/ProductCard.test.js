import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import ProductCard from './ProductCard';
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
		products: {
			isLoading: false,
			products: [],
			error: '',
			deleteproduct: {
				isLoading: false,
				success: false,
				error: null,
			},
		},
		user: {
			user: {
				user_role: 'Distribution Officer',
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

const product = {
	id: 8,
	short_name: 'Short_name',
	long_name: 'Long_name',
	barcode: 'barcode',
	product_image: 'product_image',
	category: 'Chips',
	price: '60.00',
};

describe('should render correctly', () => {
	it('renders nothing when no product object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when product object has passed as props', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard product={product} />
				</Provider>,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div class=\\"css-1cz9j0f\\">
          <div id=\\"product-card-div-8\\" class=\\"css-1q0qrhy\\"><img alt=\\"Picture of undefined\\" src=\\"product_image\\" class=\\"chakra-image css-cr9n15\\" id=\\"product_image\\">
            <div class=\\"css-1vae7t2\\">
              <div class=\\"css-x1sij0\\">
                <div class=\\"chakra-stack css-84zodg\\"><span class=\\"chakra-badge css-7mgg44\\" id=\\"category\\">Chips</span><span class=\\"chakra-badge css-13pdol3\\" id=\\"product_id\\">8</span></div>
              </div>
              <div class=\\"css-1tq6ef4\\">
                <h4 id=\\"short_name\\" class=\\"css-yy9s3l\\">Short_name</h4>
              </div>
              <div class=\\"css-11ou9c2\\">
                <div id=\\"price\\" class=\\"css-1n49pl7\\"><span class=\\"css-yzake9\\">Rs.</span>60.00</div>
                <div class=\\"css-0\\"><a id=\\"delete-product\\" class=\\"css-k008qs\\"><svg stroke=\\"currentColor\\" fill=\\"none\\" stroke-width=\\"2\\" viewBox=\\"0 0 24 24\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" focusable=\\"false\\" class=\\"chakra-icon css-h2ecv6\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\">
                      <polyline points=\\"3 6 5 6 21 6\\"></polyline>
                      <path d=\\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\\"></path>
                    </svg></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct product id', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard product={product} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#product_id').textContent).toBe(
			`${product.id}`
		);
	});
	it('should have correct category', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard product={product} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#category').textContent).toBe(
			`${product.category}`
		);
	});
	it('should have correct short name', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard product={product} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#short_name').textContent).toBe(
			`${product.short_name}`
		);
	});
	it('should have correct price', () => {
		act(() => {
			render(
				<Provider store={store}>
					<ProductCard product={product} />
				</Provider>,
				container
			);
		});
		expect(container.querySelector('#price').textContent).toBe(
			`Rs.${product.price}`
		);
	});
});

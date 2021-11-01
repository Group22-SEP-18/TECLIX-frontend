import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import ErrorOverlay from './ErrorOverlay';

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

describe('should render correctly', () => {
	it('renders correctly event error has passed as props', () => {
		act(() => {
			render(<ErrorOverlay />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-1fxv0vu\\">
        <div class=\\"css-1l4td6x\\">
          <p class=\\"chakra-text css-in3yi3\\">Error while accessing data</p>
        </div>
      </div>"
    `);
	});
	it('renders correctly when error passed', () => {
		act(() => {
			render(<ErrorOverlay error={'some error'} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-1fxv0vu\\">
        <div class=\\"css-1l4td6x\\">
          <p class=\\"chakra-text css-in3yi3\\">some error</p>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct error', () => {
		act(() => {
			render(<ErrorOverlay error={'some error'} />, container);
		});
		expect(container.textContent).toContain('some error');
	});
});

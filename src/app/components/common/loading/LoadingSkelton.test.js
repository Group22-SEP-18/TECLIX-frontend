import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import LoadingSkelton from './LoadingSkelton';

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
	it('renders correctly', () => {
		act(() => {
			render(<LoadingSkelton />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div class=\\"chakra-skeleton css-1m726o4\\">
          <div></div>
        </div>
      </div>"
    `);
	});
});

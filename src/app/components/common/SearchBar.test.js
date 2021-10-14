import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import SearchBar from './SearchBar';

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
	it('renders without a placeholder when placeholder not passed', () => {
		act(() => {
			render(<SearchBar />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"chakra-input__group css-1ab2ktb\\"><input placeholder=\\"\\" class=\\"chakra-input css-0\\">
        <div class=\\"chakra-input__right-element css-dp9r5f\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-1ckvm0x\\">
            <path fill=\\"currentColor\\" d=\\"M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z\\"></path>
          </svg></div>
      </div>"
    `);
	});
	it('renders with a placeholder when placeholder have passed', () => {
		act(() => {
			render(<SearchBar placeholder='search' />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"chakra-input__group css-1ab2ktb\\"><input placeholder=\\"search\\" class=\\"chakra-input css-0\\">
        <div class=\\"chakra-input__right-element css-dp9r5f\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-1ckvm0x\\">
            <path fill=\\"currentColor\\" d=\\"M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z\\"></path>
          </svg></div>
      </div>"
    `);
	});
});

describe('should render a placeholder', () => {
	it('renders without a placeholder when placeholder not passed', () => {
		act(() => {
			render(<SearchBar />, container);
		});
		expect(container.querySelector('input').placeholder).toBe('');
	});
	it('renders with a placeholder when placeholder have passed', () => {
		act(() => {
			render(<SearchBar placeholder='search' />, container);
		});
		expect(container.querySelector('input').placeholder).toBe('search');
	});
});

describe('should change the value when input changes', () => {
	it('function called with the input changes', () => {
		const onChange = jest.fn();
		act(() => {
			render(<SearchBar onChange={onChange} />, container);
		});
		const input = container.querySelector('input');
		const value = 'value';
		act(() => {
			for (let i = 1; i < value.length; i++) {
				input.value = value.slice(0, i);
				ReactTestUtils.Simulate.change(input);
			}
		});
		expect(onChange).toHaveBeenCalledTimes(input.value.length);
	});
});

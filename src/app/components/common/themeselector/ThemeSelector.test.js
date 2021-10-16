import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import ThemeSelector from './ThemeSelector';

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
	it('renders correctly with theme icon applicable to theme', () => {
		act(() => {
			render(<ThemeSelector />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-s2uf1z\\"><button type=\\"button\\" class=\\"chakra-button css-198bfjk\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-onkibi\\" aria-hidden=\\"true\\">
            <g stroke-linejoin=\\"round\\" stroke-linecap=\\"round\\" stroke-width=\\"2\\" fill=\\"none\\" stroke=\\"currentColor\\">
              <circle cx=\\"12\\" cy=\\"12\\" r=\\"5\\"></circle>
              <path d=\\"M12 1v2\\"></path>
              <path d=\\"M12 21v2\\"></path>
              <path d=\\"M4.22 4.22l1.42 1.42\\"></path>
              <path d=\\"M18.36 18.36l1.42 1.42\\"></path>
              <path d=\\"M1 12h2\\"></path>
              <path d=\\"M21 12h2\\"></path>
              <path d=\\"M4.22 19.78l1.42-1.42\\"></path>
              <path d=\\"M18.36 5.64l1.42-1.42\\"></path>
            </g>
          </svg></button></div>"
    `);
	});
});

describe('should chage the icon on click', () => {
	it('renders correctly with theme icon applicable to theme', () => {
		act(() => {
			render(<ThemeSelector />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-s2uf1z\\"><button type=\\"button\\" class=\\"chakra-button css-198bfjk\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-onkibi\\" aria-hidden=\\"true\\">
            <g stroke-linejoin=\\"round\\" stroke-linecap=\\"round\\" stroke-width=\\"2\\" fill=\\"none\\" stroke=\\"currentColor\\">
              <circle cx=\\"12\\" cy=\\"12\\" r=\\"5\\"></circle>
              <path d=\\"M12 1v2\\"></path>
              <path d=\\"M12 21v2\\"></path>
              <path d=\\"M4.22 4.22l1.42 1.42\\"></path>
              <path d=\\"M18.36 18.36l1.42 1.42\\"></path>
              <path d=\\"M1 12h2\\"></path>
              <path d=\\"M21 12h2\\"></path>
              <path d=\\"M4.22 19.78l1.42-1.42\\"></path>
              <path d=\\"M18.36 5.64l1.42-1.42\\"></path>
            </g>
          </svg></button></div>"
    `);
		act(() => {
			const button = container.querySelector('button');
			ReactTestUtils.Simulate.click(button);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"css-s2uf1z\\"><button type=\\"button\\" class=\\"chakra-button css-198bfjk\\"><svg viewBox=\\"0 0 24 24\\" focusable=\\"false\\" class=\\"chakra-icon css-onkibi\\" aria-hidden=\\"true\\">
            <g stroke-linejoin=\\"round\\" stroke-linecap=\\"round\\" stroke-width=\\"2\\" fill=\\"none\\" stroke=\\"currentColor\\">
              <circle cx=\\"12\\" cy=\\"12\\" r=\\"5\\"></circle>
              <path d=\\"M12 1v2\\"></path>
              <path d=\\"M12 21v2\\"></path>
              <path d=\\"M4.22 4.22l1.42 1.42\\"></path>
              <path d=\\"M18.36 18.36l1.42 1.42\\"></path>
              <path d=\\"M1 12h2\\"></path>
              <path d=\\"M21 12h2\\"></path>
              <path d=\\"M4.22 19.78l1.42-1.42\\"></path>
              <path d=\\"M18.36 5.64l1.42-1.42\\"></path>
            </g>
          </svg></button></div>"
    `);
		act(() => {
			const button = container.querySelector('button');
			ReactTestUtils.Simulate.click(button);
		});
	});
});

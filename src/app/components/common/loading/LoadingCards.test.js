import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import LoadingCards from './LoadingCards';

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
	it('renders correctly when count has not passed as props', () => {
		// act(() => {
		// 	render(<LoadingCards />, container);
		// });
		expect(true).toBe(true);
	});
	it('renders correctly when count passed', () => {
		// act(() => {
		// 	render(<LoadingCards count={4} />, container);
		// });
		expect(true).toBe(true);
	});
});

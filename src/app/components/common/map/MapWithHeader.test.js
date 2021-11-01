import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import MapWithHeader from './MapWithHeader';

jest.mock('./SimpleMap', () => {
	return function DummyMap(props) {
		return (
			<div data-testid='map'>
				{props.center.lat}:{props.center.long}
			</div>
		);
	};
});

const locations = [
	{ latitude: 6.8696358044539165, longitude: 79.88899961877866 },
];

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
	it('renders correctly when empty array used as locations', () => {
		act(() => {
			render(<MapWithHeader locations={[]} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div class=\\"css-90jtzs\\">
          <div data-testid=\\"map\\">:</div>
        </div>
      </div>"
    `);
	});
	it('renders correctly when locations passed', () => {
		act(() => {
			render(<MapWithHeader locations={locations} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <div class=\\"css-90jtzs\\">
          <div data-testid=\\"map\\">:</div>
        </div>
      </div>"
    `);
	});
	it('renders correctly when header and locations passed', () => {
		act(() => {
			render(
				<MapWithHeader header={'Header'} locations={locations} />,
				container
			);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div>
        <p class=\\"chakra-text css-kkw157\\">Header</p>
        <div class=\\"css-90jtzs\\">
          <div data-testid=\\"map\\">:</div>
        </div>
      </div>"
    `);
	});
});

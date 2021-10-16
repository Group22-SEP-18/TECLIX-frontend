import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import First3 from './First3';

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

const data = {
	salesperson: {
		id: '000',
		employee_no: 'employee_no',
		first_name: 'first_name',
		last_name: 'last_name',
		profile_picture: 'profile_picture',
	},
	points_today: 20,
	points_current_month: 100,
	points_all_time: 500,
};

describe('should render correctly', () => {
	it('renders nothing when no salesperson object has passed as props', () => {
		act(() => {
			render(<First3 position={1} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders nothing when no position has passed as props', () => {
		act(() => {
			render(<First3 row={data} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when required props have passed', () => {
		act(() => {
			render(<First3 row={data} position={1} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"chakra-stack css-1ye3pok\\" id=\\"leaderboard_first_3_div_1\\"><svg stroke=\\"currentColor\\" fill=\\"currentColor\\" stroke-width=\\"0\\" viewBox=\\"0 0 640 512\\" color=\\"gold\\" style=\\"color: gold;\\" height=\\"1em\\" width=\\"1em\\" xmlns=\\"http://www.w3.org/2000/svg\\">
          <path d=\\"M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z\\"></path>
        </svg><span id=\\"leaderboard_first_3_sp_profile_picture_1\\" class=\\"chakra-avatar css-1ruhx4w\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
        <div class=\\"css-0\\">
          <p class=\\"chakra-text css-19ga07v\\" id=\\"leaderboard_first_3_sp_name_1\\">first_name last_name</p>
          <p class=\\"chakra-text css-1xxsgcd\\" id=\\"leaderboard_first_3_sp_points_1\\">20 points</p>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct salesperson name', () => {
		act(() => {
			render(<First3 row={data} position={1} />, container);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_name_1').textContent
		).toBe(`${data.salesperson.first_name} ${data.salesperson.last_name}`);
	});
	it('should have points for today if no timeConstraint is there', () => {
		act(() => {
			render(<First3 row={data} position={1} />, container);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_points_1').textContent
		).toBe(`${data.points_today} points`);
	});
	it('should have points for day if  timeConstraint is today', () => {
		act(() => {
			render(
				<First3 row={data} position={1} timeConstraint='today' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_points_1').textContent
		).toBe(`${data.points_today} points`);
	});
	it('should have points for month if timeConstraint is month', () => {
		act(() => {
			render(
				<First3 row={data} position={1} timeConstraint='month' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_points_1').textContent
		).toBe(`${data.points_current_month} points`);
	});
	it('should have points for alltime if timeConstraint is alltime', () => {
		act(() => {
			render(
				<First3 row={data} position={1} timeConstraint='alltime' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_points_1').textContent
		).toBe(`${data.points_all_time} points`);
	});
	it('should not display position if position is 1', () => {
		act(() => {
			render(
				<First3 row={data} position={1} timeConstraint='alltime' />,
				container
			);
		});
		expect(container.querySelector('h3')).not.toBeInTheDocument();
	});
	it('should display position if position is not 1', () => {
		act(() => {
			render(
				<First3 row={data} position={2} timeConstraint='alltime' />,
				container
			);
		});
		expect(container.querySelector('h3').textContent).toBe('2');
	});
	it('should render a avatar', () => {
		act(() => {
			render(
				<First3 row={data} position={1} timeConstraint='alltime' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_first_3_sp_profile_picture_1')
		).toBeInTheDocument();
	});
});

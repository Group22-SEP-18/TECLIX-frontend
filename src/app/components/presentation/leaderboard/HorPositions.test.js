import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import HorPositions from './HorPositions';

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
			render(<HorPositions position={1} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders nothing when no position has passed as props', () => {
		act(() => {
			render(<HorPositions row={data} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders nothing when position is smaller than 3', () => {
		act(() => {
			render(<HorPositions row={data} position={1} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`""`);
	});
	it('renders correctly when required props have passed', () => {
		act(() => {
			render(<HorPositions row={data} position={4} />, container);
		});
		expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div id=\\"leaderboard_hor_pos_div_4\\" class=\\"css-0\\">
        <div class=\\"css-j7qwjs\\">
          <div class=\\"css-1e5vm17\\">
            <div class=\\"chakra-stack css-84zodg\\">
              <div class=\\"css-nplweg\\">
                <h3 class=\\"chakra-text css-17zde17\\">4</h3>
              </div><span id=\\"leaderboard_hor_pos_sp_profile_picture_4\\" class=\\"chakra-avatar css-1ruhx4w\\"><svg viewBox=\\"0 0 128 128\\" class=\\"chakra-avatar__svg css-16ite8i\\" role=\\"img\\" aria-label=\\" avatar\\"><path fill=\\"currentColor\\" d=\\"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z\\"></path><path fill=\\"currentColor\\" d=\\"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24\\"></path></svg></span>
              <div class=\\"css-13rbvqk\\">
                <p class=\\"chakra-text css-swbt8e\\" id=\\"leaderboard_hor_pos_sp_name_4\\">first_name last_name</p>
                <p class=\\"chakra-text css-vf42yf\\" id=\\"leaderboard_hor_pos_sp_points_4\\">20 points</p>
              </div>
              <div class=\\"css-17xejub\\"></div>
            </div>
          </div>
        </div>
      </div>"
    `);
	});
});

describe('should render the correct values which have been passed', () => {
	it('should have correct salesperson name', () => {
		act(() => {
			render(<HorPositions row={data} position={4} />, container);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_name_4').textContent
		).toBe(`${data.salesperson.first_name} ${data.salesperson.last_name}`);
	});
	it('should have points for today if no timeConstraint is there', () => {
		act(() => {
			render(<HorPositions row={data} position={4} />, container);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_points_4').textContent
		).toBe(`${data.points_today} points`);
	});
	it('should have points for day if  timeConstraint is today', () => {
		act(() => {
			render(
				<HorPositions row={data} position={4} timeConstraint='today' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_points_4').textContent
		).toBe(`${data.points_today} points`);
	});
	it('should have points for month if timeConstraint is month', () => {
		act(() => {
			render(
				<HorPositions row={data} position={4} timeConstraint='month' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_points_4').textContent
		).toBe(`${data.points_current_month} points`);
	});
	it('should have points for alltime if timeConstraint is alltime', () => {
		act(() => {
			render(
				<HorPositions row={data} position={4} timeConstraint='alltime' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_points_4').textContent
		).toBe(`${data.points_all_time} points`);
	});
	it('should display position if position', () => {
		act(() => {
			render(
				<HorPositions row={data} position={4} timeConstraint='alltime' />,
				container
			);
		});
		expect(container.querySelector('h3').textContent).toBe('4');
	});
	it('should render a avatar', () => {
		act(() => {
			render(
				<HorPositions row={data} position={4} timeConstraint='alltime' />,
				container
			);
		});
		expect(
			container.querySelector('#leaderboard_hor_pos_sp_profile_picture_4')
		).toBeInTheDocument();
	});
});

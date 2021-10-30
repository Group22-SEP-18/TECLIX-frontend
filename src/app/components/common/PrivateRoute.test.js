import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';

let container = null;
const mockStore = configureStore([]);
let store;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
	store = mockStore({
		user: {
			user: {
				user_role: 'Operation Manager',
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

const PrivateComponent = () => <>Private!</>;
const PublicComponent = () => <>Redirected!</>;
describe('should render correctly', () => {
	it('redirect to a public route if token is not set', () => {
		const history = createMemoryHistory({ initialEntries: ['/Private'] });
		render(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute
							exact
							path='/Private'
							component={PrivateComponent}
							acceptable_user_roles={['Operation Manager']}
						/>
						<Route exact path='/login' component={PublicComponent} />
					</Switch>
				</Router>
			</Provider>
		);
		expect(history.location.pathname).toBe('/login');
	});
	it('redirect to a public route no user role set', () => {
		const history = createMemoryHistory({ initialEntries: ['/Private'] });
		store = mockStore({
			user: {
				user: {},
			},
		});
		localStorage.setItem('token', 'token');
		render(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute
							exact
							path='/Private'
							component={PrivateComponent}
							acceptable_user_roles={['Operation Manager']}
						/>
						<Route exact path='/login' component={PublicComponent} />
					</Switch>
				</Router>
			</Provider>
		);
		expect(history.location.pathname).toBe('/login');
	});
	it('renders nothing if userrole is not accepted', () => {
		const history = createMemoryHistory({ initialEntries: ['/Private'] });
		localStorage.setItem('token', 'token');
		render(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute
							exact
							path='/Private'
							component={PrivateComponent}
							acceptable_user_roles={['Admin']}
						/>
						<Route exact path='/login' component={PublicComponent} />
					</Switch>
				</Router>
			</Provider>
		);
		expect(history.location.pathname).toBe('/Private');
	});
	it('render correctly if token is set and role is accepted', () => {
		const history = createMemoryHistory({ initialEntries: ['/Private'] });
		localStorage.setItem('token', 'token');
		render(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<PrivateRoute
							exact
							path='/Private'
							component={PrivateComponent}
							acceptable_user_roles={['Operation Manager']}
						/>
						<Route exact path='/login' component={PublicComponent} />
					</Switch>
				</Router>
			</Provider>
		);
		expect(screen.getByText('Private!')).toBeInTheDocument();
		expect(history.location.pathname).toBe('/Private');
	});
});

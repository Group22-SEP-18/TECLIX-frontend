import React from 'react';
import clsx from 'clsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';

import Main from './Main';

const App = () => {
	const classes = useStyles();
	return (
		<BrowserRouter>
			<ChakraProvider>
				<div className={clsx('App', classes.root)}>
					<Main />
				</div>
			</ChakraProvider>
		</BrowserRouter>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

export default App;

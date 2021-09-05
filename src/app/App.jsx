import React from 'react';
import clsx from 'clsx';
import { ChakraProvider } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';

import Main from './Main';

const App = () => {
	const classes = useStyles();
	return (
		<ChakraProvider>
			<div className={clsx('App', classes.root)}>
				<Main />
			</div>
		</ChakraProvider>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

export default App;

import React from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const ErrorOverlay = ({ error = 'Error while accessing data', my = '260' }) => {
	return (
		<Flex w='full' bg='gray.50' minH='full' flexDir='column' align='center'>
			<Box flex='1' textAlign='center' my={my}>
				<Text fontWeight='bold'>{error}</Text>
			</Box>
		</Flex>
	);
};

export default ErrorOverlay;

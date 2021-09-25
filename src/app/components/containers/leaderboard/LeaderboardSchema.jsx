import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const LeaderboardSchema = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button rightIcon={<SettingsIcon />} colorScheme='gray' onClick={onOpen}>
				Leaderboard Schema
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

LeaderboardSchema.propTypes = {};

export default LeaderboardSchema;

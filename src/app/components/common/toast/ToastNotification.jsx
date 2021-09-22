import React, { useState } from 'react';
import './ToastNotification.scss';
import ToastComponent from './ToastComponent';
import {
	CheckIcon,
	NotAllowedIcon,
	InfoIcon,
	WarningIcon,
} from '@chakra-ui/icons';
import store from '../../../redux/store';
import { setNotification } from '../../features/Notification/notificationSlice';

const notificationTypesEnums = {
	Success: 'Success',
	Fail: 'Fail',
	Info: 'Info',
	Warning: 'Warning',
};

const backgroundColorEnums = {
	Success: '#5bb85a',
	Fail: '#d94948',
	Info: '#55bede',
	Warning: '#f0a54b',
};

export const ToastNotification = (props) => {
	store.subscribe(() => {
		let notification = store.getState().notification.notification;
		if (notification.id !== -1) {
			showToast(notification.id, notification.type, notification.description);

			// show only one message at a time
			store.dispatch(
				setNotification({
					id: -1,
				})
			);
		}
	});
	const [toastList, setToastList] = useState([]);
	const showToast = (id, type, description) => {
		let toast_object = {
			id,
			title: type,
			description: description,
		};
		switch (type) {
			case notificationTypesEnums.Success:
				toast_object.backgroundColor = backgroundColorEnums.Success;
				toast_object.icon = CheckIcon;
				break;
			case notificationTypesEnums.Fail:
				toast_object.backgroundColor = backgroundColorEnums.Fail;
				toast_object.icon = NotAllowedIcon;
				break;
			case notificationTypesEnums.Info:
				toast_object.backgroundColor = backgroundColorEnums.Info;
				toast_object.icon = InfoIcon;
				break;
			case notificationTypesEnums.Warning:
				toast_object.backgroundColor = backgroundColorEnums.Warning;
				toast_object.icon = WarningIcon;
				break;

			default:
				setToastList([]);
		}
		setToastList([...toastList, toast_object]);
	};
	return (
		<div className='app'>
			<ToastComponent
				toastList={toastList}
				position={'top-right'}
				dismissTime={2500}
				autoDelete={true}
			/>
		</div>
	);
};

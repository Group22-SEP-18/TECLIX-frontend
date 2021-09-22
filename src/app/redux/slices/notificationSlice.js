import { createSlice } from '@reduxjs/toolkit';

const notifications = createSlice({
	name: 'notifications',
	initialState: {
		notification: {
			id: -1,
			type: '',
			description: '',
		},
	},
	reducers: {
		setNotification: (state, action) => {
			state.notification = {
				id: action.payload.id,
				type: action.payload.type,
				description: action.payload.description,
			};
		},
	},
});

export const { setNotification } = notifications.actions;
export default notifications.reducer;

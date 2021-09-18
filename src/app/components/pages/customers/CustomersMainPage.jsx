/**
 * Summary.
 * Persentation of customers page
 *
 * Description.
 *
 * @file   This files defines the customers page
 * @author Hirumal Priyashan.
 * @since  16.09.2021
 */

import React, { useState } from 'react';
import CustomerListContainer from '../../containers/CustomerListContainer';
import SingleCustomerView from '../../containers/SingleCustomerView';

const CustomersMainPage = (props) => {
	const [singleCustomerView, setCustomerView] = useState({
		view: false,
		customer: null,
	});
	const onCardClick = (customer) => {
		setCustomerView({
			view: true,
			customer: customer,
		});
	};
	const onCardCloseClick = () => {
		setCustomerView({
			view: false,
			customer: null,
		});
	};
	return (
		<div>
			{!singleCustomerView.view && (
				<CustomerListContainer onCardClick={onCardClick} />
			)}

			{singleCustomerView.view && singleCustomerView.customer !== null && (
				<SingleCustomerView
					customer={singleCustomerView.customer}
					onClick={onCardCloseClick}
				/>
			)}
		</div>
	);
};

CustomersMainPage.propTypes = {};

export default CustomersMainPage;

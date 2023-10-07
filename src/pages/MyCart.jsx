import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCartProducts } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

const MyCart = () => {
	const { user } = useAuthContext();
	const {
		isLoading,
		error,
		data: cartList,
	} = useQuery(['carts'], () => {
		return getCartProducts(user.uid);
	});
	console.log(cartList);
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <p>error 발생 💩</p>}
		</>
	);
};

export default MyCart;

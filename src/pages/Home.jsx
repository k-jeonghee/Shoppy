import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getProducts } from '../api/firebase';
import Products from '../components/Products';

const Home = () => {
	//14.2 4:57
	return (
		<>
			<Products />
		</>
	);
};

export default Home;

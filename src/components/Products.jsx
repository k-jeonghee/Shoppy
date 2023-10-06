import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

const Products = () => {
	const {
		isLoading,
		error,
		data: products,
	} = useQuery(['products'], () => {
		return getProducts();
	});

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <p>error {error}</p>}
			{products &&
				products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
		</>
	);
};

export default Products;

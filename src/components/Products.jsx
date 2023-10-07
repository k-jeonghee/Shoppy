import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

const Products = () => {
	const {
		isLoading,
		error,
		data: products,
	} = useQuery(
		['products'],
		() => {
			return getProducts();
		},
		{ staleTime: 10000 }
	);

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <p>error {error}</p>}
			<ul className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</ul>
		</>
	);
};

export default Products;

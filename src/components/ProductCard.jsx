import React from 'react';

const ProductCard = ({ product }) => {
	const { title, category, image, price } = product;
	return (
		<>
			<img src={image} alt={title} />
			<p>{title}</p>
			<p>{category}</p>
			<p>{price}</p>
		</>
	);
};

export default ProductCard;

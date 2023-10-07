import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const { title, category, image, price, id } = product;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/products/${id}`, { state: { product } });
	};
	return (
		<li
			className="rounded-lg shadow-md overflow-hidden cursor-pointer"
			onClick={handleClick}
		>
			<img src={image} alt={title} className="w-full md:h-96" />
			<p className="text-sm text-neutral-400 p-2">{category}</p>
			<div className="flex justify-between px-2 pb-2">
				<p>{title}</p>
				<p>{price}</p>
			</div>
		</li>
	);
};

export default ProductCard;

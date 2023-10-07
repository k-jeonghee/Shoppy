import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { addToCart } from '../api/firebase';

const ProductDetail = () => {
	const {
		state: { product },
	} = useLocation();
	const { id, title, options, price, category, image, description } = product;
	const [selected, setSelected] = useState('none');
	const { user } = useAuthContext();
	const [success, setSuccess] = useState('');

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	const handleAddCart = () => {
		const product = { id, image, title, price, option: selected, quantity: 1 };
		//product, uid 전달
		addToCart(user.uid, product) //
			.then(() => {
				setSuccess('장바구니에 상품 추가!');
				setTimeout(() => {
					setSuccess('');
				}, 4000);
			});
	};
	return (
		<>
			<p>{category}</p>
			<section>
				<img src={image} alt={title} />
				<div>
					<p>{title}</p>
					<p>{description}</p>
					<div>
						<label htmlFor="options">옵션</label>
						<select id="options" onChange={handleSelect} value={selected}>
							<option value="none" disabled>
								선택
							</option>
							{options &&
								options.map((option, index) => (
									<option key={index} value={option}>
										{option}
									</option>
								))}
						</select>
						<p>{price}</p>
					</div>
				</div>
				<button className="p-4 bg-brand text-white" onClick={handleAddCart}>
					장바구니에 추가
				</button>
				{success && <p>✅ {success}</p>}
			</section>
		</>
	);
};

export default ProductDetail;

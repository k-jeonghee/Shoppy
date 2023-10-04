import React, { useState } from 'react';
import { uploadImage } from '../api/uploader';

const NewProduct = () => {
	const [product, setProduct] = useState({});
	const [file, setFile] = useState();
	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'file') {
			setFile(files && files[0]);
			return;
		}
		setProduct((product) => ({
			...product,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		uploadImage(file).then((res) => console.log(res));
	};

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-bold">새로운 제품 등록</h1>
			{file && <img src={URL.createObjectURL(file)} alt="미리보기" />}
			<form className="flex flex-col w-3/4" onSubmit={handleSubmit}>
				<input
					className="p-4 border border-grey mb-2"
					type="file"
					name="file"
					accept="/image/*"
					required
					onChange={handleChange}
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					placeholder="제품명"
					name="title"
					onChange={handleChange}
					value={product.title || ''}
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					placeholder="가격"
					name="price"
					onChange={handleChange}
					value={product.price || ''}
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					placeholder="카테고리"
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					placeholder="제품 설명"
				/>
				<input
					className="p-4
					border border-grey
					mb-2"
					type="text"
					placeholder="옵션들(콤마(,)로 구분)"
				/>
				<button>제품등록</button>
			</form>
		</div>
	);
};

export default NewProduct;

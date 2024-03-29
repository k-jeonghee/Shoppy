import React, { useState } from 'react';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
	const [product, setProduct] = useState({});
	const [file, setFile] = useState();
	const [imgUrl, setImgUrl] = useState();

	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState();

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'file') {
			setFile(files && files[0]);
			setImgUrl(URL.createObjectURL(files[0]));
			return;
		}
		setProduct((product) => ({
			...product,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUploading(true);
		uploadImage(file) //
			.then((url) =>
				addNewProduct(product, url).then(() => {
					setSuccess('상품 등록 성공!');
					setTimeout(() => {
						setSuccess(null);
						navigate('/products');
					}, 4000);
				})
			)
			.finally(() => {
				setIsUploading(false);
			});
	};
	//

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl font-bold">새로운 제품 등록</h1>
			{success && <p>✅ {success}</p>}
			{file && <img className="w-96 mb-2" src={imgUrl} alt="미리보기" />}
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
					type="number"
					placeholder="가격"
					name="price"
					onChange={handleChange}
					value={product.price || ''}
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					name="category"
					onChange={handleChange}
					value={product.category || ''}
					placeholder="카테고리"
				/>
				<input
					className="p-4 border border-grey mb-2"
					type="text"
					placeholder="제품 설명"
					name="description"
					onChange={handleChange}
					value={product.description || ''}
				/>
				<input
					className="p-4
					border border-grey
					mb-2"
					type="text"
					placeholder="옵션들(콤마(,)로 구분)"
					name="options"
					onChange={handleChange}
					value={product.options || ''}
				/>
				<button>{isUploading ? '업로드중...' : '제품등록'}</button>
			</form>
		</div>
	);
};

export default NewProduct;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '../api/firebase';

const NavBar = () => {
	const { user, login, logout } = useAuthContext();
	const { data: cartList } = useQuery(['carts'], () => {
		return getCartProducts(user.uid);
	});
	return (
		<header className="flex h-16 justify-between text-2xl border-b border-grey-300 p-4">
			<Link to={'/'} className="flex items-center text-brand gap-2 ">
				<FiShoppingBag />
				<h1>Shoppy</h1>
			</Link>
			<nav className="flex items-center gap-4 font-semibold">
				<Link to={'/products'}>Products</Link>
				{user && (
					<Link to={'/carts'} className="relative">
						<AiOutlineShoppingCart className="text-3xl" />
						{cartList[0] && (
							<span className="absolute text-sm text-center text-white bg-brand rounded-full w-5 h-5 left-5 bottom-4">
								{cartList.length}
							</span>
						)}
					</Link>
				)}
				{user && user.isAdmin && (
					<Link to={'/products/new'}>
						<MdAddBox />
					</Link>
				)}
				{user && <User user={user} />}
				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={login}>Login</button>
				)}
			</nav>
		</header>
	);
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { MdAddBox } from 'react-icons/md';

const NavBar = () => {
	return (
		<header className="flex h-16 justify-between text-2xl border-b border-grey-300 p-4">
			<Link to={'/'} className="flex items-center text-brand gap-2 ">
				<FiShoppingBag />
				<h1>Shoppy</h1>
			</Link>
			<nav className="flex items-center gap-4 font-semibold">
				<Link to={'/products'}>Products</Link>
				<Link to={'/carts'}>Cart</Link>
				<Link to={'/products/new'}>
					<MdAddBox />
				</Link>
				<button>Login</button>
			</nav>
		</header>
	);
};

export default NavBar;

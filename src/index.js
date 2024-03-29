import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import NewProduct from './pages/NewProduct';
import { ProtectedRoute } from './pages/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/products',
				element: <AllProducts />,
			},
			{
				path: '/products/:id',
				element: <ProductDetail />,
			},
			{
				path: '/products/new',
				element: (
					<ProtectedRoute requiredAdmin>
						<NewProduct />
					</ProtectedRoute>
				),
			},
			{
				path: '/carts',
				element: (
					<ProtectedRoute>
						<MyCart />
					</ProtectedRoute>
				),
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

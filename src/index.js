import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from '../src/components/AllProducts';
import ProductDetail from './components/ProductDetail';
import MyCart from './components/MyCart';
import NewProduct from './components/NewProduct';

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
				element: <NewProduct />,
			},
			{
				path: '/cart',
				element: <MyCart />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}>
		<App />
	</RouterProvider>
);

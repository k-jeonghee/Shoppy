import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();

export const login = () => {
	signInWithPopup(auth, provider).catch((error) => {
		console.log(error);
	});
};

export const logout = () => {
	signOut(auth).catch((error) => {
		console.log(error);
	});
};

export const onUserStateChange = (callback) => {
	onAuthStateChanged(auth, async (user) => {
		const updatedUser = user ? await adminUser(user) : user;
		callback(updatedUser);
	});
};

const adminUser = async (user) => {
	return get(ref(db, 'admins')) //
		.then((snapshot) => {
			if (snapshot.exists()) {
				const admins = snapshot.val();
				const isAdmin = admins.includes(user.uid);
				return { ...user, isAdmin };
			} else {
				return user;
			}
		}) //
		.catch((error) => {
			console.error(error);
		});
};

export const addNewProduct = async (product, imgURL) => {
	const id = uuid();
	return set(ref(db, `products/${id}`), {
		...product,
		id,
		price: parseInt(product.price),
		options: product.options.split(','),
		image: imgURL,
	}).catch((error) => console.error(error));
};

export const getProducts = async () => {
	return get(ref(db, 'products')).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});
};

export const addToCart = async (uid, product) => {
	const { id, title, image, price, option, quantity } = product;
	return set(ref(db, `carts/${uid}/${id}`), {
		id,
		title,
		image,
		price,
		option,
		quantity,
	}).catch((error) => console.error(error));
};

export const getCartProducts = async (id) => {
	return get(ref(db, `carts/${id}`)).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});
};

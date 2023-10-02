import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
	onAuthStateChanged(auth, (user) => {
		callback(user);
	});
};

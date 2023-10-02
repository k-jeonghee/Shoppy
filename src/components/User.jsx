import React from 'react';

const User = ({ user: { displayName, photoURL } }) => {
	return (
		<>
			<img
				src={photoURL}
				alt={displayName}
				className="w-10 h-10 rounded-full"
			/>
			<span className="font-normal text-gray-500">{displayName}</span>
		</>
	);
};

export default User;

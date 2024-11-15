'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const AuthButton = () => {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			type="submit"
			className={`${
				pending ? 'bg-gray-600' : 'bg-primary'
			} rounded-md w-full px-12 py-3 mb-6 text-sm font-medium text-foreground
      `}
		>
			{pending ? 'Loading...' : 'Sign In'}
		</button>
	);
};

export default AuthButton;

'use client';

import React from 'react';
import { Button } from './ui/button';
import { FaGithub } from 'react-icons/fa';
import { login } from '@/server/actions/auth';

export default function LoginGithub() {
	return (
		<Button variant="outline" onClick={() => login('github')}>
			<FaGithub className="text-foreground" />
			<p>Login with GitHub</p>
		</Button>
	);
}

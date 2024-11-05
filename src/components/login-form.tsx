'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login, selectAuth } from '@/store/auth-slice';
import { AppDispatch } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function LoginForm() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { loading, error } = useSelector(selectAuth);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = await dispatch(login({ username, password }));
			if (login.fulfilled.match(result)) {
				router.push('/agent');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Agent Login</CardTitle>
				<CardDescription>
					Enter your credentials to access the agent dashboard
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

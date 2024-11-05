import { auth } from '@/server/auth';
import React from 'react';

const Agent = async () => {
	const session = await auth();

	return (
		<main className="flex h-full items-center justify-center flex-col gap-2 ">
			<h1 className="text-3xl">Agent Dashboard</h1>
			<p className="text-lg">{session?.user?.email}</p>
			<p className="">this route is protected with src/middleware.ts</p>
		</main>
	);
};

export default Agent;

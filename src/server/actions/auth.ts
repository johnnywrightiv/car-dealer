import { signIn, signOut } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { db } from '@/server/db';
import { AuthError } from 'next-auth';

const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUniqe({
			where: {
				email,
			},
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const login = async (provider: string) => {
	console.log('login');
	await signIn(provider, { redirectTo: '/' });
	revalidatePath('/');
};

export const logout = async () => {
	console.log('logout');
	await signOut({ redirectTo: '/' });
	revalidatePath('/');
};


export const loginWithCreds = async (formData: FormData) => {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
		role: "AGENT",
		redirectTo: '/agent'
	};

	const existingUser = await getUserByEmail(formData.get('email') as string)
	console.log(existingUser);

	try {
		const user = await signIn("credentials", rawFormData)
	} catch (error: any) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials"}
				default:
					return { error: "Something went wrong!"}
			}
		}

		throw error;
	}	
	revalidatePath('/agent')
};
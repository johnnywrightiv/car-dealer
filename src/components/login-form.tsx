// 'use client'

// import React from 'react'
// import AuthButton from '@/components/auth-button';
// import { loginWithCreds } from '@/server/actions/auth';

// const LoginForm = () => {
//   return (
// 		<div>
//       <form action={loginWithCreds} className="w-full flex flex-col gap-4">
// 				<div>
// 					<label>Email</label>
// 					<input
// 						name="email"
// 						type="email"
// 						placeholder="email"
// 						id="email"
// 						className=""
// 					/>
// 				</div>
// 				<div>
// 					<label>Password</label>
// 					<input
// 						name="password"
// 						type="password"
// 						placeholder="password"
// 						id="password"
// 						className=""
// 					/>
//         </div>
//         <div className='mt-4'>
//           <AuthButton />
//         </div>
// 			</form>
// 		</div>
// 	);
// }

// export default LoginForm

// ====code2=====
// 'use client';

// import { Mail, Key, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { loginWithCreds } from '@/server/actions/auth';
// import AuthButton from '@/components/auth-button';

// export default function LoginForm() {
// 	return (
// 		<div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
// 			<div className="space-y-2">
// 				<h3 className="text-2xl font-semibold tracking-tight">Welcome back</h3>
// 				<p className="text-sm text-muted-foreground">
// 					Enter your credentials to access your account
// 				</p>
// 			</div>

// 			<form action={loginWithCreds} className="space-y-6">
// 				<div className="space-y-4">
// 					<div className="space-y-2">
// 						<label
// 							htmlFor="email"
// 							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 						>
// 							Email
// 						</label>
// 						<div className="relative">
// 							<Input
// 								name="email"
// 								type="email"
// 								placeholder="name@example.com"
// 								id="email"
// 								className="pl-10"
// 								required
// 							/>
// 							<Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
// 						</div>
// 					</div>

// 					<div className="space-y-2">
// 						<label
// 							htmlFor="password"
// 							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 						>
// 							Password
// 						</label>
// 						<div className="relative">
// 							<Input
// 								name="password"
// 								type="password"
// 								placeholder="Enter your password"
// 								id="password"
// 								className="pl-10"
// 								required
// 							/>
// 							<Key className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
// 						</div>
// 					</div>
// 				</div>

// 				<div className="mt-4">
// 					<AuthButton />
// 				</div>
// 			</form>

// 			<div className="flex items-center justify-center">
// 				<Button variant="link" className="text-sm text-primary">
// 					Forgot your password?
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

// ====code3=====
// 'use client';

// import { useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Mail, Key, Loader2, AlertCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from '@/components/ui/form';
// import { loginWithCreds } from '@/server/actions/auth';
// import { useRouter } from 'next/navigation';

// const loginSchema = z.object({
// 	email: z
// 		.string()
// 		.min(1, 'Email is required')
// 		.email('Invalid email address')
// 		.trim()
// 		.toLowerCase(),
// 	password: z
// 		.string()
// 		.min(1, 'Password is required')
// 		.min(8, 'Password must be at least 8 characters')
// 		.regex(
// 			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
// 			'Password must contain uppercase, lowercase, number and special character'
// 		),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// export default function LoginForm() {
// 	const [error, setError] = useState<string | null>(null);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const router = useRouter();

// 	const form = useForm<LoginFormValues>({
// 		resolver: zodResolver(loginSchema),
// 		defaultValues: {
// 			email: '',
// 			password: '',
// 		},
// 	});

// 	async function onSubmit(data: LoginFormValues) {
// 		try {
// 			setIsLoading(true);
// 			setError(null);

// 			// Create a FormData object to match your server action's expectations
// 			const formData = new FormData();
// 			formData.append('email', data.email);
// 			formData.append('password', data.password);

// 			const result = await loginWithCreds(formData);

// 			if (result?.error) {
// 				setError(result.error);
// 				return;
// 			}

// 			// Assuming successful login redirects to dashboard
// 			router.push('/dashboard');
// 		} catch (err) {
// 			setError('Invalid credentials. Please try again.');
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}

// 	return (
// 		<div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
// 			<div className="space-y-2">
// 				<h3 className="text-2xl font-semibold tracking-tight">Welcome back</h3>
// 				<p className="text-sm text-muted-foreground">
// 					Enter your credentials to access your account
// 				</p>
// 			</div>

// 			{error && (
// 				<Alert variant="destructive">
// 					<AlertCircle className="h-4 w-4" />
// 					<AlertDescription>{error}</AlertDescription>
// 				</Alert>
// 			)}

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 					<div className="space-y-4">
// 						<FormField
// 							control={form.control}
// 							name="email"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Email</FormLabel>
// 									<FormControl>
// 										<div className="relative">
// 											<Input
// 												placeholder="name@example.com"
// 												{...field}
// 												className="pl-10"
// 											/>
// 											<Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
// 										</div>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<FormField
// 							control={form.control}
// 							name="password"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Password</FormLabel>
// 									<FormControl>
// 										<div className="relative">
// 											<Input
// 												type="password"
// 												placeholder="Enter your password"
// 												{...field}
// 												className="pl-10"
// 											/>
// 											<Key className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
// 										</div>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					</div>

// 					<Button type="submit" className="w-full" disabled={isLoading}>
// 						{isLoading ? (
// 							<>
// 								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 								Signing in...
// 							</>
// 						) : (
// 							'Sign in'
// 						)}
// 					</Button>
// 				</form>
// 			</Form>

// 			<div className="flex items-center justify-center">
// 				<Button variant="link" className="text-sm text-primary">
// 					Forgot your password?
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

// ======code4=====
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Key, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { loginWithCreds } from '@/server/actions/auth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Invalid email address')
		.trim()
		.toLowerCase(),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must contain uppercase, lowercase, number and special character'
		),
});

const resetSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Invalid email address')
		.trim()
		.toLowerCase(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export default function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [resetDialogOpen, setResetDialogOpen] = useState(false);
	const [resetEmailSent, setResetEmailSent] = useState(false);
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const resetForm = useForm<ResetFormValues>({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: LoginFormValues) {
		try {
			setIsLoading(true);
			setError(null);

			const formData = new FormData();
			formData.append('email', data.email);
			formData.append('password', data.password);

			const result = await loginWithCreds(formData);

			if (result?.error) {
				setError(result.error);
				return;
			}

			router.push('/dashboard');
		} catch (err) {
			setError('Invalid credentials. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

	async function onResetSubmit(data: ResetFormValues) {
		try {
			setIsLoading(true);
			// Implement your password reset logic here
			// For example: await sendPasswordResetEmail(data.email);
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setResetEmailSent(true);
			resetForm.reset();
		} catch (err) {
			setError('Failed to send reset email. Please try again.');
		} finally {
			setIsLoading(false);
		}
	}

	function closeResetDialog() {
		setResetDialogOpen(false);
		setResetEmailSent(false);
		resetForm.reset();
	}

	return (
		<div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
			<div className="space-y-2">
				<h3 className="text-2xl font-semibold tracking-tight">Welcome back</h3>
				<p className="text-sm text-muted-foreground">
					Sign in or create an account to continue
				</p>
			</div>

			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="name@example.com"
												{...field}
												className="pl-10"
											/>
											<Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type="password"
												placeholder="Enter your password"
												{...field}
												className="pl-10"
											/>
											<Key className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							'Sign in'
						)}
					</Button>
				</form>
			</Form>

			<div className="flex items-center justify-center">
				<Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="link" className="text-sm text-primary">
							Forgot your password?
						</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Reset Password</DialogTitle>
							<DialogDescription>
								Enter your email address and we&apos;ll send you a link to reset
								your password.
							</DialogDescription>
						</DialogHeader>

						<Form {...resetForm}>
							<form
								onSubmit={resetForm.handleSubmit(onResetSubmit)}
								className="space-y-4"
							>
								<FormField
									control={resetForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														placeholder="name@example.com"
														{...field}
														className="pl-10"
													/>
													<Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{resetEmailSent ? (
									<div className="space-y-4">
										<p className="text-sm text-green-600">
											If an account exists for that email, you will receive a
											password reset link shortly.
										</p>
										<DialogClose asChild>
											<Button
												type="button"
												variant="secondary"
												className="w-full"
												onClick={closeResetDialog}
											>
												Close
											</Button>
										</DialogClose>
									</div>
								) : (
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Sending...
											</>
										) : (
											'Send Reset Link'
										)}
									</Button>
								)}
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

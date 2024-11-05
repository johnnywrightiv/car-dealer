import LoginGithub from '@/components/login-github-button';
import LoginForm from '@/components/login-form';

export default function SignIn() {
	return (
		<div className="w-full flex mt-20 justify-center">
			<section className="flex flex-col w-[400px]">
				<h1 className="text-3xl w-full text-center font-bold mb-6">
					Login or Create an Account
				</h1>
				<LoginForm />
				<LoginGithub />
			</section>
		</div>
	);
}

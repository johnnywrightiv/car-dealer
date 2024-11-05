import ChatDialog from '@/components/chat-dialog';

const Chat = () => {
	return (
		<main className="flex h-full items-center justify-center flex-col gap-2">
			<h1 className="text-3xl">Chat Dialog</h1>
			<ChatDialog />
		</main>
	);
};

export default Chat;

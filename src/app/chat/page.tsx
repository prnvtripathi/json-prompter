import { default as ChatBox } from "@/components/chat/chat";
import Greeting from "@/components/ui/greeting";

export default async function ChatPage() {

    return (
        <main className="flex flex-col w-full mx-auto max-w-4xl items-center justify-start leading-relaxed space-y-5 gap-y-4 px-4 py-8">
            <Greeting />
            <ChatBox />
        </main>
    );
}
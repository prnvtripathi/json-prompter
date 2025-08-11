import ChatBox from "@/components/chat/chat";
import Greeting from "@/components/ui/greeting";

export default async function ChatPage() {

    return (
        <main className="min-h-screen flex flex-col w-full mx-auto max-w-4xl items-center justify-center leading-relaxed space-y-5 gap-y-4">
            <Greeting />
            <ChatBox />
        </main>
    );
}
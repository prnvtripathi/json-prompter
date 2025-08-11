import ChatBox from "@/components/chat/chat";
import Greeting from "@/components/ui/greeting";
import { cookies } from "next/headers";

export default async function ChatPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;

    return (
        <main className="min-h-screen flex flex-col w-full mx-auto max-w-4xl items-center justify-center leading-relaxed space-y-5 gap-y-4">
            <Greeting />
            <ChatBox token={token} />
        </main>
    );
}
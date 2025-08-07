import Navbar from "@/components/home/navbar";
import { Background } from "@/components/home/background";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Background>
                <main className="overflow-y-auto mt-16 w-full mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
                    {children}
                </main>
            </Background>
        </div>
    )
}

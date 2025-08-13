import Navbar from "@/components/home/navbar";
import { Background } from "@/components/home/background";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Background>
                <div className="pt-16">
                    {children}
                </div>
            </Background>
        </div>
    )
}

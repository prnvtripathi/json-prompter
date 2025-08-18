import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/next"

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
            <Analytics />
        </ThemeProvider>
    );
}
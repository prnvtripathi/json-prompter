import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorCard({ message }: { message: string }) {
    return (
        <Alert variant="destructive" className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900/70 shadow-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm font-semibold">
                Error
            </AlertTitle>
            <AlertDescription className="text-sm leading-relaxed mt-1 text-red-700 dark:text-red-300">
                {message}
            </AlertDescription>
        </Alert>
    );
}
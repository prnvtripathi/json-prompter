import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function ResultCard({ result, format }: { result: string | undefined, format: string | undefined }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    const renderContent = () => {
        if (!result) return null;

        if (format === "text-to-json") {
            try {
                const parsed = JSON.parse(result);
                return (
                    <pre className="text-sm overflow-auto whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
                        {JSON.stringify(parsed, null, 2)}
                    </pre>
                );
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                // If JSON parsing fails, show as regular text
                return <div className="text-gray-800 dark:text-gray-200">{result}</div>;
            }
        }

        return <div className="text-gray-800 dark:text-gray-200">{result}</div>;
    };

    return (
        <Card className="border border-green-500 text-green-700 dark:text-green-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-green-700 dark:text-green-300">Result</CardTitle>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    title="Copy to clipboard"
                >
                    {isCopied ? (
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                        <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                </button>
            </CardHeader>
            <CardContent>
                {renderContent()}
            </CardContent>
        </Card>
    );
}
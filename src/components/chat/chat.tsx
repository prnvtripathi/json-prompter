"use client"

import {
    PromptInput,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    PromptInputModelSelect,
    PromptInputModelSelectValue,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem
} from '@/components/chat/prompt-input';
import { Suspense, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { models } from '@/lib/models';
import { formats } from '@/lib/formats';
import { useGroq } from '@/hooks/use-groq';
import { useToken } from '@/hooks/use-token';
import { GroqRequest } from '@/types/api.types';
import ErrorCard from './error-card';
import ResultCard from './result-card';
import { Loader } from 'lucide-react';

// Loading component
const LoadingFallback = () => (
    <div className="p-4 text-sm text-muted-foreground animate-spin"><Loader /></div>
);

// Selector component for better reusability
interface SelectorProps {
    value: string;
    onValueChange: (value: string) => void;
    options: Array<{ id: string; name: string }>;
    placeholder?: string;
}

const Selector = ({ value, onValueChange, options, placeholder }: SelectorProps) => (
    <PromptInputModelSelect onValueChange={onValueChange} value={value}>
        <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue placeholder={placeholder} />
        </PromptInputModelSelectTrigger>
        <PromptInputModelSelectContent>
            {options.map((option) => (
                <PromptInputModelSelectItem key={option.id} value={option.id}>
                    {option.name}
                </PromptInputModelSelectItem>
            ))}
        </PromptInputModelSelectContent>
    </PromptInputModelSelect>
);

export default function ChatBoxWrapper() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ChatBox />
        </Suspense>
    );
}

function ChatBox() {
    const searchParams = useSearchParams();

    // Memoize initial format to prevent unnecessary re-renders
    const initialFormat = useMemo(() =>
        searchParams.get("format") || formats[0]?.id || '',
        [searchParams]
    );

    // State management
    const [text, setText] = useState<string>('');
    const [model, setModel] = useState<string>(models[0]?.id || '');
    const [format, setFormat] = useState<string>(initialFormat);

    // Hooks
    const { isLoading: tokenLoading, error: tokenError } = useToken();
    const { trigger, data, error, isLoading } = useGroq();

    // Memoized handlers to prevent unnecessary re-renders
    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const handleModelChange = useCallback((value: string) => {
        setModel(value);
    }, []);

    const handleFormatChange = useCallback((value: string) => {
        setFormat(value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text.trim()) {
            console.warn("Cannot submit empty message");
            return;
        }

        try {
            const requestBody: GroqRequest = {
                message: text.trim(),
                model,
                format
            };
            trigger(requestBody);
        } catch (submitError) {
            console.error("Error triggering GROQ request:", submitError);
        }
    }, [text, model, format, trigger]);

    // Compute submit button status
    const submitStatus = useMemo(() => {
        if (isLoading) return 'submitted';
        if (error || tokenError) return 'error';
        return 'ready';
    }, [isLoading, error, tokenError]);

    // Check if form is valid for submission
    const isFormValid = useMemo(() =>
        text.trim().length > 0 && !isLoading && !tokenLoading,
        [text, isLoading, tokenLoading]
    );

    // Show token error if it exists
    if (tokenError) {
        return (
            <main className="flex flex-col h-full w-full">
                <ErrorCard message={`Token Error: ${tokenError.message}`} />
            </main>
        );
    }

    return (
        <main className="flex flex-col h-full w-full">
            {/* Error Display */}
            {error && <ErrorCard message={error.message} />}

            {/* Results Display */}
            {data && (
                <div className="mt-4">
                    <ResultCard result={data.message} format={data.format} />
                </div>
            )}

            {/* Input Form */}
            <PromptInput onSubmit={handleSubmit} className="mt-4">
                <PromptInputTextarea
                    onChange={handleTextChange}
                    value={text}
                    placeholder="Turn plain text prompts to JSON"
                    disabled={isLoading || tokenLoading}
                />

                <PromptInputToolbar>
                    <PromptInputTools>
                        {/* Model Selector */}
                        <Selector
                            value={model}
                            onValueChange={handleModelChange}
                            options={models}
                            placeholder="Select model"
                        />

                        {/* Format Selector */}
                        <Selector
                            value={format}
                            onValueChange={handleFormatChange}
                            options={formats}
                            placeholder="Select format"
                        />
                    </PromptInputTools>

                    {/* Submit Button */}
                    <PromptInputSubmit
                        className="flex items-center justify-center"
                        disabled={!isFormValid}
                        status={submitStatus}
                    />
                </PromptInputToolbar>
            </PromptInput>
        </main>
    );
}
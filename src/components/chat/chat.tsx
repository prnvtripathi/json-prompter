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
import { useState } from 'react';
import { models } from '@/lib/models';
import { formats } from '@/lib/formats';
import { useGroq } from '@/hooks/use-groq';
import { useToken } from '@/hooks/use-token';
import { GroqRequest } from '@/types/api.types';


export default function ChatBox() {
    const [text, setText] = useState<string>('');
    const [model, setModel] = useState<string>(models[0].id);
    const [format, setFormat] = useState<string>(formats[0].id)

    const { isLoading: tokenLoading, error: tokenError } = useToken();

    const { trigger, data, error, isLoading } = useGroq();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestBody: GroqRequest = {
                message: text,
                model,
                format
            };
            trigger(requestBody);
        } catch (error) {
            console.error("Error triggering GROQ request:", error);
        }
    };

    return (
        <main className='flex flex-col h-full w-full'>
            {error && (<div className="text-red-500">{error.message}</div>)}
            <div className="mt-4">
                {data && (
                    <p className="text-green-500">
                        {data.message}
                    </p>
                )}
            </div>
            <PromptInput onSubmit={handleSubmit} className="mt-4">
                <PromptInputTextarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Turn plain text prompts to JSON'
                />
                <PromptInputToolbar>
                    <PromptInputTools>
                        {/* Model Select */}
                        <PromptInputModelSelect
                            onValueChange={(value) => {
                                setModel(value);
                            }}
                            value={model}
                        >
                            <PromptInputModelSelectTrigger>
                                <PromptInputModelSelectValue />
                            </PromptInputModelSelectTrigger>
                            <PromptInputModelSelectContent>
                                {models.map((model) => (
                                    <PromptInputModelSelectItem key={model.id} value={model.id}>
                                        {model.name}
                                    </PromptInputModelSelectItem>
                                ))}
                            </PromptInputModelSelectContent>
                        </PromptInputModelSelect>
                        {/* Format Select */}
                        <PromptInputModelSelect
                            onValueChange={(value) => {
                                setFormat(value);
                            }}
                            value={format}
                        >
                            <PromptInputModelSelectTrigger>
                                <PromptInputModelSelectValue />
                            </PromptInputModelSelectTrigger>
                            <PromptInputModelSelectContent>
                                {formats.map((format) => (
                                    <PromptInputModelSelectItem key={format.id} value={format.id.toString()}>
                                        {format.name}
                                    </PromptInputModelSelectItem>
                                ))}
                            </PromptInputModelSelectContent>
                        </PromptInputModelSelect>
                    </PromptInputTools>
                    {/* Status can be ready, submitted, streaming or error */}
                    <PromptInputSubmit className='flex items-center justify-center' disabled={!text || isLoading} status={isLoading ? 'submitted' : error ? 'error' : 'ready'} />
                </PromptInputToolbar>
            </PromptInput>
        </main>
    )
}

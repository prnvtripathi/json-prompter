"use client"

import {
    PromptInput,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputButton,
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


export default function ChatBox({ token }: { token: string | undefined }) {
    const [text, setText] = useState<string>('');
    const [model, setModel] = useState<string>(models[0].id);
    const [format, setFormat] = useState<number>(formats[0].id)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage({ text })
        setText('');
    };

    function sendMessage({ text }: { text: string }) {
        console.log("text", text)
    }

    return (
        <main className='flex justify-center items-center w-full'>
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
                                setFormat(Number(value));
                            }}
                            value={format.toString()}
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
                    <PromptInputSubmit disabled={!text} status={'ready'} />
                </PromptInputToolbar>
            </PromptInput>
        </main>
    )
}

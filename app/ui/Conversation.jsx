"use client";

import React, { useState } from 'react'
import MessageCard from '../Components/MessageCard'
import { PaperPlane } from '../Helpers/icons';
import { sendMessage } from '../api/Conversations';

const Conversation = ({
    conversation,
    setConversation,
    setArchitectureData
}) => {
    const [input, setInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || chatLoading) return;

        const userMsg = { role: "user", content: input };

        // Update local and parent conversation state
        const updatedConversation = [...conversation, userMsg];
        setConversation(updatedConversation);
        setInput("");
        setChatLoading(true);

        try {
            const result = await sendMessage(updatedConversation);

            // Assuming the backend returns { data: ArchitectureData }
            if (result.data) {
                setArchitectureData(result.data);

                const assistantMsg = {
                    role: "assistant",
                    content: `Success! I have generated the architecture for "${result.data.projectTitle}". Look at the MindMap for details.`
                };
                setConversation([...updatedConversation, assistantMsg]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMsg = {
                role: "assistant",
                content: "Sorry, I encountered an error while generating your architecture. Please try again."
            };
            setConversation([...updatedConversation, errorMsg]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className='border h-full bg-(--color-secondary) p-4 flex flex-col'>
            {/* Chat List */}
            <div className='grow overflow-y-auto mb-4'>
                {conversation.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400 italic">
                        Start a conversation to generate architecture...
                    </div>
                ) : (
                    <ul className='flex flex-col'>
                        {conversation.map(({ content, role }, index) => (
                            <li
                                key={index}
                                className={`w-full flex ${role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <MessageCard content={content} isUser={role === "user"} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className='flex gap-2 shrink-0'>
                <input
                    type="text"
                    value={input}
                    disabled={chatLoading}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className='grow p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-(--color-last) bg-transparent outline-none text-(--text-normal)'
                />
                <button
                    type="submit"
                    disabled={chatLoading}
                    className='px-4 py-3 rounded-lg bg-(--color-last) text-white font-semibold hover:opacity-90 transition cursor-pointer'
                >
                    <PaperPlane />
                </button>
            </form>
        </div>
    )
}

export default Conversation

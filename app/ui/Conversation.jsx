"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MessageCard from "../Components/MessageCard";
import { PaperPlane } from "../Helpers/icons";
import { sendMessage, getConversationMessages } from "../api/Conversations";
import { useAppStore } from "../store/useAppStore";

const Conversation = () => {
  //router for navigation
  const router = useRouter();

  // loading states
  const [chatLoading, setChatLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Data
  const [conversation, setConversation] = useState([]);
  const projectId = useAppStore((state) => state.currentProject);
  const conversationId = useAppStore((state) => state.currentConversation);
  const setArchitectureData = useAppStore((state) => state.setArchitectureData);

  // user input
  const [input, setInput] = useState("");

  useEffect(() => {
    setMounted(true);

    // fetch conversation messages
    const fetchConversation = async () => {
      const res = await getConversationMessages(conversationId);
      if (res.success) {
        setConversation(res.data || []);
      }
    };

    fetchConversation();
  }, [conversationId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;

    const userMsg = { role: "user", content: input };

    // Update local and parent conversation state
    const updatedConversation = [...conversation, userMsg];
    setConversation(updatedConversation);
    setInput("");
    setChatLoading(true);

    const result = await sendMessage(conversationId, input, projectId);

    if (result.success && result.data) {
      const { message, architecture } = result.data;
      const newConversationId = result.conversationId;

      // Redirect if it was the first message
      if (!conversationId && newConversationId) {
        router.push(`/home?pid=${projectId}&cid=${newConversationId}`);
      }

      // Update global store so MindMap re-renders
      if (architecture) {
        setArchitectureData(architecture);
      }

      const assistantMsg = {
        role: "assistant",
        content: message,
      };
      setConversation([...updatedConversation, assistantMsg]);
    } else {
      const errorMsg = {
        role: "assistant",
        content:
          "Sorry, I encountered an error while generating your architecture. Please try again.",
      };
      setConversation([...updatedConversation, errorMsg]);
    }

    setChatLoading(false);
  };

  return (
    <div className="border h-full bg-(--color-secondary) flex flex-col relative">
      {mounted && !projectId && (
        <div className="z-50 absolute w-full h-full backdrop-blur-md bg-black/40 flex items-center justify-center p-6 text-center text-white font-medium">
          Start sharing your thoughts
        </div>
      )}
      {/* Chat List */}
      <div className="grow overflow-y-auto mb-4 p-4">
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 italic">
            Start sharing your thoughts
          </div>
        ) : (
          <ul className="flex flex-col">
            {conversation.map(({ content, role }, index) => (
              <li
                key={index}
                className={`w-full flex ${role === "user" ? "justify-end" : "justify-start"}`}
              >
                <MessageCard content={content} isUser={role === "user"} />
              </li>
            ))}
            {chatLoading && (
              <div className="w-3 h-3 rounded-full bg-(--color-last) animate-pulse"></div>
            )}
          </ul>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          disabled={chatLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="grow p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-(--color-last) bg-transparent outline-none text-(--text-normal)"
        />
        <button
          type="submit"
          disabled={chatLoading}
          className="px-4 py-3 rounded-lg bg-(--color-last) text-white font-semibold hover:opacity-90 transition cursor-pointer"
        >
          <PaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Conversation;

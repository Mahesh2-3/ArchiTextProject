"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MessageCard from "../Components/MessageCard";
import { AngleDown, Close, PaperPlane } from "../Helpers/icons";
import {
  sendMessage,
  getProjectMessages
} from "../api/Messages";
import { useAppStore } from "../store/useAppStore";
import { toast } from "react-toastify";
import { toastOptions } from "../Helpers/toast";

const Conversation = ({ onClose }) => {
  //router for navigation
  const router = useRouter();

  // loading states
  const [chatLoading, setChatLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Data
  const [conversation, setConversation] = useState([]);
  const projectId = useAppStore((state) => state.currentProject);


  const setArchitectureData = useAppStore((state) => state.setArchitectureData);
  const triggerSidebarRefresh = useAppStore(
    (state) => state.triggerSidebarRefresh,
  );

  // user input
  const [input, setInput] = useState("");

  useEffect(() => {
    // fetch messages for project
    const fetchConversation = async () => {
      if (!projectId) {
        setConversation([]);
        return;
      }
      const res = await getProjectMessages(projectId);
      if (res.success) {
        setConversation(res.data || []);
      } else {
        toast.error(res.error || "Failed to fetch messages", toastOptions());
      }
      setMounted(true);
    };

    fetchConversation();
  }, [projectId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;

    const userMsg = { role: "user", content: input };

    // Update local and parent conversation state
    const updatedConversation = [...conversation, userMsg];
    setConversation(updatedConversation);
    setInput("");
    setChatLoading(true);

    const result = await sendMessage(projectId, input);

    if (result.success && result.data) {
      const { message, architecture } = result.data;

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
      toast.error(result.error || "Failed to send message", toastOptions());
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
    <div className="w-full h-full bg-(--bg-main) flex flex-col relative">
      {/* Header: titles + close button */}
      <div className="flex items-center justify-between border-b border-(--border) shrink-0">
        {projectId ? (
          <div className="p-4 text-sm flex items-center gap-2 text-(--text-main) flex-1 min-w-0">
            <p className="font-bold truncate">Project Chat</p>
          </div>
        ) : (
          <div className="flex-1" />
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="p-3 text-(--text-muted) hover:text-(--text-main) hover:bg-(--accent)/10 transition shrink-0 cursor-pointer text-xl"
            title="Close conversation panel"
          >
            <Close />
          </button>
        )}
      </div>
      {mounted && !projectId && (
        <div className="z-50 absolute w-full h-full backdrop-blur-md bg-(--bg-main)/80 flex items-center justify-center p-6 text-center text-(--text-main) font-medium">
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
              <div className="w-3 h-3 rounded-full bg-(--accent) animate-pulse"></div>
            )}
          </ul>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="p-4 flex gap-2 shrink-0 border-t border-(--border) bg-(--bg-side)/30"
      >
        <input
          type="text"
          value={input}
          disabled={chatLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="grow min-w-0 p-3 rounded-lg border border-(--border) bg-(--bg-side) focus:border-(--accent) focus:outline-none outline-none text-(--text-main) transition-all"
        />
        <button
          type="submit"
          disabled={chatLoading}
          className="px-4 py-3 rounded-lg bg-(--accent) text-(--accent-text) font-semibold hover:opacity-90 transition active:scale-95 cursor-pointer shadow-md"
        >
          <PaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Conversation;

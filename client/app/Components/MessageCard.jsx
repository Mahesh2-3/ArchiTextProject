import React from "react";
import ReactMarkdown from "react-markdown";

const MessageCard = ({ content, isUser }) => {
  return (
    <div
      className={`flex items-center p-3 justify-start bg-(--bg-card) border border-(--border) rounded-lg ${isUser ? "max-w-[60%]" : "max-w-[80%]"} min-h-10 my-3 text-(--text-main) shadow-sm`}
    >
      <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none w-full text-(--text-main)">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageCard;

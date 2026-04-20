import React from "react";

const MessageCard = ({ content, isUser }) => {
  return (
    <div
      className={`flex items-center p-3 justify-start bg-(--bg-card) border border-(--border) rounded-lg ${isUser ? "max-w-[60%]" : "max-w-[80%]"} min-h-10 my-3 text-(--text-main) shadow-sm`}
    >
      {content}
    </div>
  );
};

export default MessageCard;

import React from 'react'

const MessageCard = ({ content, isUser }) => {
    return (
        <div className={` flex items-center p-3 justify-start  rounded-lg ${isUser ? "bg-(--color-normal) border border-gray-300 max-w-[60%]" : "bg-(--color-normal)/50 max-w-[80%]"} min-h-10 my-3 text-(--text-normal)`}>
            {content}
        </div>
    )
}

export default MessageCard

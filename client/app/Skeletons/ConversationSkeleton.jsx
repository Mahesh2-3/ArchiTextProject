const ConversationSkeleton = () => {
  return (
    <ul className="flex flex-col gap-1 pl-4 ml-1 border-l-2 border-gray-400 dark:border-gray-600">
      {[1, 2, 3].map((i) => (
        <li key={i} className="py-1.5 px-2">
          <div
            className="h-3 rounded bg-black/10 dark:bg-white/10 animate-pulse"
            style={{
              width: `${65 + i * 10}%`,
              animationDelay: `${i * 80}ms`,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ConversationSkeleton;

const ProjectSkeleton = () => {
  return (
    <ul className="flex flex-col gap-6">
      {[1, 2, 3].map((i) => (
        <li key={i} className="flex flex-col gap-2">
          {/* Project row */}
          <div className="flex items-center justify-between py-1 px-2">
            {/* Angle icon placeholder */}
            <div className="w-4 h-4 rounded bg-black/10 dark:bg-white/10 animate-pulse shrink-0" />
            {/* Title */}
            <div
              className="h-4 rounded bg-black/10 dark:bg-white/10 animate-pulse mx-3 flex-1"
              style={{ animationDelay: `${i * 80}ms` }}
            />
            {/* Plus icon placeholder */}
            <div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 animate-pulse shrink-0" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectSkeleton;

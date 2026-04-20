/**
 * Returns a styled label for displaying tech stack groupings.
 */
export const TechStackLabel = ({ techStack }) => (
  <div className="text-left w-full">
    <div className="font-bold mb-2 pb-1 border-b border-inherit">
      Tech Stack
    </div>
    <ul className="text-sm flex flex-col gap-2">
      {techStack?.map((item, i) => (
        <li key={i}>
          <div className="font-bold capitalize">
            {item.area}:{" "}
            <span className="font-extrabold opacity-90">{item.name}</span>
          </div>
          <div className="text-xs text-inherit opacity-80 mt-0.5">
            {item.reason}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Returns a styled label displaying DB Schema model blueprints.
 */
export const SchemaModelLabel = ({ model }) => (
  <div className="text-left w-full">
    <div className="font-bold mb-2 pb-1 border-b border-inherit">
      Model: {model.collection}
    </div>
    <ul className="text-sm flex flex-col gap-1">
      {model.fields.map((field, j) => (
        <li key={j}>
          <span className="font-medium">{field.name}</span>{" "}
          <span className="text-xs text-inherit opacity-70">
            ({field.type})
          </span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Returns a styled label illustrating all API paths and descriptions.
 */

export const APIsLabel = ({ apis }) => (
  <div className="text-left w-full">
    <div className="font-bold mb-2 pb-1 border-b border-inherit">APIs</div>
    <ul className="text-sm flex flex-col gap-2">
      {apis.map((api, i) => (
        <li key={i}>
          <div className="font-bold">
            <span
              className={
                api.method === "GET"
                  ? "text-green-600 dark:text-green-400"
                  : api.method === "POST"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : api.method === "PUT"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
              }
            >
              {api.method}
            </span>{" "}
            <span className="font-mono">{api.route}</span>
          </div>
          <div className="text-xs text-inherit opacity-80 mt-0.5">
            {api.description}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Returns a styled label visualizing sub-directories within structure sections.
 */
export const StructureFolderLabel = ({ section, paths }) => (
  <div className="text-left w-full">
    <div className="font-bold mb-2 pb-1 border-b border-inherit capitalize">
      {section}
    </div>
    <ul className="text-sm font-mono flex flex-col gap-1">
      {paths.map((path, i) => (
        <li key={i}>{path}</li>
      ))}
    </ul>
  </div>
);

/**
 * Returns a stylized label capturing core scalability considerations.
 */
export const ScalingLabel = ({ scaling }) => (
  <div className="text-left w-full">
    <div className="font-bold mb-2 pb-1 border-b border-inherit">
      Scaling Strategies
    </div>
    <ul className="text-sm flex flex-col gap-1 list-disc pl-4 text-left">
      {scaling.map((scale, i) => (
        <li key={i} className="text-inherit opacity-90">
          {scale}
        </li>
      ))}
    </ul>
  </div>
);

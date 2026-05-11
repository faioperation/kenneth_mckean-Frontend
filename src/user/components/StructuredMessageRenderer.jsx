const StructuredMessageRenderer = ({ blocks }) => {
   if (!Array.isArray(blocks)) return null;
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        // PARAGRAPH
        if (block.type === "paragraph") {
          return (
            <p
              key={index}
              className=" leading-7 text-gray-700 whitespace-pre-wrap"
            >
              {block.text}
            </p>
          );
        }

        // NUMBERED LIST
        if (block.type === "numbered_list") {
          return (
            <ol
              key={index}
              className="list-decimal pl-5 space-y-3"
            >
              {block.items.map((item, idx) => (
                <li key={idx}>
                    {item.title && (
                    <span className="font-bold  text-gray-700 ">
                    {item.title} <br />
                  </span>
                  )}
                  {item.text && (
                    <span className="text-gray-700 ">
                      {" "}
                       {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          );
        }

        // BULLETED LIST
        if (block.type === "bulleted_list") {
          return (
            <ul
              key={index}
              className="list-disc pl-5 space-y-3"
            >
              {block.items.map((item, idx) => (
                <li key={idx}>
                  {item.title && (
                    <span className="font-bold  text-gray-700 ">
                    {item.title} <br />
                  </span>
                  )}
                  
                  {item.text && (
                    <span className="text-gray-700 ">
                      {" "}
                       {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
};

export default StructuredMessageRenderer;
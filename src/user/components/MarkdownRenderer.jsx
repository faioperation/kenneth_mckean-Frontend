import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline ? (
            <div className="not-prose [&_*]:!no-underline [&_*]:!border-0 [&_*]:!shadow-none min-h-full overflow-auto  my-4">
              <SyntaxHighlighter
                style={oneLight}
                language={match ? match[1] : "text"}
                PreTag="div"
                customStyle={{ backgroundColor: "#e5e7eb" }}
              >
                {children ? String(children).replace(/\n$/, "") : ""}
              </SyntaxHighlighter>
            </div>
          ) : (
            <span className="bg-gray-200 px-1 rounded font-mono text-sm">
              {children}
            </span>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
export default MarkdownRenderer

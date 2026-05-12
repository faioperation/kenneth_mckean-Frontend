import { useState, useEffect } from "react";
import EveryButton from "./EveryButton";
import Dashboard from "./Dashboard";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const EditorPanel = ({ messages, onClose }) => {
  const [activeTab, setActiveTab] = useState("code");
  // Find the latest message that contains a codebase
  const latestMessageWithCodebase = [...messages]
    .reverse()
    .find((m) => m.codebase && m.codebase.length > 0);
    
  const codebaseArray = latestMessageWithCodebase
    ? latestMessageWithCodebase.codebase
    : [];

  // Convert the array of {file_path, content} into the sandpack files object
  const sandpackFiles = {};
  codebaseArray.forEach((file) => {
    let path = file.file_path || file.path;
    if (!path) return;
    path = path.split('#')[0].trim();
    if (!path.startsWith("/")) path = "/" + path;
    
    let content = file.content || "";
    // Clean markdown code block formatting if present
    if (typeof content === "string") {
      const match = content.match(/^```[a-z]*\s*\n([\s\S]*?)\n```\s*$/i);
      if (match) {
        content = match[1];
      } else {
        // Fallback for files that just have ``` at start and end
        content = content.replace(/^```[a-z]*\s*\n/i, "").replace(/\n```\s*$/i, "");
      }
    }
    
    sandpackFiles[path] = content;
  });

  // NORMALIZATION: If all files (or most key files) are under a 'client' directory, 
  // sandpack needs them at the root to run templates like 'vite-react' correctly.
  const allPaths = Object.keys(sandpackFiles);
  const clientPaths = allPaths.filter(p => p.startsWith("/client/"));
  
  if (clientPaths.length > 0 && (clientPaths.length / allPaths.length) > 0.5) {
    // Re-root files from /client/ to /
    clientPaths.forEach(p => {
      const newPath = p.replace("/client/", "/");
      sandpackFiles[newPath] = sandpackFiles[p];
      // Keep the old one too just in case
    });
  }

  // Ensure index.html is at root for vite-react if it exists elsewhere
  if (!sandpackFiles["/index.html"]) {
    const htmlPath = Object.keys(sandpackFiles).find(p => p.endsWith("index.html"));
    if (htmlPath) {
      sandpackFiles["/index.html"] = sandpackFiles[htmlPath];
    }
  }

  // Determine the template
  let template = "vanilla";
  
  // Check for any package.json or key frontend files anywhere in the tree
  const filePaths = Object.keys(sandpackFiles);
  const hasReact = filePaths.some(p => p.includes("App.jsx") || p.includes("App.js") || p.includes("main.jsx") || p.includes("index.js") && sandpackFiles[p].includes("react"));
  const hasVite = filePaths.some(p => p.includes("vite.config"));
  const hasPackageJson = filePaths.some(p => p.endsWith("package.json"));
  
  if (hasReact || hasVite) {
    template = "react"; // 'react' (CRA) is often more stable than 'vite-react' in browser sandpack
  } else if (hasPackageJson) {
    // Look closer at the package.json content
    const pkgPaths = filePaths.filter(p => p.endsWith("package.json"));
    let isNode = false;
    let isReact = false;
    
    pkgPaths.forEach(p => {
      let content = sandpackFiles[p];
      // Clean package.json: strip versions to let sandpack resolve latest compatible
      try {
        const pkg = JSON.parse(content);
        if (pkg.dependencies) {
           Object.keys(pkg.dependencies).forEach(dep => {
             // For certain problematic deps, force latest or compatible version
             pkg.dependencies[dep] = "latest";
           });
        }
        content = JSON.stringify(pkg, null, 2);
        sandpackFiles[p] = content;
      } catch (e) {}

      if (content.includes("\"react\"")) isReact = true;
      if (content.includes("\"express\"") || content.includes("\"koa\"")) isNode = true;
    });

    if (isReact) template = "react";
    else if (isNode) template = "vanilla"; 
  } else if (filePaths.some(p => p.endsWith(".html"))) {
    template = "static";
  }

  // Find entry point & Fix for 'react' template entry requirements
  let entry = undefined;
  if (template === "react") {
    // Standard react template (CRA) expects /src/index.js
    if (!sandpackFiles["/src/index.js"]) {
      const existingEntry = sandpackFiles["/src/main.jsx"] || sandpackFiles["/src/index.jsx"] || sandpackFiles["/src/App.js"];
      if (existingEntry) {
        sandpackFiles["/src/index.js"] = existingEntry;
      }
    }
    const commonEntries = ["/src/index.js", "/src/index.jsx", "/src/main.jsx", "/src/main.js", "/index.js", "/src/App.js", "/App.js"];
    entry = commonEntries.find(e => sandpackFiles[e]);
  } else if (template === "static") {
    entry = filePaths.find(p => p.endsWith("index.html")) || filePaths.find(p => p.endsWith(".html"));
  }

  // If there's no codebase at all, fallback to showing nothing or a message
  const hasFiles = Object.keys(sandpackFiles).length > 0;

  return (
    <section className="flex-[1.2] flex flex-col bg-white lg:ml-4 mr-5 lg:mb-5 rounded-2xl shadow border overflow-hidden h-full">
      {/* Header */}
      <EveryButton onClose={onClose} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {hasFiles ? (
          <div className="w-full h-full flex flex-col min-h-0 [&_.sp-wrapper]:h-full [&_.sp-wrapper]:flex [&_.sp-wrapper]:flex-col [&_.sp-layout]:flex-1 [&_.sp-layout]:h-full [&_.sp-preview]:h-full [&_.sp-preview]:flex-1 [&_.sp-preview-container]:h-full [&_.sp-preview-iframe]:h-full">
            <SandpackProvider 
              template={template} 
              files={sandpackFiles} 
              theme="light"
              customSetup={{
                entry: entry
              }}
            >
              <div className={`flex-1 flex-col h-[85vh] min-h-0 ${activeTab === "code" ? "flex" : "hidden"}`}>
                <SandpackLayout style={{ height: "100%", width: "100%" }} className="flex-1 h-full">
                  <SandpackFileExplorer style={{ height: "100%", width: "25%", minWidth: "200px" }} />
                  <SandpackCodeEditor showTabs={false} showLineNumbers={true} style={{ height: "100%", flex: 1 }} />
                </SandpackLayout>
              </div>
              <div className={`flex-1 flex-col h-[85vh] min-h-0 ${activeTab === "dashboard" ? "flex" : "hidden"}`}>
                <SandpackLayout style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", flex: 1 }} className="flex-1 h-full">
                  <SandpackPreview 
                    style={{ height: "100%", width: "100%", flex: 1 }} 
                    className="flex-1 h-full"
                    showOpenInCodeSandbox={false}
                    showRefreshButton={true}
                  />
                </SandpackLayout>
              </div>
            </SandpackProvider>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <p>No generated codebase files found yet.</p>
            <p className="text-sm mt-2">Generate a website or app to see the preview here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditorPanel;
// import { useState } from "react";
// import EveryButton from "./EveryButton";
// import { ChevronDown, Menu, Copy, X } from "lucide-react";

// const EditorPanel = ({ messages, onClose }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <section className="flex-1 lg:flex-[1.2] flex flex-col bg-white lg:ml-4 lg:m-5 m-0 ml-0 mb-0 lg:rounded-2xl shadow border overflow-hidden fixed inset-0 z-[60] xl:static">
//       {/* Header with Close Button */}
//       <div className="flex items-center justify-between bg-gray-50 border-b px-4 py-2">
//         <EveryButton />
//         <button 
//           onClick={onClose}
//           className="p-2 rounded-lg bg-gray-200 border border-gray-200 cursor-pointer hover:text-black text-gray-600 transition-colors"
//           title="Close Panel"
//         >
//           <X size={20} />
//         </button>
//       </div>

//       {/* Body */}
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Mobile Nav */}
//         <div className="lg:hidden absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
//           <h1 className="font-semibold text-sm">Project</h1>
//           <button onClick={() => setMobileOpen(!mobileOpen)}>
//             <Menu size={20} />
//           </button>
//         </div>

//         {/* Sidebar / File Explorer */}
//         <div
//           className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0`}
//         >
//           <div className="p-4 text-sm overflow-y-auto h-full text-black pt-16 lg:pt-4">
//             <div className="flex items-center gap-2 font-medium mb-2 cursor-pointer">
//               <ChevronDown size={16} />
//               client
//             </div>
//             <div className="ml-6 space-y-2 text-black">
//               <div>public</div>
//               <div>src</div>
//               <div className="bg-gray-100 px-2 py-1 rounded">index.html</div>
//             </div>
//             <div className="mt-6 space-y-2 text-gray-700">
//               <div>package.json</div>
//               <div>vite.config.ts</div>
//               {/* ... rest of the files */}
//             </div>
//           </div>
//         </div>

//         {/* Overlay Mobile Sidebar */}
//         {mobileOpen && (
//           <div
//             onClick={() => setMobileOpen(false)}
//             className="fixed inset-0 bg-black/30 lg:hidden z-40"
//           />
//         )}

//         {/* Editor Area */}
//         <div className="flex-1 flex flex-col mt-14 lg:mt-0">
//           <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//             <h2 className="font-medium text-gray-700">index.html</h2>
//             <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
//               <Copy size={16} />
//               Copy
//             </button>
//           </div>

//           <div className="flex-1 overflow-auto bg-white p-6">
//             <pre className="text-sm text-gray-800 leading-6 whitespace-pre-wrap font-mono">
//               {messages.map((m, idx) => (
//                 <div key={idx} className="mb-4">{m.output}</div>
//               ))}
//             </pre>
//           </div>
//         </div>
//       </div>0
//     </section>
//   );
// };

// export default EditorPanel;


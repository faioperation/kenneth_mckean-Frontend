import { useState, useEffect } from "react";
import EveryButton from "./EveryButton";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import {
  Monitor,
  Smartphone,
  Tablet,
  RotateCw,
  ExternalLink,
  Home,
  ChevronLeft,
  ChevronRight,
  Code2,
  History,
  Layers,
  Database,
  Settings,
  Share2,
  Send,
} from "lucide-react";

const BrowserWrapper = ({ children, url = "/" }) => {
  const [device, setDevice] = useState("desktop");

  return (
    <div className="flex-1 flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-xl">
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-white border-b border-gray-200">
        {/* Device Toggles */}
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1 rounded-md transition-all ${device === "desktop" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-black"}`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`p-1 rounded-md transition-all ${device === "tablet" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-black"}`}
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1 rounded-md transition-all ${device === "mobile" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-black"}`}
          >
            <Smartphone size={14} />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-2xl mx-4 flex items-center gap-3 px-3 py-1 bg-gray-100 rounded-full border border-gray-200 text-gray-500">
          <div className="flex items-center gap-2">
            <Home size={14} className="hover:text-black cursor-pointer" />
            <div className="h-3 w-[1px] bg-gray-300" />
            <div className="flex items-center gap-1">
              <ChevronLeft size={16} className="opacity-50" />
              <ChevronRight size={16} className="opacity-50" />
            </div>
          </div>
          <span className="flex-1 text-xs truncate font-mono tracking-tight select-none">
            {url}
          </span>
          <div className="flex items-center gap-2">
            <ExternalLink size={14} className="hover:text-black cursor-pointer" />
            <RotateCw size={14} className="hover:text-black cursor-pointer" />
          </div>
        </div>

        <div className="w-24 flex justify-end" />
      </div>

      {/* Viewport Container */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-2 overflow-auto">
        <div
          className="transition-all duration-500 shadow-2xl bg-white overflow-hidden"
          style={{
            width:
              device === "mobile" ? "375px" : device === "tablet" ? "768px" : "100%",
            height: device === "desktop" ? "100%" : "min(812px, 100%)",
            borderRadius: device === "desktop" ? "0" : "24px",
            border: device === "desktop" ? "none" : "8px solid #e5e7eb",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const EditorPanel = ({ messages, onClose, isFullView, setIsFullView }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
    path = path.split("#")[0].trim();
    if (!path.startsWith("/")) path = "/" + path;

    let content = file.content || "";
    // Clean markdown code block formatting if present
    if (typeof content === "string") {
      const match = content.match(/^```[a-z]*\s*\n([\s\S]*?)\n```\s*$/i);
      if (match) {
        content = match[1];
      } else {
        // Fallback for files that just have ``` at start and end
        content = content
          .replace(/^```[a-z]*\s*\n/i, "")
          .replace(/\n```\s*$/i, "");
      }
    }

    sandpackFiles[path] = content;
  });

  // Re-root files if necessary (standard normalization)
  const allPaths = Object.keys(sandpackFiles);
  const clientPaths = allPaths.filter((p) => p.startsWith("/client/"));
  const publicPaths = allPaths.filter((p) => p.startsWith("/public/"));

  if (clientPaths.length > 0 && clientPaths.length / allPaths.length > 0.4) {
    clientPaths.forEach((p) => {
      const newPath = p.replace("/client/", "/");
      if (!sandpackFiles[newPath]) sandpackFiles[newPath] = sandpackFiles[p];
    });
  } else if (publicPaths.length > 0) {
    publicPaths.forEach((p) => {
      const newPath = p.replace("/public/", "/");
      if (!sandpackFiles[newPath]) sandpackFiles[newPath] = sandpackFiles[p];
    });
  }

  if (!sandpackFiles["/index.html"]) {
    const htmlPath = Object.keys(sandpackFiles).find((p) =>
      p.endsWith("index.html"),
    );
    if (htmlPath) {
      sandpackFiles["/index.html"] = sandpackFiles[htmlPath];
      const folder = htmlPath.substring(0, htmlPath.lastIndexOf("/") + 1);
      if (folder !== "/") {
        Object.keys(sandpackFiles).forEach((p) => {
          if (p.startsWith(folder)) {
            const newPath = p.replace(folder, "/");
            if (!sandpackFiles[newPath])
              sandpackFiles[newPath] = sandpackFiles[p];
          }
        });
      }
    }
  }

  // Determine the template
  let template = "vanilla";
  const filePaths = Object.keys(sandpackFiles);
  const hasReact = filePaths.some(
    (p) =>
      p.includes("App.jsx") ||
      p.includes("App.js") ||
      p.includes("main.jsx") ||
      (p.includes("index.js") && sandpackFiles[p].includes("react")),
  );
  const hasVite = filePaths.some((p) => p.includes("vite.config"));
  const hasPackageJson = filePaths.some((p) => p.endsWith("package.json"));

  if (hasReact || hasVite) {
    template = "react";
  } else if (hasPackageJson) {
    const pkgPaths = filePaths.filter((p) => p.endsWith("package.json"));
    let isReact = false;
    pkgPaths.forEach((p) => {
      let content = sandpackFiles[p];
      try {
        const pkg = JSON.parse(content);
        if (pkg.dependencies) {
          Object.keys(pkg.dependencies).forEach((dep) => {
            pkg.dependencies[dep] = "latest";
          });
        }
        content = JSON.stringify(pkg, null, 2);
        sandpackFiles[p] = content;
      } catch (e) {}
      if (content.includes('"react"')) isReact = true;
    });
    if (isReact) {
      template = "react";
    } else if (sandpackFiles["/index.html"]) {
      template = "static";
    }
  } else if (sandpackFiles["/index.html"]) {
    template = "static";
  }

  // Find entry point
  let entry = undefined;
  if (template === "react") {
    if (!sandpackFiles["/src/index.js"]) {
      const existingEntry =
        sandpackFiles["/src/main.jsx"] ||
        sandpackFiles["/src/index.jsx"] ||
        sandpackFiles["/src/App.js"];
      if (existingEntry) {
        sandpackFiles["/src/index.js"] = existingEntry;
      }
    }
    const commonEntries = [
      "/src/index.js",
      "/src/index.jsx",
      "/src/main.jsx",
      "/index.js",
    ];
    entry = commonEntries.find((e) => sandpackFiles[e]);
  } else if (template === "static") {
    entry = "/index.html";
  }

  const hasFiles = Object.keys(sandpackFiles).length > 0;

  return (
    <section className="flex-1 flex flex-col bg-white lg:rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full">
      <EveryButton
        onClose={onClose}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsFullView={setIsFullView}
      />

      <div className="flex-1 min-h-0 relative p-2 flex flex-col">
        {hasFiles ? (
          <SandpackProvider
            template={template}
            files={sandpackFiles}
            theme="light"
            customSetup={{ entry: entry }}
            className="flex-1 flex flex-col h-full"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div className="flex-1 flex flex-col min-h-0 h-full">
              {activeTab === "code" ? (
                <SandpackLayout
                  className="flex-1 border border-gray-200 rounded-xl overflow-hidden"
                  style={{ height: "100%" }}
                >
                  <SandpackFileExplorer
                    style={{ height: "100%", width: "240px" }}
                  />
                  <SandpackCodeEditor
                    showTabs={false}
                    showLineNumbers={true}
                    style={{ height: "100%", flex: 1 }}
                  />
                </SandpackLayout>
              ) : activeTab === "dashboard" ? (
                <BrowserWrapper url="/">
                  <SandpackPreview
                    style={{ height: "100%", width: "100%" }}
                    showOpenInCodeSandbox={false}
                    showRefreshButton={false}
                  />
                </BrowserWrapper>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                    {activeTab === "history" && <History size={32} className="text-blue-500" />}
                    {activeTab === "layers" && <Layers size={32} className="text-purple-500" />}
                    {activeTab === "database" && <Database size={32} className="text-emerald-500" />}
                    {activeTab === "settings" && <Settings size={32} className="text-gray-500" />}
                    {activeTab === "share" && <Share2 size={32} className="text-indigo-500" />}
                    {activeTab === "publish" && <Send size={32} className="text-orange-500" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 capitalize mb-2">
                    {activeTab} View
                  </h3>
                  <p className="text-gray-500 max-w-xs mx-auto text-sm">
                    This feature is currently being integrated. Check back soon to manage your project's {activeTab}.
                  </p>
                  <button 
                    onClick={() => setActiveTab("dashboard")}
                    className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/5"
                  >
                    Back to Preview
                  </button>
                </div>
              )}
            </div>
          </SandpackProvider>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <Code2 className="text-gray-400" size={32} />
            </div>
            <p className="font-medium">No generated codebase found</p>
            <p className="text-xs text-gray-400 mt-1">
              Build a website or app to start editing
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EditorPanel;

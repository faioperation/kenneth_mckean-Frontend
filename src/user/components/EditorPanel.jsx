import { useState } from "react";
import EveryButton from "./EveryButton";
import { ChevronDown, ChevronRight, Menu, Copy } from "lucide-react";
const EditorPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <section className="flex-[1.2] flex flex-col bg-white m-5 ml-0 mb-0 rounded-2xl shadow border overflow-hidden">
      {/* Header */}

      <EveryButton />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-40">
          <h1 className="font-semibold text-sm">Project</h1>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={20} />
          </button>
        </div>

        {/* Code Area */}
        <div
          className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
        >
          <div className="p-4 text-sm overflow-y-auto h-full text-black">
            <div className="flex items-center gap-2 font-medium mb-2 cursor-pointer">
              <ChevronDown size={16} />
              client
            </div>

            <div className="ml-6 space-y-2 text-black">
              <div>public</div>
              <div>src</div>
              <div className="bg-gray-100 px-2 py-1 rounded">index.html</div>
            </div>

            <div className="mt-6 space-y-2 text-gray-700">
              <div>patches</div>
              <div>server</div>
              <div>shared</div>
              <div>.gitkeep</div>
              <div>prettierignore</div>
              <div>prettierrc</div>
              <div>components.json</div>
              <div>ideas.md</div>
              <div>package.json</div>
              <div>pnpm-lock.yaml</div>
              <div>tsconfig.json</div>
              <div>vite.config.ts</div>
            </div>
          </div>
        </div>

        {/* Overlay Mobile */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 lg:hidden z-40"
          />
        )}

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col mt-12 lg:mt-0">
          {/* File Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="font-medium text-gray-700">index.html</h2>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
              <Copy size={16} />
              Copy
            </button>
          </div>

          {/* Code Area */}
          <div className="flex-1 overflow-auto bg-white p-6">
            <pre className="text-sm text-gray-800 leading-6 whitespace-pre-wrap">
              {`class WebSocketManager {
  constructor() {
    this.connections = new Map();
    this.eventHandlers = new Map();
  }

  handleConnection(ws) {
    const id = generateId();

    // BUG: Event listeners not removed on close
    ws.on('message', (data) => {
      this.processMessage(id, data);
    });

    ws.on('close', () => {
      this.connections.delete(id);
      // MISSING: this.eventHandlers.delete(id);
    });
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPanel;

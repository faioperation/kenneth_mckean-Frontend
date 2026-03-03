

const EditorPanel = () => {
  return (
     <section className="flex-[1.2] flex flex-col bg-white m-5 ml-0 rounded-2xl shadow border overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b text-gray-200">
        <h3 className="font-semibold">&lt; &gt; Code</h3>
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Publish
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* File Explorer */}
        <div className="w-[200px] border-r p-4 text-sm text-gray-200">
          <p>📁 client</p>
          <p>📁 public</p>
          <p>📁 src</p>
          <p className="ml-4 bg-gray-100 text-black px-1">📄 index.html</p>
        </div>

        {/* Code Area */}
        <div className="flex-1 p-5 font-mono text-sm text-blue-600 overflow-y-auto">
          <pre>
{`class WebSocketManager {
  constructor() {
    this.connections = new Map();
  }

  handleConnection(ws) {
    // Code goes here
  }
}`}
          </pre>
        </div>

      </div>
    </section>
  )
}

export default EditorPanel

import ChatPanel from "../../../components/ChatPanel";
import EditorPanel from "../../../components/EditorPanel";
import Sidebar from "./layout/Sidebar";

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
        <Sidebar />
        <ChatPanel />
        <EditorPanel />
      </div>
    </div>
  );
};

export default UserDashboard;

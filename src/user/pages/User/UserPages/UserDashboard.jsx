import ChatPanel from "../../../components/ChatPanel";
import EditorPanel from "../../../components/EditorPanel";

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        <ChatPanel />
        <EditorPanel />
      </div>
    </div>
  );
};

export default UserDashboard;

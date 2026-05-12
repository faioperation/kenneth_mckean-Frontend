import { SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col flex-1">
      <SandpackLayout style={{ height: "100%", width: "100%", flex: 1 }} className="flex-1 h-full">
        <SandpackPreview
          style={{ height: "100%", width: "100%", flex: 1 }}
          showOpenInCodeSandbox={false}
          showRefreshButton={true}
        />
      </SandpackLayout>
    </div>
  );
};

export default Dashboard;

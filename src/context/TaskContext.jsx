import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState("");
    const [currentTask, setCurrentTask] = useState(null); // ✅ Add current task storage

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            currentPrompt,
            setCurrentPrompt,
            currentTask,
            setCurrentTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within TaskProvider");
    }
    return context;
};
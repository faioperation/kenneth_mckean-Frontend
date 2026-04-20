import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPrompt, setCurrentPrompt] = useState("");

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            currentPrompt,
            setCurrentPrompt
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);
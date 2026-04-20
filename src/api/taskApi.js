import { apiGet } from "../lib/api";

// GET TASKS
export const getTasks = async () => {
    const res = await apiGet("/user/new-task");
    return res.data.tasks;
};

// ✅ CREATE TASK
export const createTask = async (data) => {
  const res = await apiPost("/user/new-task/create", data);
  return res.data; // full task object
};


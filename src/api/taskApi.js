import { apiGet, apiPost } from "../lib/api";

// GET TASKS
export const getTasks = async () => {
    const res = await apiGet("/user/new-task");
    return res.data.tasks;
};

// ✅ CREATE TASK
export const createTask = async (data) => {
  const res = await apiPost("/user/new-task/create", data);
  console.log("Full API Response:", res);

  // The API response could be in different structures
  // Check if response has a data property with taskId
  if (res && res.data && res.data.taskId) {
    console.log("Task data extracted (from res.data):", res.data);
    return res.data;
  }
  
  // Check if response directly has taskId
  if (res && res.taskId) {
    console.log("Task data extracted (direct):", res);
    return res;
  }

  console.warn("No taskId found in response:", res);
  return res; // Return as is and let component handle
};


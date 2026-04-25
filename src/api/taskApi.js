import { apiGet, apiPost } from "../lib/api";

export const getTasks = async () => {
  const res = await apiGet("/user/new-task");
  return res.data.tasks;
};

export const createTask = async (data) => {
  try {
    const res = await apiPost("/user/new-task/create", data);
    return res.data;
  } catch (err) {
    console.log("FULL ERROR:", err.response);
    console.log("ERROR DATA:", err.response?.data);
    throw err;
  }
};
export const continueChat = async (taskId, data) => {
  try {
    const res = await apiPost(`/user/new-task/${taskId}/continue`, data);
    return res.data;
  } catch (err) {
    console.log("CONTINUE CHAT ERROR:", err.response?.data);
    throw err;
  }
};


// PDF generate
export const generatePDF = async (taskId) => {
  const res = await apiPost(`/user/new-task/${taskId}/pdf`, {});
  return res.data;
};

// 


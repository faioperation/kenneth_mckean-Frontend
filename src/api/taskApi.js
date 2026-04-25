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

import axios from "axios";

// PDF generate
export const generatePDF = async (taskId, prompt) => {
  const res = await axios.post(`/user/new-task/${taskId}/pdf`, { prompt });
  return res.data;
};

// PDF download URL builder
export const getPDFDownloadUrl = (taskId) => {
  return `/user/new-task/${taskId}/pdf/download`;
};
1
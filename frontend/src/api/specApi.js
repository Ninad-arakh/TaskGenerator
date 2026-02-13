import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/specs",
});

export const editTaskApi = (specId, taskId, data) =>
  API.patch(`/${specId}/tasks/${taskId}`, data);

export const reorderTasksApi = (specId, orderedTaskIds) =>
  API.patch(`/${specId}/tasks/reorder`, { orderedTaskIds });

export const groupTasksApi = (specId, groups) =>
  API.patch(`/${specId}/tasks/group`, { groups });

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/specs",
});

export const editTaskApi = (specId, taskId, data) =>
  API.patch(`/${specId}/tasks/${taskId}`, data);

export const reorderTasksApi = (
  specId,
  epicIndex,
  storyIndex,
  orderedTaskIds,
) =>
  API.patch(`/${specId}/tasks/reorder`, {
    epicIndex,
    storyIndex,
    orderedTaskIds,
  });

export const groupTasksApi = (specId, epicIndex, storyIndex, groups) =>
  API.patch(`/${specId}/tasks/group`, {
    epicIndex,
    storyIndex,
    groups,
  });

export const getSpecByIdApi = (specId) => API.get(`/${specId}`);

export const deleteTaskApi = (specId, taskId) =>
  API.delete(`/${specId}/tasks/${taskId}`);

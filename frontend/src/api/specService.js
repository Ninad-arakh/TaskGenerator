import api from "./api";

export async function generateSpec(data) {
  const res = await api.post("/api/specs", data);
  return res.data;
}

export async function getHistory() {
  const res = await api.get("/api/specs/recent");
  return res.data;
}

export async function getHealth() {
  const res = await api.get("/api/health");
  console.log("health : " , res)
  return res.data;
}

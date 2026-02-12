import { useEffect, useState } from "react";
import { getHealth } from "../api/specService";
import Badge from "../components/Badge";

export default function Status() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    getHealth().then(setHealth);
  }, []);

  if (!health) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between bg-white p-4 rounded shadow">
        <span>Backend</span>
        <Badge status={health?.data?.backend} />
      </div>

      <div className="flex justify-between bg-white p-4 rounded shadow">
        <span>Database</span>
        <Badge status={health?.data?.database} />
      </div>

      <div className="flex justify-between bg-white p-4 rounded shadow">
        <span>LLM</span>
        <Badge status={health?.data?.llm} />
      </div>
    </div>
  );
}

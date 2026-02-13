import { useEffect, useState } from "react";
import { getHealth } from "../api/specService";
import StatusCard from "../components/status/StatusCard";
import StatusHeader from "../components/status/StatusHeader";
import RefreshButton from "../components/status/RefreshButton";
import {
  IconServer,
  IconDatabase,
  IconBrain,
} from "@tabler/icons-react";

export default function Status() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const data = await getHealth();
      setHealth(data);
      setLastChecked(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (!health) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-lg text-gray-500">
        Checking system health...
      </div>
    );
  }

  

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0e7ff] w-full">

      {/* Soft Wave Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-purple-300/30 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[700px] h-[700px] bg-blue-300/30 rounded-full blur-3xl bottom-0 right-0" />
      </div>

      <div className="relative z-10 px-6 md:px-16 py-14">

        <StatusHeader />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">

          <StatusCard
            title="Backend"
            icon={<IconServer size={48} />}
            status={health?.backend}
          />

          <StatusCard
            title="Database"
            icon={<IconDatabase size={48} />}
            status={health?.database}
          />

          <StatusCard
            title="LLM"
            icon={<IconBrain size={48} />}
            status={health?.llm}
          />
        </div>

        {/* Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 max-w-6xl mx-auto gap-6">

          <p className="text-gray-500 text-sm">
            Last checked:{" "}
            {lastChecked
              ? `${Math.floor(
                  (Date.now() - lastChecked.getTime()) / 60000
                )} minute ago`
              : "—"}
          </p>

          <RefreshButton onClick={fetchHealth} loading={loading} />

        </div>
      </div>
    </div>
  );
}

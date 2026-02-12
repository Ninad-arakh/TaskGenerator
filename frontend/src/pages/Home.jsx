import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSpec } from "../api/specService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goal: "",
    users: "",
    constraints: "",
    templateType: "Web",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.goal.trim()) {
      setError("Goal is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await generateSpec(form);
      navigate("/editor", { state: data });
    } catch (err) {
       console.log(err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      {error && <ErrorAlert message={error} />}

      <div>
        <label className="block mb-1 font-medium">Goal</label>
        <textarea name="goal" rows="3" onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Target Users</label>
        <textarea name="users" rows="2" onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Constraints</label>
        <textarea name="constraints" rows="2" onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Template</label>
        <select name="template" onChange={handleChange} className="w-full border p-2 rounded">
          <option>Web</option>
          <option>Mobile</option>
          <option>Internal Tool</option>
        </select>
      </div>

      <button className="bg-black text-white px-4 py-2 rounded w-full">
        {loading ? "Generating..." : "Generate"}
      </button>

      {loading && <LoadingSpinner />}
    </form>
  );
}

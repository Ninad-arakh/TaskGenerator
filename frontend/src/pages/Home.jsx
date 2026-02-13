import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSpec } from "../api/specService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import aiRoboImg from "/ai_robo.png";
import {
  IconBoltFilled,
  IconPuzzleFilled,
  IconSquareCheckFilled,
} from "@tabler/icons-react";

// Modular Feature Card Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex gap-4 border border-gray-300 rounded-xl p-6 bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-linear-to-br from-[#ffffff] to-[#fbf4ff]">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-lg md:text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="relative w-full flex flex-col gap-4 md:gap-6 justify-center h-auto md:h-[35vh] text-center md:text-left px-4 md:px-28 py-12 md:py-16">
      {/* Decorative Robo */}
      <div className="absolute -z-10 w-[35vw] md:w-[25vw] right-0 top-5 md:top-10 hidden md:block">
        <img
          src={aiRoboImg}
          alt="robo"
          className="absolute w-full animate-float"
        />
        <div className="absolute top-5 w-full h-[30vh] rounded-full bg-linear-to-r from-[#ada9eb]/60 to-[#fcd1f9]/40 shadow-2xl -z-20" />
      </div>

      <h2 className="font-bold text-3xl md:text-5xl leading-tight md:leading-snug">
        Create Customized{" "}
        <span className="text-gradient bg-linear-to-r from-[#2f52be] to-[#7f9cf5] bg-clip-text text-transparent">
          AI TASKS
        </span>{" "}
        in Seconds
      </h2>
      <p className="text-gray-700 md:text-lg max-w-xl mx-auto md:mx-0">
        Generate tailored AI tasks for any purpose with ease. Perfect for Work,
        Study, or Creative projects.
      </p>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 mt-4">
        <button className="bg-linear-to-b from-[#4979e7] to-[#2c53ca] px-8 py-3 rounded-full text-white font-semibold shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 duration-300">
          Generate Task
        </button>
        <p className="italic text-gray-600 text-sm md:text-base">
          No sign-up required
        </p>
      </div>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: <IconBoltFilled className="text-yellow-400" />,
      title: "Quick & Easy",
      desc: "Generate tasks instantly with a simple prompt.",
    },
    {
      icon: <IconSquareCheckFilled className="text-blue-400" />,
      title: "Tailored Results",
      desc: "Get tasks customized to your specific needs.",
    },
    {
      icon: <IconPuzzleFilled className="text-green-700" />,
      title: "Versatile Uses",
      desc: "Ideal for Work, Study, Creative projects, and more.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:w-7xl mx-auto mt-10 px-4 md:px-0">
      {features.map((f, idx) => (
        <FeatureCard key={idx} {...f} />
      ))}
    </div>
  );
}

// Form Section Component
function FormSection({ form, handleChange, handleSubmit, loading, error }) {
  const fields = [
    { label: "Goal", name: "goal", rows: 3 },
    { label: "Target Users", name: "users", rows: 2 },
    { label: "Constraints", name: "constraints", rows: 2 },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-linear-to-br from-[#f5f6ff] to-[#ffffff] p-8 shadow-2xl max-w-4xl mx-auto mt-12 rounded-3xl border border-gray-200"
    >
      {error && <ErrorAlert message={error} />}

      {fields.map((field, idx) => (
        <div key={idx}>
          <label className="block mb-2 font-medium text-gray-700">
            {field.label}
          </label>
          <textarea
            name={field.name}
            rows={field.rows}
            value={form[field.name]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow duration-300 shadow-sm hover:shadow-md resize-none"
          />
        </div>
      ))}

      <div>
        <label className="block mb-2 font-medium text-gray-700">Template</label>
        <select
          name="templateType"
          value={form.templateType}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow duration-300 shadow-sm hover:shadow-md"
        >
          <option>Web</option>
          <option>Mobile</option>
          <option>Internal Tool</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-linear-to-r from-[#2f52be] to-[#7f9cf5] text-white font-semibold py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl active:scale-95 duration-300"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {loading && <LoadingSpinner />}
    </form>
  );
}

// Divider Component
function Divider({ text }) {
  return (
    <div className="mt-12 flex flex-col items-center w-full relative">
      <h3 className="text-3xl font-semibold text-[#475569] bg-[#eef2fe] px-2">
        {text}
      </h3>
      <div className="w-full h-1 bg-linear-to-r from-transparent via-gray-400/40 to-transparent absolute top-5 -z-10" />
    </div>
  );
}

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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
      let message = "LLM Quota exceeded. Please try again after 24 hours.";

      // If using axios
      const backendMessage = err.response?.data?.message;

      if (backendMessage) {
        try {
          const parsed = JSON.parse(backendMessage);

          if (parsed?.error?.code === 429) {
            message = "Quota exceeded. Please wait before trying again.";
          } else {
            message = parsed?.error?.message || message;
          }
        } catch {
          // If it's not JSON, just use it directly
          message = backendMessage;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans mb-8">
      <HeroSection />
      <FeaturesSection />
      <Divider text="See It in Action" />
      <FormSection
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </main>
  );
}

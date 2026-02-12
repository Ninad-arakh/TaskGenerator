import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import History from "./pages/History";
import Status from "./pages/Status";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/history" element={<History />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Layout>
  );
}

export default App;

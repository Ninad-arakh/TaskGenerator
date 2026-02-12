import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="font-semibold">AI Task Generator</h1>
          <nav className="space-x-4 text-sm">
            <Link to="/">Home</Link>
            <Link to="/history">History</Link>
            <Link to="/status">Status</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-400/20 md:shadow-md bg-linear-to-br from-[#e2eafd] to-[#faf7fe]">
        <div className="mx-auto md:mx-8 px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="font-semibold text-lg md:text-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
            AI Task{" "}
            <span className="text-[#2f52be] font-medium">Generator</span>
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm md:text-lg">
            {["/", "/history", "/status"].map((path, idx) => {
              const name =
                path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              const active = location.pathname === path;
              return (
                <Link
                  key={idx}
                  to={path}
                  className={`relative transition-all duration-300
                    ${active ? "text-[#2f52be] font-semibold" : "text-gray-700"}
                    hover:text-[#2f52be] 
                  `}
                >
                  {name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-[#2f52be] transition-all duration-300 hover:w-full ${
                      active ? "w-full" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col space-y-1 transition-transform duration-300"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-60 py-4 border-t border-gray-300/30" : "max-h-0 py-0"
          } bg-white/20 backdrop-blur-sm`}
        >
          <div className="max-w-4xl mx-auto px-4 flex flex-col space-y-3 text-sm">
            {["/", "/history", "/status"].map((path, idx) => {
              const name =
                path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              return (
                <Link
                  key={idx}
                  to={path}
                  onClick={() => setOpen(false)}
                  className="transition-all duration-300 hover:text-[#2f52be] hover:scale-105"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main className=" mx-auto ">{children}</main>
    </div>
  );
}

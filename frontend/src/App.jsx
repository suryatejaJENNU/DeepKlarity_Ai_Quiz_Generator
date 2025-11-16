import React, { useState } from "react";
// import GenerateQuiz from "./components/GenerateQuiz";
// import History from "./components/History";

export default function App() {
  const [tab, setTab] = useState("generate");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-sky-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
          <div >
                <img 
              src="/logo.png"     
              alt="App Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                AI Wiki Quiz Generator
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Paste a Wikipedia URL — generate quizzes instantly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <nav className="bg-gray-100 rounded-lg p-1 flex shadow border border-gray-300">
              <button
                onClick={() => setTab("generate")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition 
      ${
        tab === "generate"
          ? "bg-gray-800 text-white shadow"
          : "text-gray-700 hover:bg-gray-200"
      }`}
              >
                Generate
              </button>

              <button
                onClick={() => setTab("history")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
      ${
        tab === "history"
          ? "bg-gray-800 text-white shadow"
          : "text-gray-700 hover:bg-gray-200"
      }`}
              >
                History
              </button>
            </nav>
          </div>
        </header>

        {/* <main>{tab === "generate" ? <GenerateQuiz /> : <History />}</main> */}

        <footer className="mt-10 text-center text-sm text-slate-500">
          Built with  — Gemini + LangChain + FastAPI
        </footer>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { generateQuiz } from "../services/api";
import QuizPlayer from "./QuizPlayer";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function GenerateQuiz() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");

  const progressRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setProgress(6);
      progressRef.current = setInterval(() => {
        setProgress((p) => {
         
          if (p < 80) return p + Math.random() * 6;
          if (p < 95) return p + Math.random() * 2;
          return p;
        });
      }, 700);
    } else {
      clearInterval(progressRef.current);
      setProgress(0);
    }
    return () => clearInterval(progressRef.current);
  }, [loading]);

  async function onGenerate() {
    setError("");
    setQuiz(null);
    if (!url || !/^https?:\/\/.+/.test(url)) {
      setError("Please enter a valid URL (starting with https://).");
      return;
    }
    setLoading(true);
    try {
      const q = await generateQuiz(url);
      const normalized = normalizeQuiz(q);
      setQuiz(normalized);
      setProgress(100);
    } catch (e) {
      setError(e.message || "Generation failed");
    } finally {
      setLoading(false);
      clearInterval(progressRef.current);
    }
  }

  function normalizeQuiz(q) {
    const out = { ...q };
    out.questions = (q.questions || []).slice(0, 10).map((ques) => {
      let choices = ques.choices || [];
       const correct = ques.correct_answer || choices[0] || "";
      if (choices.length < 4) {
        const needed = 4 - choices.length;
        for (let i = 0; i < needed; i++) choices.push("None of the above");
      }
     
      if (choices.length > 4) choices = choices.slice(0, 4);
      return {
        ...ques,
        choices,
        correct_answer: correct,
      };
    });
    return out;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700">Wikipedia URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://en.wikipedia.org/wiki/Artificial_intelligence"
            className="mt-2 w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
          <p className="text-xs text-slate-400 mt-2">Paste any public Wikipedia article link. We'll scrape and generate 5–10 questions.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
    onClick={onGenerate}
    disabled={loading}
    className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg shadow hover:bg-gray-900 transition disabled:opacity-60"
  >
    <SparklesIcon className="w-5 h-5" />
    {loading ? "Generating..." : "Generate Quiz"}
  </button>
        </div>
      </div>

     
    <div className="mt-4">
    {loading && (
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
        <div
            style={{ width: `${Math.min(progress, 99)}%` }}
            className="h-3 bg-gray-700 transition-all"
        />
        </div>
    )}
    </div>


      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {quiz && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold">{quiz.title || "Generated Quiz"}</h2>
              <p className="text-sm text-slate-500">{quiz.summary}</p>
            </div>
            <div className="text-sm text-slate-400">{quiz.questions.length} Questions</div>
          </div>

          <QuizPlayer quiz={quiz} />
        </div>
      )}
    </div>
  );
}

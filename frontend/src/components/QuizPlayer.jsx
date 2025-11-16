import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

const DEFAULT_TIME = 30; 

export default function QuizPlayer({ quiz }) {
  const questions = quiz.questions || [];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); 
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
   
    startQuestion();
    return () => clearInterval(timerRef.current);
   
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitAnswer(null, true); 
    }
  }, [timeLeft]);

  useEffect(() => {
   
    setSelected(null);
    setTimeLeft(DEFAULT_TIME);
    
    const t = setTimeout(startQuestion, 200);
    return () => clearTimeout(t);
    
  }, [index]);

  function startQuestion() {
    clearInterval(timerRef.current);
    setRunning(true);
    setTimeLeft(DEFAULT_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    setRunning(false);
  }

  function submitAnswer(choice, timedOut = false) {
    stopTimer();
    const q = questions[index];
    const correct = q.correct_answer;
    const isCorrect = !timedOut && choice !== null && choice === correct;
    setAnswers((a) => [...a, { qIndex: index, selected: choice, correct: correct, isCorrect }]);
  
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        setShowReview(true);
      }
    }, 600);
  }

  function handleChoice(choice) {
    setSelected(choice);
    submitAnswer(choice, false);
  }

  function restart() {
    setIndex(0);
    setAnswers([]);
    setShowReview(false);
    setSelected(null);
    setTimeLeft(DEFAULT_TIME);
    startQuestion();
  }

  const score = answers.filter(a => a.isCorrect).length;

  if (showReview) {
    return (
      <div className="bg-slate-50 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Results</h3>
        <p className="text-lg font-bold text-indigo-600">{score} / {questions.length} correct</p>
        <div className="mt-4 space-y-3">
          {answers.map((a, i) => {
            const q = questions[a.qIndex];
            return (
              <div key={i} className="p-3 bg-white rounded border">
                <div className="font-medium">{i+1}. {q.question_text}</div>
                <div className="mt-2 text-sm">
                  Your answer: <span className={a.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{a.selected || "No answer"}</span>
                </div>
                <div className="mt-1 text-sm text-slate-500">Correct: <span className="font-medium">{a.correct}</span></div>
                {q.explanation && <div className="mt-2 text-sm text-slate-400">{q.explanation}</div>}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={restart} className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg shadow hover:bg-gray-900 transition disabled:opacity-60"
>Play Again</button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const choices = q.choices || [];


  const labels = ["A", "B", "C", "D"];

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">Question {index + 1} of {questions.length}</div>
          <div className="mt-2 text-lg md:text-xl font-semibold">{q.question_text}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-500">Time left</div>
          <div className="mt-1 text-lg font-bold text-indigo-600">{timeLeft}s</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((c, i) => (
          <button
            key={i}
            onClick={() => handleChoice(c)}
            className={clsx(
              "text-left p-3 rounded-lg border hover:shadow-md transition",
              selected === c ? "bg-indigo-50 border-indigo-400" : "bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">{labels[i] || String.fromCharCode(65 + i)}</div>
              <div className="text-sm">{c}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">Tip: pick the best option — timer is {DEFAULT_TIME}s</div>
        <div>
          <button onClick={() => { setShowReview(true); stopTimer(); }}
           className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg shadow hover:bg-gray-900 transition disabled:opacity-60"
>Finish Early</button>
        </div>
      </div>
    </div>
  );
}

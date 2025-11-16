import React, { useEffect, useState } from "react";
import { fetchHistory, fetchQuizById } from "../services/api";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function History() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setRows(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function viewDetails(id) {
    try {
      const res = await fetchQuizById(id);
      setSelectedQuiz(res.quiz);
      setModalOpen(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">History</h2>

      {loading ? (
        <div className="text-center text-gray-500 py-6">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left border-b">ID</th>
                  <th className="p-3 text-left border-b">Title</th>
                  <th className="p-3 text-left border-b">URL</th>
                  <th className="p-3 text-left border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="p-3">{r.id}</td>
                    <td className="p-3 max-w-[250px] truncate">{r.title}</td>
                    <td className="p-3">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open
                      </a>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => viewDetails(r.id)}
                        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    
      {modalOpen && selectedQuiz && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border border-gray-200 p-6">
         
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedQuiz.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedQuiz.summary}
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>


            <div className="mt-5 space-y-4">
              {selectedQuiz.questions?.map((q, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <div className="font-medium text-gray-800">
                    {i + 1}. {q.question_text}
                  </div>

                  <ul className="mt-2 space-y-1 text-sm">
                    {q.choices.map((c, idx) => (
                      <li key={idx}>
                        <span className="font-semibold text-gray-700">
                          {String.fromCharCode(65 + idx)}.
                        </span>{" "}
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 text-xs text-green-700 font-semibold">
                    ✔ Correct Answer: {q.correct_answer}
                  </div>

                  {q.explanation && (
                    <div className="mt-1 text-xs text-gray-500">
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

         
            <div className="pt-4 mt-6 border-t flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

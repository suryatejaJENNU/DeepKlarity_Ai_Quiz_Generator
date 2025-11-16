const BASE = "http://127.0.0.1:8000";

export async function generateQuiz(url) {
  const res = await fetch(`${BASE}/generate_quiz`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ url })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Error generating quiz");
  return json.quiz;
}

export async function fetchHistory() {
  const res = await fetch(`${BASE}/history`);
  if (!res.ok) throw new Error("History failed");
  return res.json();
}

export async function fetchQuizById(id) {
  const res = await fetch(`${BASE}/quiz/${id}`);
  if (!res.ok) throw new Error("Fetch quiz failed");
  return res.json();
}

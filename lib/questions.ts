import { apiFetch } from "./api";

export interface Question {
  id: string;
  materi: string;
  pertanyaan: string;
  jawaban: string;
  created_at?: string;
}

export async function getQuestions(): Promise<Question[]> {
  try {
    const list = await apiFetch<Question[]>("/questions");
    return list.map((q) => ({ ...q, id: q.id.toString() }));
  } catch (err) {
    console.error("Gagal memuat soal dari API:", err);
    return [];
  }
}

export async function getQuestionById(id: string): Promise<Question | undefined> {
  try {
    const item = await apiFetch<Question>(`/questions/${id}`);
    return { ...item, id: item.id.toString() };
  } catch (err) {
    console.error(`Gagal memuat detail soal ${id}:`, err);
    return undefined;
  }
}

export async function createQuestion(materi: string, pertanyaan: string, jawaban: string): Promise<Question> {
  const result = await apiFetch<Question>("/questions", {
    method: "POST",
    body: JSON.stringify({ materi, pertanyaan, jawaban }),
  });
  return { ...result, id: result.id.toString() };
}

export async function updateQuestion(
  id: string,
  materi: string,
  pertanyaan: string,
  jawaban: string
): Promise<Question | null> {
  try {
    const result = await apiFetch<Question>(`/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ materi, pertanyaan, jawaban }),
    });
    return { ...result, id: result.id.toString() };
  } catch (err) {
    console.error(`Gagal mengupdate soal ${id}:`, err);
    return null;
  }
}

export async function deleteQuestion(id: string): Promise<boolean> {
  try {
    await apiFetch(`/questions/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (err) {
    console.error(`Gagal menghapus soal ${id}:`, err);
    return false;
  }
}

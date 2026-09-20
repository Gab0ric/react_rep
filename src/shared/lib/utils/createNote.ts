import { Note } from "@/entities/note/model/types";

export const createNote = (info: { title: string; content: string; status: 'in progress' }): Note => {
  return {
    title: info.title,
    content: info.content,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    status: 'in progress'
  };
};
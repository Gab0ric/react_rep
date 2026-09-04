import { Note } from "@/entities/note/model/types";

export const createNote = (info: { title: string; content: string }): Note => {
  return {
    title: info.title,
    content: info.content,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
};
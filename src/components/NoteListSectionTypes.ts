import { Note } from "@/entities/note/model/types";

export interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  onChangeColor: (id: string) => void;
  onToggleStatus: (id: string) => void;
}


import { CreateNoteDto } from "@/features/ui/NoteForm.types";

export interface NoteActionsProps {
  isFormOpen: boolean;
  onOpenForm: () => void;
  onCreateNote: (info: CreateNoteDto) => void;
  onClearNotes: () => void;
}
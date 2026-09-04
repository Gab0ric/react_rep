export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface NoteFormProps {
  onCreate: (data: CreateNoteDto) => void;
}
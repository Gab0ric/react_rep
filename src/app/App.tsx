import { useState } from "react"
import { Note } from "@/entities/note/model/types"
import { NoteList } from "@/components/NoteListSection";
import { createNote } from "@/shared/lib/utils/createNote"
import { NoteActions } from "@/components/NoteActionsPanel";
import { CreateNoteDto } from "@/features/ui/NoteForm.types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleCreateNote = (info: CreateNoteDto) => {
    const newNote = createNote(info);
    setNotes([newNote, ...notes]);
    setIsFormOpen(false);
  }

  return (
    <>
      <div className="flex flex-row h-screen w-full py-30 px-20 gap-4 items-start border-box ">
        <NoteActions
          isFormOpen={isFormOpen}
          onOpenForm={() => setIsFormOpen(true)}
          onCreateNote={handleCreateNote}
          onClearNotes={() => setNotes([])}
        />
        <NoteList notes={notes} />
      </div>
    </>
  )
}

export default App
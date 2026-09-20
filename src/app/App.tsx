import { useState } from "react"
import { Sidebar } from "@/components/Sidebar";
import { Note } from "@/entities/note/model/types"
import { NoteList } from "@/components/NoteListSection";
import { createNote } from "@/shared/lib/utils/createNote"
import { NoteActions } from "@/components/NoteActionsPanel";
import { CreateNoteDto } from "@/features/ui/NoteForm.types";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  const handleChangeColor = (id: string) => {
    const colors = [
      "bg-[#f6e462]",
      "bg-purple-300",
      "bg-blue-300",
      "bg-green-300",
      "bg-amber-500"
    ];

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        const currentColor = note.color || "bg-[#f6e462]";
        const currentIndex = colors.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        const nextColor = colors[nextIndex];
        return { ...note, color: nextColor };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const toggleNoteStatus = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            status: note.status === 'in progress'
              ? 'completed'
              : 'in progress'
          };
        }
        return note;
      })
    );
  };

  const handleCreateNote = (info: CreateNoteDto) => {
    const newNote = createNote({ ...info, status: 'in progress' });
    setNotes([newNote, ...notes]);
    setIsFormOpen(false);
  }

  return (
    <>
      <div className="flex flex-row h-screen  w-full py-25 px-10 gap-4 items-start border-box ">
        <Sidebar notes={notes}>
          <Sidebar.FilterGroup />
          <Sidebar.List />
        </Sidebar>

        <NoteActions
          isFormOpen={isFormOpen}
          onOpenForm={() => setIsFormOpen(true)}
          onCreateNote={handleCreateNote}
          onClearNotes={() => setNotes([])}
        />

        <NoteList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onChangeColor={handleChangeColor}
          onToggleStatus={toggleNoteStatus}
        />
      </div>
    </>
  )
}

export default App
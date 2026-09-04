
import { Button } from "@/components/Button";
import { NoteForm } from "@/features/ui/NoteForm";
import { NoteActionsProps } from "./NoteActionsPanelTypes";

const buttonCreateNoteStyle = `py-3 w-[193px] px-8 my-1.25 rounded-xl text-white bg-black hover:bg-gray-800 transition duration-300 cursor-pointer active:bg-gray-500`;
const buttonDeleteANoteStyle = `px-8 py-3 rounded-xl text-white bg-sky-700 cursor-pointer w-48.25 hover:bg-sky-800 transition duration-300 active:bg-sky-400`;

export const NoteActions = ({
  isFormOpen,
  onOpenForm,
  onCreateNote,
  onClearNotes,
}: NoteActionsProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full ">
      {!isFormOpen && (
        <Button
          onClick={onOpenForm}
          className={buttonCreateNoteStyle}
          text="Создать заметку"
        />
      )}

      {isFormOpen && <NoteForm onCreate={onCreateNote} />}

      <Button
        onClick={onClearNotes}
        className={buttonDeleteANoteStyle}
        text="Стереть заметки"
      />
    </div>
  );
};
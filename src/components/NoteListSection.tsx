import { NoteListProps } from "./NoteListSectionTypes";

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 ">
      {notes.length === 0 ? (
        <h1 className="flex items-center font-semibold">Заметок пока нет</h1>
      ) : (
        notes.map((note) => (
          <div key={note.id}>
            <h3 className="font-bold overflow-x-scroll scrollbar-none  text-start w-47.5 px-2.5 bg-[#f6e462] rounded-t-2xl pt-2.5 pb-1.25">
              {note.title}
            </h3>
            <textarea
              readOnly
              value={note.content}
              className="resize-none h-32.5 w-47.5 rounded-b-2xl pt-2 pb-3 px-3 bg-gray-100
               overflow-y-scroll scrollbar-none outline-none"
            />
          </div>
        ))
      )}
    </div>
  );
};
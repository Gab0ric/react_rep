import { useState } from "react";
import { ContextMenu } from "./ContextMenu";
import { NoteListProps } from "./NoteListSectionTypes";

export const NoteList = ({ notes, onDeleteNote, onChangeColor}: NoteListProps) => {
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, noteId: string } | null>(null);
  const handleContextMenu = (e: React.MouseEvent, noteId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, noteId });
  }
  return (
    <div className="flex flex-row flex-wrap gap-4 ">
      {notes.length === 0 ? (
        <h1 className="flex items-center font-semibold">Заметок пока нет</h1>
      ) : (
        notes.map((note) => (
          <div key={note.id} onContextMenu={(e) => handleContextMenu(e, note.id)}>
            <h3 className={`font-bold overflow-x-scroll border-b border-[#b9b4b4] scrollbar-none text-start w-47.5 px-2.5 rounded-t-2xl pt-2.5 pb-1.25  ${note.color ? note.color : 'bg-[#f6e462]'}`}>
              {note.title}
            </h3>
            <textarea
              readOnly
              value={note.content}
              className="resize-none h-32.5 w-47.5 rounded-b-2xl pt-2 pb-3 px-3 bg-gray-100
               overflow-y-scroll scrollbar-none outline-none "
            />
          </div>
        ))
      )}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onDelete={() => {
            console.log("Удаляем заметку с ID:", contextMenu.noteId);
            onDeleteNote(contextMenu.noteId);
            setContextMenu(null);
          }}
          onColorChange={() => {
            console.log("Меняем цвет заметке с ID:", contextMenu.noteId);
            onChangeColor(contextMenu.noteId);
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
};
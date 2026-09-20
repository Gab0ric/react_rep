import { SidebarContext } from './SidebarContext';
import { Note } from "../entities/note/model/types";
import { useState, ReactNode, useContext, useId } from 'react';


interface SidebarProps {
  notes: Note[];
  children: ReactNode;
}

export const Sidebar =
  ({ notes, children }: SidebarProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [filterStatus, setFilterStatus] = useState({
      completed: false,
      inProgress: true,
    });

    return (
      <SidebarContext.Provider value={{ notes, searchQuery, setSearchQuery, filterStatus, setFilterStatus }}>
        <aside className="w-90  h-full bg-gray-50 rounded-3xl shadow-2xl p-4 flex flex-col gap-4">
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  };

const SidebarFilterGroup = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarFilterGroup должен использоваться внутри Sidebar");
  }

  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus } = context;

  const searchId = useId();
  const inProgressId = useId();
  const completedId = useId();

  const handleCheckboxChange = (statusKey: 'completed' | 'inProgress') => {
    setFilterStatus({
      ...filterStatus,
      [statusKey]: !filterStatus[statusKey]
    });
  };

  return (
    <div className="flex flex-col gap-6 border-b pb-4">

      <div className="flex flex-col gap-1">
        <label htmlFor={searchId} className="font-semibold text-sm">
          Поиск по заметкам
        </label>

        <input
          id={searchId}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите текст..."
          className="border border-gray-300 px-2 py-1 outline-none rounded-xl"
          aria-describedby={`${searchId}-hint`}
        />

        <span id={`${searchId}-hint`} className="text-xs text-gray-500 pl-2">
          Поиск заметок...
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-sm pl-1">Фильтр по статусу</h4>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={inProgressId}
            className="peer hidden"
            checked={filterStatus.inProgress}
            onChange={() => handleCheckboxChange('inProgress')}
          />
          <label htmlFor={inProgressId} className=" cursor-pointer select-none py-3 px-15 text-sm rounded-xl text-black font-bold bg-gray-200 shadow-2xs hover:bg-gray-300 
             transition-colors duration-300 active:bg-gray-100">
            В работе
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={completedId}
            className="peer hidden"
            checked={filterStatus.completed}
            onChange={() => handleCheckboxChange('completed')}
          />
          <label htmlFor={completedId} className="text-sm cursor-pointer select-none py-3 px-10 rounded-xl font-bold text-black bg-gray-200 hover:bg-gray-300  
             transition-colors duration-300 active:bg-gray-100">
            Выполненные
          </label>
        </div>
      </div>

    </div>
  );
};

const SidebarList = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarList должен использоваться внутри Sidebar");
  }

  const { notes, searchQuery, filterStatus } = context;

  const filteredNotes = notes.filter((note) => {
    const matchesStatus =
      (filterStatus.completed && note.status === 'completed') ||
      (filterStatus.inProgress && note.status === 'in progress');

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2 mt-4 pr-2">
      <h4 className="font-semibold text-sm mb-2 text-gray-700">
        Найдено: {filteredNotes.length}
      </h4>

      {filteredNotes.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Нет подходящих заметок...</p>
      ) : (
        filteredNotes.map(note => (
          <div
            key={note.id}
            className={`p-3 rounded-lg border shadow-sm text-sm flex flex-col gap-1 ${note.color ? note.color : 'bg-gray-50'}`}
          >
            <p className="font-bold truncate">{note.title}</p>
            <p className="text-xs text-gray-800 opacity-80 truncate">{note.content}</p>
            <span className="text-[10px] uppercase font-bold text-gray-500 mt-1">
              {note.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

Sidebar.FilterGroup = SidebarFilterGroup;
Sidebar.List = SidebarList;
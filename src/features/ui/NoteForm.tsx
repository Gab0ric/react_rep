import { useReducer } from "react";
import { useRef, useEffect } from "react";
import { Button } from '@/components/Button';
import { NoteFormProps } from './NoteForm.types';
import { noteReducer } from "@/components/noteReducer";
// import { useStickyState } from '@/shared/hook/useStickyState';
import { AutoResizingTextarea, AutoResizingTextareaRef } from "@/components/AutoResizingTextarea";

const buttonCreateAddStyle = `py-3 px-15 my-1.5 rounded-xl text-white bg-black cursor-pointer hover:bg-gray-800 
 transition-colors duration-300 active:bg-gray-500`

const isValidNote = (title: string, content: string): boolean => {
  return Boolean(title.trim() && content.trim());
};


export const NoteForm = ({ onCreate }: NoteFormProps) => {
  // const [title, setTitle] = useStickyState('note-title-draft', '');
  // const [content, setContent] = useStickyState('note-content-draft', '');
  const [state, dispatch] = useReducer(noteReducer, { 
    title: localStorage.getItem('note-title-draft') || '', 
    content: localStorage.getItem('note-content-draft') || '' 
  });
  
  useEffect(() => {
    localStorage.setItem('note-title-draft', state.title);
    localStorage.setItem('note-content-draft', state.content);
  }, [state.title, state.content]);

  const textareaRef = useRef<AutoResizingTextareaRef>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();


    if (!isValidNote(state.title, state.content)) return;

    onCreate({ title: state.title, content: state.content });
    dispatch({ type: 'RESET_FORM' })
    localStorage.removeItem('note-title-draft');
    localStorage.removeItem('note-content-draft');
    // setContent('');
    // setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center flex-col'>
      <h3>Создать заметку</h3>
      <input
        className='h-10 w-47.5 rounded-2xl p-4 bg-gray-100 my-1.5'
        type="text"
        placeholder="Заголовок заметки"
        value={state.title}
        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
      // onChange={(e) => setTitle(e.target.value)}
      />

      <AutoResizingTextarea
        ref={textareaRef}
        value={state.content}
        onChange={(e: React.SubmitEvent) => dispatch({ type: 'SET_CONTENT', payload: e.target.value })}
      // onChange={(e: React.SubmitEvent) => setContent(e.target.value)}
      />

      <Button
        className={buttonCreateAddStyle}
        text={'Добавить'}
        submit
      />

      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'RESET_FORM' })
          textareaRef.current?.resetAndFocus();
        }}
        className="py-3 px-15 mb-1.5 rounded-xl text-white bg-[rgba(109,16,123)] cursor-pointer hover:bg-[rgba(98,16,123)] 
        transition-colors duration-300 active:bg-[rgba(115,24,123)]"
      >
        Очистить
      </button>
    </form>
  );
};
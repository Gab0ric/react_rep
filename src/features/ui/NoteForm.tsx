import { useRef } from "react";
import { NoteFormProps } from './NoteForm.types';
import { Button } from '@/components/Button';
import { useStickyState } from '@/shared/hook/useStickyState';
import { AutoResizingTextarea, AutoResizingTextareaRef } from "@/components/AutoResizingTextarea";

const buttonCreateAddStyle = `py-3 px-15 my-1.5 rounded-xl text-white bg-black cursor-pointer hover:bg-gray-800 
 transition-colors duration-300 active:bg-gray-500`

const isValidNote = (title: string, content: string): boolean => {
  return Boolean(title.trim() && content.trim());
};


export const NoteForm = ({ onCreate }: NoteFormProps) => {
  const [title, setTitle] = useStickyState('note-title-draft', '');
  const [content, setContent] = useStickyState('note-content-draft', '');

  const textareaRef = useRef<AutoResizingTextareaRef>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();


    if (!isValidNote(title, content)) return;

    onCreate({ title, content });
    setContent('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center flex-col'>
      <h3>Создать заметку</h3>
      <input
        className='h-10 w-47.5 rounded-2xl p-4 bg-gray-100 my-1.5'
        type="text"
        placeholder="Заголовок заметки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <textarea
        className='resize-none h-32.5 w-47.5 rounded-2xl p-4 bg-gray-100 overflow-hidden'
        placeholder="Текст заметки..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /> */}

      <AutoResizingTextarea
        ref={textareaRef}
        value={content}
        onChange={(e: React.SubmitEvent) => setContent(e.target.value)}
      />

      <Button
        className={buttonCreateAddStyle}
        text={'Добавить'}
        submit
      />

      <button
        type="button"
        onClick={() => {
          setContent('');
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
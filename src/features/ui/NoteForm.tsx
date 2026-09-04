import { useState } from 'react';
import { NoteFormProps } from './NoteForm.types';
import { Button } from '@/components/Button';

const buttonCreateAddStyle = `py-3 px-15 my-1.5 rounded-xl text-white bg-black cursor-pointer hover:bg-gray-800 
 transition-colors duration-300 active:bg-gray-500`

const isValidNote = (title: string, content: string): boolean => {
  return Boolean(title.trim() && content.trim());
};

export const NoteForm = ({ onCreate }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      <textarea
        className='resize-none h-32.5 w-47.5 rounded-2xl p-4 bg-gray-100 overflow-hidden'
        placeholder="Текст заметки..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        className={buttonCreateAddStyle}
        text={'Добавить'}
        submit
      />
    </form>
  );
};
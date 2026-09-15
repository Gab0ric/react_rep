import { useRef, useImperativeHandle } from "react";

export interface AutoResizingTextareaRef  {
  resetAndFocus: () => void
}

export const AutoResizingTextarea = ({ ref, value, onChange }: { ref?: React.Ref<AutoResizingTextareaRef>, value?: string, onChange?: any }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => {
    return {
      resetAndFocus: () => {
        if (textareaRef.current) {
          textareaRef.current.value = "";
          textareaRef.current.focus();
          textareaRef.current.style.height = "auto";
        }
      },
    };
  }
  );
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (onChange) onChange(e);
  };
  return (
    <textarea ref={textareaRef} name="" id="" onChange={handleInput} value={value}
      className="resize-none h-32.5 w-47.5 rounded-2xl p-4 bg-gray-100 overflow-hidden"
      placeholder="Текст заметки..."
    />
  );
}
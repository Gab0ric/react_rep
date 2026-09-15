import { ContextMenuProps } from "./ContextMenuProps";
import { useRef, useEffect } from "react";

export const ContextMenu = ({ x, y, onClose, onColorChange, onDelete }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div ref={menuRef} className="absolute flex flex-col  bg-gray-300/30 backdrop-blur-sm p-2 gap-1
     border-gray-300-1  w-50 rounded-xl " style={{ top: y, left: x }}>
      <button className="text-gray-500 flex items-start cursor-pointer p-0.5
         hover:bg-gray-300/5 hover:backdrop-blur-3xl transition duration-75 rounded-md"
        onClick={() => { onColorChange(); onClose(); }}>
        Сменить цвет</button>
      <div className="h-[0.75px] bg-gray-300 mx-0.5 my-1" />
      <button className="text-gray-500 flex items-start cursor-pointer p-0.5 transition-all 
         duration-75 rounded-md
         hover:backdrop-blur-3xl hover:bg-gray-300/5 "
        onClick={() => { onDelete(); onClose(); }}>
        Удалить</button>
    </div>
  )
};
import { useState } from "react";

interface State {
  id: string;
  createdAt: string;
}

export const KeyMismatch = () => {

  const [items, setItems] = useState<State[]>([
    { id: "1", createdAt: new Date().toLocaleTimeString() }
  ]);

  return (
    <div className="flex justify-center py-93 gap-1">
      <button className="p-0.5 rounded-md bg-green-700 text-white" onClick={() => {
        setItems((prevItems) => [
          {
            id: Math.random().toString(),
            createdAt: new Date().toLocaleTimeString()
          },
          ...prevItems
        ]);
      }}>Add to top</button>

      {items.map((item, index) => {
        return (
          <input
            className="p-2.5  border-solid border-b-blue-400-[4px] bg-gray-100 rounded-sm"
            key={index}
            type="text"
            placeholder={`Cоздана в : ${item.createdAt}`}
          />
        );
      })}
    </div>
  );
};
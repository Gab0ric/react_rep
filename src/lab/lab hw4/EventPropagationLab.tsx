import { useState, useEffect, useEffectEvent } from "react";


export const EventPropagationLab = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const handlePointerMove = (e: React.PointerEvent) => {
    setCoords({ x: e.clientX, y: e.clientY });
  }
  const OnTick = useEffectEvent(() => console.log(`x:${coords.x}, y:${coords.y}`));
  useEffect(() => {
    console.log('Подключено');
    const timerId = setInterval(() => { OnTick(); }, 3000);
    return () => {
      console.log("Отключено");
      clearInterval(timerId);
    };
  }, []);
  return (
    <div onPointerMove={handlePointerMove} className="flex flex-col p-10 ">
      <h3 className="text-3xl font-medium">
        x:{coords.x}, y:{coords.y}
      </h3>
      <div className="bg-black p-12"
        onClickCapture={() => console.log('Дед - Capture (Погружение)')}
        onClick={() => console.log('Дед - Bubble (Всплытие)')} >
        <p className="text-white">Дед</p>

        <div className="bg-gray-700 p-10"
          onClickCapture={() => console.log('Отец - Capture (Погружение)')}
          onClick={() => console.log('Отец - Bubble (Всплытие)')} >
          <p className="text-blue-400">Отец</p>

          <div className="bg-amber-200 p-8"
            onClickCapture={() => console.log('Сын/Внук - Capture (Погружение)')}
            onClick={() => console.log('Сын/Внук - Bubble (Всплытие)')} >
            <p className="text-green-600">Сын/Внук</p>
          </div>

        </div>
      </div>
    </div>
  );
}


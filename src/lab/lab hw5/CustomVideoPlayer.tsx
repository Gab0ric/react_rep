export const CustomVideoPlayer = () => {
  return (
    <div>
      <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-50"
       ref={(node) => {
          if (node) {
            console.log("Видео смонтировано");
          }
          return () => {
            console.log("Видео демонтировано");
          };
        }}></video>
    </div>
  );
};
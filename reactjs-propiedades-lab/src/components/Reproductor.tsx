import { useRef, useState, type ChangeEvent } from "react";
import sonidoPiolin from "../assets/sonido_piolin.mp3";

const Reproductor = () => {
  const [volumen, setVolumen] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const handleChangeVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoVolumen = Number(event.target.value);
    setVolumen(nuevoVolumen);

    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen / 100;
    }
  };

  return (
    <div className="audio_container">
      <h2>Reproductor de audio</h2>
      <div className="reproductor">
        <audio ref={audioRef} src={sonidoPiolin} />
        <button type="button" onClick={handlePlay}>
          Play
        </button>
        <button type="button" onClick={handlePause}>
          Pause
        </button>
        <input type="range" min="0" max="100" value={volumen} onChange={handleChangeVolume} />
      </div>
    </div>
  );
};

export default Reproductor;

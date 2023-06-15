import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useState } from "react";

const SearchAlbumDetailsCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
const [text,setText] = useState('Download')
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const downloadURL = song.downloadUrl[4].link
  const handleDownload = async () => {
    const response = await fetch(downloadURL)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${song.name}.mp3` // Set the desired file name
    link.click()
    URL.revokeObjectURL(url)
    setText('Downloaded')
    setTimeout(() => {
      setText('Download')
    }, 1000)
  }
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer overflow-hidden">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.id === song.id
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          alt="song_img"
          src={song.image[2]?.link}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">{song.name}</p>
        <p className="font-semibold text-sm text-white truncate">
          {song.label}
        </p>
        <button
          onClick={handleDownload}
          className="text-white text-[22px] cursor-pointer flex mt-2"
        >
          {text}
        </button>
      </div>
    </div>
  );
};
export default SearchAlbumDetailsCard;

// SearchAlbumDetailsCard

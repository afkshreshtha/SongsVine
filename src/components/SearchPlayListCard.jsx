import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SearchPlayListCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <Link to={`/playlist/${song?.id}`}>
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
              activeSong?.id === song.id
                ? "flex bg-black bg-opacity-70"
                : "hidden"
            }`}
          />
        </Link>

        <img
          alt="song_img"
          src={song.image[2]?.link}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/albums/${song?.id}`}>{song.name}</Link>
        </p>

        <p className="text-sm truncate text-gray-300 mt-1">{`${
          song?.name
            ? `${song?.name}`
            : "No artists found"
        }`}</p>
      </div>
    </div>
  );
};

export default SearchPlayListCard;
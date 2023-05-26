import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const TrendingCard = ({ song, activeSong }) => {


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <Link to={`/albums/${song.id}`}>
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
              activeSong?.name === song.name
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
        <p className="text-sm truncate text-gray-300 mt-1">{`${song.name}`}</p>
        <p className="text-sm truncate text-gray-300 mt-1">{`${song.artists.map((e)=>e.name)}`}</p>

      </div>
    </div>
  );
};

export default TrendingCard;

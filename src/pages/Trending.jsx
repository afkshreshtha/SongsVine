import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { TrendingCard } from "../components";
import { fetchDataFromApi } from "../utils/api";

const Trending = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("hindi");

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/modules?language=${language}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, [language]);
  const handleSelectChange = (e) => {
    setLanguage(e.target.value);
  };
  return (
    <div className=" flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Trending Songs</h2>
        <div className="p-4">
          <select
            onChange={handleSelectChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data.trending.albums.map((song, i) => (
          <TrendingCard
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data}
          />
        ))}
      </div>
    </div>
  );
};

export default Trending;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { SearchAlbumCard, SearchPlayListCard } from "../components";

const SearchPlayList = () => {
  const { searchAlbumTerm } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState(null);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/playlists?query=${searchAlbumTerm}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [searchAlbumTerm]);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Search results for <span className="font-black">{searchAlbumTerm}</span>
      </h2>
      <div className="mb-7 ">
        <Link
          className=" hover:border-b-2 border-indigo-500  text-white   pr-[14px] pl-[16px]  text-center text-lg"
          to={`/search/${searchAlbumTerm}`}
        >
          Songs
        </Link>
        <Link
          className=" hover:border-b-2 border-indigo-500 text-white  pr-[14px] pl-[16px]  text-center text-lg"
          to={`/search/${searchAlbumTerm}/album`}
        >
          Albums
        </Link>
        <Link
          className=" hover:border-b-2 border-indigo-500 text-white  pr-[14px] pl-[16px]  text-center text-lg"
          to={`/search/${searchAlbumTerm}/playlist`}
        >
          PlayLists
        </Link>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data.results.map((song, i) => (
          <SearchPlayListCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={album?.data.results}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPlayList;

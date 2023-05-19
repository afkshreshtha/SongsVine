import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, SearchAlbumDetailsCard } from "./components";

import {
  TopCharts,
  Discover,
  Search,
  SongDetails,
  ChartDetails,

  SearchAlbum,
  SearchAlbumDetails,
  SearchPlayList,
  NewReleases,
  NewReleaseDetails,
  Trending,

} from "./pages";
import { MdOutlineStackedBarChart } from "react-icons/md";
import SearchPlayListDetails from "./pages/SearchPlayListDetails";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/newreleases" element={<NewReleases />} />
              <Route path="/newreleases/:songid" element={<NewReleaseDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/charts" element={<TopCharts />} />
              <Route path="/charts/:songid" element={<ChartDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/search/:searchAlbumTerm/album" element={<SearchAlbum />} />
              <Route path="/search/:searchAlbumTerm/playlist" element={<SearchPlayList />} />
              <Route path="/albums/:songid" element={<SearchAlbumDetails />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/playlist/:songid" element={<SearchPlayListDetails />} />
            </Routes>
          </div>
        </div>
      </div>
      {activeSong?.name && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
